import { React, useEffect, useState, useRef } from "react";
import { socket, SocketContext } from "../../service/socket";

import NavbarTwo from "../../components/Layouts/NavbarTwo";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import adapter from 'webrtc-adapter';

export default function View() {
    let pc;
    let ServiceList;
    let ServiceList2 = useRef();
    
    console.log('adapter.browserDetails.browser?', adapter.browserDetails.browser);
  
    const localVideo = useRef();
    const remoteVideo = useRef();
    //const controlPanel = useRef();
    //const [localStream, setLocalStream] = useState({});
    const [remoteStream, setRemoteStream] = useState({});
//    const [isChannelReady, setIsChannelReady] = useState(false);
    let isChannelReady = false;
    const selected = useRef();
    const [isStarted, setIsStarted] = useState(false);
    const [isInitiator, setIsInitiator] = useState(false);
    const [query, setQuery] = useState([]);
    const [turnReady, setTurnReady] = useState(false);

    //const [serviceList, setServiceList] = useState({});
    const serviceList = useRef({})
    const [selectList, setSelectList] = useState([]);
  


    const pcConfig = {
      iceServers: [
        {
          urls: "turn:3.38.108.27",
          username: "usr",
          credential: "pass",
        },
      ],
    };
  
  //   const sdpConstraints = {
  //     offerToReceiveAudio: true,//set to false by Joonhwa 
  //     offerToReceiveVideo: true //set to false by Joonhwa 
  //   };
  
    const handleSelect = (e) => {
      console.log(e.target.value);
      selected.current = e.target.value;
    };
  
    const JoinService = () => {
      let selectedProfile = serviceList.current.find(function(data){
        return data.sid === selected.current
      });
      // memo by joonik 0710 ... filter 함수보다는 find함수가 더 효율적임
      console.log("selectedProfile? --> ", selectedProfile);
      socket.emit("Join_Service", selectedProfile.sid);
    };
  
    const gotStream = () => {
      console.log("Adding local stream.");
      sendMessage("connection request");
      // if (isInitiator) { // isInitiator set to true when a room is created(socket).
      //   maybeStart();
      // }
    };
  
    const sendMessage = (message, destination=null) => {
      let packet = {'from': socket.id, 'to':destination, 'message': message};
      console.log("Client sending message: ", packet);
      socket.emit("msg-v1", packet);
    };
  
    const AudioToggle = () => {
      console.log("Audio Toggle");
      //maybeStart(null); //delete?
      //console.log(localStream.getAudioTracks()[0].enabled);
      //localStream.getAudioTracks()[0].enabled = !localStream.getAudioTracks()[0].enabled;
    };
  
    useEffect(() => {
      setQuery(
        query.concat({
          header: "ServiceList",
          filter: {},
        })
      );
    //   console.log("query?", query);
    //   socket.emit("q_service", query);
      let querya = new Array({
        header: "ServiceList",
        filter: {},
      })
      socket.emit("q_service", querya);
    }, []);
  


    useEffect(() => {
      socket.on('q_result', function(q_result) {
        console.log('query result:' + q_result);
        const qres = JSON.parse(q_result);
        console.log(qres['header']);
        console.log(qres['data']);

      
          if(qres.header==='ServiceList'){
            //setServiceList(qres.data);
            serviceList.current = qres.data;
            let nextList = selectList;
            for (const [key, value] of Object.entries(Object(serviceList.current))) {
              console.log('list set up log',`${key}:${value.sid}`);
              nextList = nextList.concat(`${key}:${value.sid}`);
            }
            setSelectList(nextList);
          }
      });
        
          socket.on("created", function (room) {
            console.log("Created room " + room);
          });
        
          socket.on("full", function (room) {
            console.log("Room " + room + " is full");
          });
        
          socket.on("join", function (room) {
            console.log("Another peer made a request to join room " + room);
            console.log("This peer is the initiator of room " + room + "!");
            //setIsChannelReady(current => current = true);
            isChannelReady = true;
          });

          socket.on("joined", function (room) {
            console.log('join list', serviceList.current, 'selected', selected.current);
            let targetProfile = serviceList.current.find(function(data){
              return data.sid === selected.current
            });
            console.log("joined: " + targetProfile);
            //setIsChannelReady(current => current = true);
            if (targetProfile.description === "tsSensor") {
              console.log(`location.href='SensorMonitor.html'`);
            } else if (targetProfile.description === "Streamer") {
              console.log('stremer');
              //  navigator.mediaDevices.getUserMedia({
              //     audio: false,
              //     video: true
              //   })
              //   .then(gotStream)
              //   .catch(function(e) {
              //     alert('getUserMedia() error: ' + e.name);
              //   });
              gotStream();
            }

            isChannelReady = true;
          });
        
          socket.on("log", function (array) {
            console.log.apply(console, array);
          });
    
          socket.on("msg-v1", function (packet) {
            let message = packet.message;
            console.log('msg-v1 in!');
            console.log("Client received message:", message);
            try {
              if (message.type === "offer") {
                if (!isInitiator && !isStarted) {
                  maybeStart();
                }
                pc.setRemoteDescription(new RTCSessionDescription(message));
                doAnswer();
              } else if (message.type === "answer" && isStarted) {
                pc.setRemoteDescription(new RTCSessionDescription(message));
              } else if (message.type === "candidate" && isStarted) {
                var candidate = new RTCIceCandidate({
                  sdpMLineIndex: message.label,
                  candidate: message.candidate,
                });
                pc.addIceCandidate(candidate);
              } else if (message === "bye" && isStarted) {
                handleRemoteHangup();
              }
            } catch (e) {}
          });

    }, [socket]);



    const maybeStart = () => {
        console.log(
          ">>>>>>> maybeStart() ",
          isStarted,
          `localStream << 변수 주석처리함`,
          isChannelReady
        );
        // if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) { // disabled by Joonhwa
        if (!isStarted && isChannelReady) {
          console.log(">>>>>> creating peer connection");
          createPeerConnection();
          // pc.addStream(localStream);  // disabled by Joonhwa
          setIsStarted(true);
          console.log("isInitiator", isInitiator);
          if (isInitiator) {
            doCall();
          }
        }
      };



  
    function createPeerConnection() {
      try {
        // pc = new RTCPeerConnection(null);
        pc = new RTCPeerConnection(pcConfig); //Joonhwa
        pc.onicecandidate = handleIceCandidate;
        pc.onaddstream = handleRemoteStreamAdded;
        pc.onremovestream = handleRemoteStreamRemoved;
        console.log("Created RTCPeerConnnection", pc);
      } catch (e) {
        console.log("Failed to create PeerConnection, exception: " + e.message);
        alert("Cannot create RTCPeerConnection object.");
        return;
      }
    }
  
    function handleIceCandidate(event) {
      console.log("icecandidate event: ", event);
      if (event.candidate) {
        sendMessage({
          type: "candidate",
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
        });
      } else {
        console.log("End of candidates.");
      }
    }
  
    function handleCreateOfferError(event) {
      console.log("createOffer() error: ", event);
    }
  
    function doCall() {
      console.log("Sending offer to peer");
      pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
    }
  
    function doAnswer() {
      console.log("Sending answer to peer.");
      pc.createAnswer().then(
        setLocalAndSendMessage,
        onCreateSessionDescriptionError
      );
    }
  
    function setLocalAndSendMessage(sessionDescription) {
        console.log('sdp what?', sessionDescription);
      pc.setLocalDescription(sessionDescription);
      console.log("setLocalAndSendMessage sending message", sessionDescription);
      sendMessage(sessionDescription);
    }
  
    function onCreateSessionDescriptionError(error) {
      console.log("Failed to create session description: " + error.toString());
    }
  
    function requestTurn(turnURL) {
      var turnExists = false;
      for (var i in pcConfig.iceServers) {
        if (pcConfig.iceServers[i].urls.substr(0, 5) === "turn:") {
          turnExists = true;
          setTurnReady(true);
          break;
        }
      }
      if (!turnExists) {
        console.log("Getting TURN server from ", turnURL);
        // No TURN server. Get one from computeengineondemand.appspot.com:
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var turnServer = JSON.parse(xhr.responseText);
            console.log("Got TURN server: ", turnServer);
            pcConfig.iceServers.push({
              urls: "turn:" + turnServer.username + "@" + turnServer.turn,
              credential: turnServer.password,
            });
            setTurnReady(true);
          }
        };
        xhr.open("GET", turnURL, true);
        xhr.send();
      }
    }
  
    function handleRemoteStreamAdded(event) {
      console.log("Remote stream added. event.stream?>>>", event.stream);
      setRemoteStream((current) => {
        return event.stream;
      });
      remoteVideo.current.srcObject = event.stream;
      console.log('remotevd@@@@@@', remoteVideo.current.srcObject)
    }
  
    function handleRemoteStreamRemoved(event) {
      console.log("Remote stream removed. Event: ", event);
    }
  
  //   function hangup() {
  //     console.log("Hanging up.");
  //     stop();
  //     sendMessage("bye");
  //   }
  
    function handleRemoteHangup() {
      console.log("Session terminated.");
      stop();
      setIsInitiator(true);
    }
  
    function stop() {
      setIsStarted(false);
      pc.close();
      pc = null;
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
          <div id="videos">
            <video
              ref={localVideo}
              id="localVideo"
              autoPlay muted playsInline
            ></video>
            <video
              ref={remoteVideo}
              id="remoteVideo"
              autoPlay muted playsInline
            ></video>
          </div>
          <div>
            <button onClick={JoinService}>Start Streaming</button>
            <button onClick={AudioToggle}>My Audio On/Off</button>
            <select onChange={handleSelect} value={selected.current}>
              {selectList.map((item) => (
              <option value={item.split(':')[1]} key={item}>
                  {item}
              </option>
            ))}
            </select>
          </div>
        </SocketContext.Provider>

        <Footer />
      </>
    );
  }