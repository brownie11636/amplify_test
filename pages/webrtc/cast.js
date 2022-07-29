import { useEffect, useState, useRef } from "react";
import React from "react";
import { socket, SocketContext } from "../../service/socket";
import NavbarTwo from "../../components/Layouts/NavbarTwo";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";

import adapter from 'webrtc-adapter';

export default function Cast() {
  
    console.log('adapter.browserDetails.browser?', adapter.browserDetails.browser);

    //const [isLogin,setIsLogin] = useState(true);
    const localVideo = useRef();
    const remoteVideo = useRef();
    const controlPanel = useRef();
    // const [localStream, setLocalStream] = useState({});
    let localStream = {};
    //const [isChannelReady, setIsChannelReady] = useState(false);
    let isChannelReady = false;

    const [selectList, setSelectList] = useState([]);
    const [isStarted, setIsStarted] = useState(false);
    const [serviceList, setServiceList] = useState({});
  
    let pcs = {};
    const [RTCClientList, setRTCClientList] = useState([]);

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
      console.log('Audio Toggle');
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
      localStream = stream;
      //localStream = stream;
      localVideo.current.srcObject = stream;
      console.log('your stream?',stream);
      sendMessage('got user media', null); // delete it
      // console.log('llll',localVideo.current.srcObject);
      // console.log('tttttttttttt', localStream);
    }
    
    const sendMessage = (message, destination) => {
      let packet = {'from': socket.id, 'to':destination, 'message': message};
      console.log('Client sending message: ', packet);
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
      console.log("query?", query);
      socket.emit("q_service", querya);
    }, []);

  


    useEffect(() => {

        socket.on('q_result', function(q_result) {
            console.log('query result:' + typeof(q_result));
            const qres = JSON.parse(q_result);
            console.log(qres['header']);
            console.log(qres['data']);

          
              if(qres.header==='ServiceList'){
                const ServiceList = qres.data; // hook을 쓰는게 맞는지, 이렇게 그냥 선언해서 넣는게 맞는지...
                let nextList = selectList;
                for (const [key, value] of Object.entries(Object(ServiceList))) {
                  console.log('list set up log',`${key}:${value.sid}`);
                  nextList = nextList.concat(`${key}:${value.sid}`);
                  console.log(selectList);
                  console.log(nextList);
                }
                setSelectList(nextList);
              }
          });
        
        
          socket.on('created', function(room) {
            console.log('Created room ' + room);
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
    
      
        socket.on('msg-v1', function(packet) {
          console.log('In msg-v1!');
          let message = packet.message;
          console.log('msg from', packet.from);
          console.log('Client received message:', message);
          // let socketId = "arbitary socketID";
          try{
            if (message === 'connection request') {
              //RTCClientList.push({'socketId':packet.from});
              setRTCClientList(RTCClientList.concat({'socketId':packet.from}))
              console.log('RTCClientList:'+RTCClientList);
      
              maybeStart(packet.from);
            } else if (message.type === 'offer') {
              console.log('offer!!!!!!');
              pcs[packet.from].setRemoteDescription(new RTCSessionDescription(message));
              doAnswer(packet.from);
            } else if (message.type === 'answer') {
              pcs[packet.from].setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate') {
              let candidate = new RTCIceCandidate({
                sdpMLineIndex: message.label,
                candidate: message.candidate
              });
              pcs[packet.from].addIceCandidate(candidate);
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

    useEffect(() => {

    }, [socket])



    

  
    const maybeStart = (socketId) => {
      console.log('>>>>>>> maybeStart() ', isStarted, typeof localStream, isChannelReady);
      if (typeof localStream !== 'undefined' && isChannelReady) {
        console.log('>>>>>> creating peer connection', socketId);
        createPeerConnection(socketId);
        // pc.addStream(localStream);
        setIsStarted((current) => current = true);
        doCall(socketId);
      }
    }
  
    //const [pcs, setPcs] = useState({})

  
    const createPeerConnection = (socketId) => {
      console.log('createPerrconnect -> localVideo.current.srcObject?', localVideo.current.srcObject); // 원래는 localstream임
      try {
        // pc = new RTCPeerConnection(null);
        let pc = new RTCPeerConnection(pcConfig); // changed by Joonhwa
        // pc.onicecandidate = handleIceCandidate;
    
        pc.onicecandidate = event => {
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
    
        // pc.socketId = socketId;
        console.log('debug 1')
        if(localVideo.current.srcObject){
          console.log('debug 2')
          localVideo.current.srcObject.getTracks().forEach(function (track) {
            pc.addTrack(track, localVideo.current.srcObject);
          });
          //pc.addStream(localVideo.current.srcObject); // 원래는 localstream임 이유는 모르겠는데 자꾸 값 반영이 안되서 이걸로 바꿈
          console.log('debug 3')

        }
        console.log('debug 4')

        
        //setPcs(pcs.concat(`[${socketId}]: ${pc}`));
        //setPcs((current) => {`[${socketId}]: ${pc}`}, ...pcs);
        // setQuery((current) => [{header:'ServiceList',filter:{}}, ...current]);
        console.log('createPerrconnect -> socketId?222222222', socketId);
  
        // setPcs((prevState) => ({
        //   ...prevState,
        //   [socketId]: pc
        // }));
        pcs = {...pcs, [socketId]: pc};
        //useEffect(() => { setMovies(result) }, [])
  
        console.log('pcs?-->', pcs);
    
        // pc.onaddstream = handleRemoteStreamAdded; // disabled by Joonhwa
        // pc.onremovestream = handleRemoteStreamRemoved; // disabled by Joonhwa
        console.log('Created RTCPeerConnnection');
        console.log('socket ID:'+pc.socketId);
        console.log('pcs:');
        console.log(pcs);
      } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object.');
        return;
      }
    }
    console.log('pcs?2-->', pcs);
    
    function handleCreateOfferError(event) {
      console.log('createOffer() error: ', event);
    }
    
    function doCall(socketId) {
      console.log('Sending offer to peer');
      pcs[socketId].createOffer(sessionDescription=>{
        pcs[socketId].setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendMessage(sessionDescription, socketId);
          // setLocalAndSendMessage(setLocalAndSendMessage);
      }, handleCreateOfferError);
    }
    
    
    const doAnswer = (socketId) => {
      console.log('Sending answer to peer.');
      pcs[socketId].createAnswer().then(sessionDescription =>{
        pcs[socketId].setLocalDescription(sessionDescription);
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
      pcs[socketId].close();
      pcs[socketId] = null;
    }
    
  
  
    return (
        <>

<NavbarTwo />

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