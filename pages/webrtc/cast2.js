import { useEffect, useState, useRef } from "react";
import React from "react";
import { socket, SocketContext } from "../../toServer/socket";
import Header from "../../components/Layouts/Header";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";

import adapter from 'webrtc-adapter';

export default function Cast() {
  
    //const [isLogin,setIsLogin] = useState(true);
    const isinitiator = useRef(false);
    const localVideo = useRef();
    const remoteVideo = useRef();
    const controlPanel = useRef();
    // const [localStream, setLocalStream] = useState({});
    const localStream = useRef({});

    const socketIda = useRef();

    //const [isChannelReady, setIsChannelReady] = useState(false);
    let isChannelReady = false;
    let pc = useRef();
    const [selectList, setSelectList] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [serviceList, setServiceList] = useState({});
  
    const pcs = useRef({});
    const [RTCClientList, setRTCClientList] = useState([]);
    const pcs2 = useRef({});

  //  const selectList = ["apple", "banana", "grape", "orange"];
    const [Selected, setSelected] = useState("");
  
    const serviceProfile = {
      socketId: socket.id,
      room: 'room:'+socket.id,
      type: 'Device_1',
      description: 'Streamer',
      contents: "jooonik", //contents 수정필요!!!!!!!!!!!!!!!!!!
    }
    

    const pcConfig = {
      'iceServers': [{
        "urls": "turn:3.38.108.27",
        "username":"usr",
        "credential":"pass"
      }]
    }; 
  
    const sdpConstraints = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    }; //일단은 useState 사용 안해도 괜찮을 듯.
  
    const handleSelect = (e) => {
      setSelected(e.target.value);
    };
  
    useEffect(() => {
      socket.connect();
      return () => {
        socket.disconnect();
      };
    }, []);
    


    const StartStreaming = () => {
      socket.emit('Start_Service', serviceProfile);
      getWebcam(gotStream);
    }
  
    const AudioToggle = () => {
      console.log('ice?', pc.current.iceGatheringState);
      console.log('conn??', pc.current.connectionState);
      //maybeStart(null); //delete?
      //console.log(localStream.getAudioTracks()[0].enabled);
      //localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
    }
  
    const getWebcam = (callback) => {
      try {
        const constraints = {
          video: true,
          audio: false,
        };
        navigator.mediaDevices.getUserMedia(constraints).then(callback);
        
      } catch (err) {
        console.log(err);
        return undefined;
      }
    };
  
    const gotStream = (stream) => {
      console.log('Adding local stream.');
      //setLocalStream((current) => { return stream }); // 왜안되노 씨발거
      localStream.current = stream;
      //localStream = stream;
      localVideo.current.srcObject = stream;
      sendMessage('got user media', null); // delete it
      // console.log('llll',localVideo.current.srcObject);
      // console.log('tttttttttttt', localStream);
    }
    
    const sendMessage = (message, destination) => {
      console.log('send message(emit msg-v1)');
      let packet = {'from': socket.id, 'to':destination, 'message': message};
      //console.log('Client sending message: ', packet);
      socket.emit('msg-v1', packet);
    }
  
    const [query, setQuery] = useState([]);
  
    useEffect(() => {
      setQuery(
        query.concat({
          header: "ServiceList",
          filter: {},
        })
      );

      let querya = new Array({
        header: "ServiceList",
        filter: {},
      })
      socket.emit("q_service", querya);
    }, []);

  
    // pc.onicegatheringstatechange = ev => {
    //   let connection = ev.target;
    
    //   switch(connection.iceGatheringState) {
    //     case "gathering":
    //       console.log('state cha')
    //       break;
    //     case "complete":
    //       console.log('state cha2')
    //       break;
    //   }
    // }

    useEffect(() => {

        socket.on('q_result', function(q_result) {
            const qres = JSON.parse(q_result);


          
              if(qres.header==='ServiceList'){
                const ServiceList = qres.data; // hook을 쓰는게 맞는지, 이렇게 그냥 선언해서 넣는게 맞는지...
                let nextList = selectList;
                for (const [key, value] of Object.entries(Object(ServiceList))) {

                  nextList = nextList.concat(`${key}:${value.sid}`);

                }
                setSelectList(nextList);
              }
          });
        
        
          socket.on('created', function(room) {
            console.log('Created room ' + room);
            isinitiator.current = true;
          });
          
          socket.on('full', function(room) {
            console.log('Room ' + room + ' is full');
          });
          
          socket.on('join', function (room){
            console.log('Another peer made a request to join room ' + room);
            console.log('This peer is the initiator of room ' + room + '!');
            //setIsChannelReady(true);
            isChannelReady = true
            //isChannelReady = true;
          });
          
          socket.on('joined', function(room) {
            console.log('joined: ' + room);
            //setIsChannelReady(true);
            isChannelReady = true
            //isChannelReady = true;
          });
        socket.on('log', function(array) {
            console.log('socket on log');
          console.log.apply(console, array);
        });
    
      
        socket.on('msg-v1', async (packet) => {
          console.log('In msg-v1!');
          let message = packet.message;
          console.log('msg from', packet.from);
          console.log('Client received message:', message);
          // let socketId = "arbitary socketID";
          try{
            if (message === 'connection request') {
              //RTCClientList.push({'socketId':packet.from});
              console.log('check : connection request', pcs.current[packet.from])
              setRTCClientList(RTCClientList.concat({'socketId':packet.from}))
              console.log('RTCClientList:'+RTCClientList);
      
              maybeStart(packet.from);
            } else if (message.type === 'offer') {
              console.log('ice?', pc.current.iceGatheringState);
              await pcs.current[packet.from].setRemoteDescription(new RTCSessionDescription(message));
              console.log('check : offer', pcs.current[packet.from])
              socketIda.current=packet.from;
              doAnswer(packet.from);
              // while(pc.current.iceGatheringState !== 'complete') {
              //   doAnswer(packet.from);
              // }
              console.log('ice?', pc.current.iceGatheringState);
            } else if (message.type === 'answer') {
              await pcs.current[packet.from].setRemoteDescription(new RTCSessionDescription(message));
              console.log('check : answer', pcs.current[packet.from])
            } else if (message.type === 'candidate') {
              console.log('ice?', pc.current.iceGatheringState);

              let candidate = new RTCIceCandidate({
                sdpMLineIndex: message.label,
                candidate: message.candidate
              });
              await pcs.current[packet.from].addIceCandidate(candidate);
              console.log('check : candi', pcs.current[packet.from])
              console.log('ice?', pc.current.iceGatheringState);

            } else if (message === 'bye') {
              RTCClientList.splice(RTCClientList.findIndex(e => e.socketId === packet.from),1);
              console.log('RTCClientList:'+RTCClientList);
              console.log(RTCClientList);
              if(isStarted){
                //handleRemoteHangup(packet.from);
              }
            }

          }catch(e){
        
          }
        });  
    }, [socket])


    function sleep(ms) {
      const wakeUpTime = Date.now() + ms;
      while (Date.now() < wakeUpTime) {}
    }
  
    const maybeStart = (socketId) => {
      console.log('>>>>>>> maybeStart() ', isStarted, typeof localStream.current, isChannelReady);
      if (typeof localStream.current !== 'undefined' && isChannelReady) {
        console.log('>>>>>> creating peer connection', socketId);
        createPeerConnection(socketId);
        // pc.addStream(localStream);
        setIsStarted((current) => current = true);
        console.log('ice?', pcs.current[socketId].iceGatheringState);
        if(isinitiator.current) {
          doCall(socketId);
          console.log('ice?', pc.current.iceGatheringState);
        }

      }
    }


    const oniceconnectionstatechange = (event) => { 
      console.log('docall?',event.target.iceGatheringState, 'aaa');
      if(event.target.iceGatheringState == "complete")
        console.log('evnet')
    };

    //const [pcs.current, setPcs] = useState({})

    const createPeerConnection = (socketId) => {
      console.log('createPerrconnect -> localVideo.current.srcObject?', localStream.current);
      try {
        // pc = new RTCPeerConnection(null);
        pc.current = new RTCPeerConnection(pcConfig); // changed by Joonhwa
        // pc.onicecandidate = handleIceCandidate;
    
        pc.current.onicecandidate = event => {
        console.log('icecandidate event: ', event);
          if (event.candidate) {
            sendMessage({
              type: 'candidate',
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate
            }, socketId);
          } else {
            console.log('End of candidates.');
          }
        }

        pc.current.onicegatheringstatechange = oniceconnectionstatechange;
    
        // pc.socketId = socketId;
        console.log('RTCPeerConnection :', pc.current.connectionState); // 여기는 new가 맞음

        // async function openCall(pc) {
        //   const gumStream = await navigator.mediaDevices.getUserMedia(
        //                           {video: true, audio: true});
        //   for (const track of gumStream.getTracks()) {
        //     pc.addTrack(track);
        //   }
        // }

        
        if(localStream.current){

          localStream.current.getTracks().forEach(function (track) {
            pc.current.addTrack(track, localStream.current);
          });

        }

        pcs.current = {...pcs.current, [socketId]: pc.current};
        pcs2.current = {[socketId]: pc.current}
      
        // pc.onaddstream = handleRemoteStreamAdded; // disabled by Joonhwa
        // pc.onremovestream = handleRemoteStreamRemoved; // disabled by Joonhwa
        console.log('RTC connection code done.')
      } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object.');
        return;
      }
      return;
    }
    
    function handleCreateOfferError(event) {
      console.log('createOffer() error: ', event);
    }
    
    function doCall(socketId) {
      console.log('Sending offer to peer', pcs.current[socketId]);
      pcs.current[socketId].createOffer(async (sessionDescription) =>{
        await pcs.current[socketId].setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendMessage(sessionDescription, socketId);
          // setLocalAndSendMessage(setLocalAndSendMessage);
      }, handleCreateOfferError);

      // await this.connection.createOffer({
      //   offerToReceiveAudio: true,
      //   offerToReceiveVideo: true,
      // });

      console.log('ice?', pc.current.iceGatheringState);


    }
    
    const doAnswer = (socketId) => {
      console.log('Sending answer to peer.');
      pcs.current[socketId].createAnswer().then( async (sessionDescription) =>{
        await pcs.current[socketId].setLocalDescription(sessionDescription);
          console.log('setLocalAndSendMessage sending message', sessionDescription);
          sendMessage(sessionDescription, socketId);
        }, onCreateSessionDescriptionError);
    }
    
    const onCreateSessionDescriptionError = (error) => {
      console.log('Failed to create session description: ' + error.toString());
    }
    
    // const handleRemoteStreamAdded = (event) => {
    //   console.log('Remote stream added.');
    //   remoteStream = event.stream;
    //   remoteVideo.srcObject = remoteStream;
    // }
    
    // const handleRemoteStreamRemoved = (event) => {
    //   console.log('Remote stream removed. Event: ', event);
    // }
    
    const handleRemoteHangup = (socketId) => {
      console.log('Session terminated.');
      stop(socketId);
    }
    
    const stop = (socketId) => {
      setIsStarted(true);
      //isStarted = false;
      pcs.current[socketId].close();
      pcs.current[socketId] = null;
    }
    
  
  
    return (
        <>

<Header />

<PageBanner
  pageTitle="Security & Surveillance"
  homePageUrl="/"
  homePageText="Home"
  activePageText="Service Details"
  bgImgClass="item-bg2"
/>
      <SocketContext.Provider value={socket}>
      <div>
        <h1>You are a streamer!</h1>
        <div id="videos">
          <video ref={localVideo} id="localVideo" autoPlay muted playsInline></video>
          <video ref={remoteVideo} id="remoteVideo" autoPlay playsInline></video>
        </div>
        <div ref={controlPanel} id="controlPanel">
          <button onClick={StartStreaming}>Start Streaming</button>
          <button onClick={AudioToggle}>My Audio On/Off</button>
          <select onChange={handleSelect} value={Selected}>
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div id="image">
          <p>
            The World Wide Web (abbreviated WWW or the Web) is an information
            space where documents and other web resources are identified by
            Uniform Resource Locators (URLs), interlinked by hypertext links, and
            can be accessed via the Internet.[1] English scientist Tim Berners-Lee
            invented the World Wide Web in 1989. He wrote the first web browser
            computer program in 1990 while employed at CERN in Switzerland.[2][3]
            The Web browser was released outside of CERN in 1991, first to other
            research institutions starting in January 1991 and to the general
            public on the Internet in August 1991.
          </p>
        </div>
      </div>
      </SocketContext.Provider>

      <Footer />
      </>
    );
  }