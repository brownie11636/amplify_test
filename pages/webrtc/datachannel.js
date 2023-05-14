import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Header from "../../components/Layouts/Header";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
// import ControlPanel from "../../components/MonkeyEye/ControlPanel";
// import ServiceListPanel from "../../components/ServiceProfile/ServiceListPanel";
import {socketPoint} from "../../toServer/API-AccessPoint";
import DatachannelController from "../../components/Services/DatachannelController"


const pc_config = {
  iceServers: [
    {
      "urls": "turn:3.35.133.246",
      "username":"user",
      "credential":"pass"
    },
   {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

const SOCKET_SERVER_URL = socketPoint;
// const SOCKET_SERVER_URL = "https://192.168.0.22:3333";

export const Datachannel = () => {
  const socketRef = useRef();
  const pcRef = useRef();
  const socketFrom = useRef();
  const remoteVideoRef = useRef(null);
  const serviceList = useRef();
  const [profileList, setProfileList] = useState([]);
  const [selectList, setSelectList] = useState([]);
  let [targetProfile, setTargetProfile] = useState({});

  const dataChannelRef = useRef(undefined);

  

  const [txPacket,setTxPacket] = useState();
  
  const sendMessage = (message, destination) => {
    console.log("send message(emit msg-v1)", message, destination);
    let packet = { from: socketRef.current.id, to: destination, message: message };
    //console.log('Client sending message: ', packet);
    socketRef.current.emit("msg-v1", packet);
  };
  const sendMessageV2 = (message, destination) => {
    console.log("send message(emit msg-v2)", message, destination);
    let packet = { from: socketRef.current.id, to: destination, message: message };
    socketRef.current.emit("msg-v2", packet);
  };

  const JoinRTCService = async (profile) => {
    console.log(profile);
    socketRef.current.emit("Join_Service", profile.sid);
  };

  const onCreateSessionDescriptionError = (error) => {
    console.log('Failed to create session description: ' + error.toString());
  }
  
  const doAnswer = async (sdp, from) => { //getoffer & doAnswer
    //if (!(pcRef.current && socketRef.current)) return;
    try {
      pcRef.current = new RTCPeerConnection(pc_config);


      pcRef.current.ondatachannel = (event) => {
        const channel = event.channel;
          channel.onopen = (event) => {
          channel.send('Hi back!');
        }
        channel.onmessage = (event) => {
          console.log(event.data);
        }
      }

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) return;
          console.log("onicecandidate");
          //socketRef.current.emit("candidate", e.candidate);
          sendMessage({
            type: 'candidate',
            label: e.candidate.sdpMLineIndex,
            id: e.candidate.sdpMid,
            candidate: e.candidate.candidate
          }, from);
        }else{
          console.log('End of candidates')
        }
      };

      pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
      pcRef.current.onaddstream = handleRemoteStreamAdded;
      pcRef.current.onremovestream = handleRemoteStreamRemoved;
      console.log("answer set remote description success", pcRef.current);
      console.log("sending answer to peer")

      pcRef.current.createAnswer().then( async (sessionDescription) =>{
        await pcRef.current.setLocalDescription(sessionDescription);
          console.log('setLocalAndSendMessage sending message', sessionDescription);
          sendMessage(sessionDescription, from);
        },
      onCreateSessionDescriptionError);

    } catch (e) {
      console.error(e);
    }
  };

  function handleRemoteStreamAdded(event) {
    console.log("Remote stream added. event.stream?>>>", event.stream);
    remoteVideoRef.current.srcObject = event.stream;
  }
  function handleRemoteStreamRemoved(event) {
    console.log("Remote stream removed. Event:", event);
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

    socketRef.current = io(SOCKET_SERVER_URL, {
      transports: ["websocket"], // HTTP long-polling is disabled
    });

    if (socketRef.current.connected) {
      console.log("connected");
    } else {
      console.log("not conn");
    }

    socketRef.current.emit("q_service", querya);

    pcRef.current = new RTCPeerConnection(pc_config);

    socketRef.current.on("joined", function (room, socketTo) {
      // if(targetProfile.description === 'Streamer'){
        sendMessage("connection request");
        console.log("connection request")
      // }
    });

    socketRef.current.on('join', function (room){
      console.log('Another peer made a request to join room ' + room);
      console.log('This peer is the initiator of room ' + room + '!');
      //setIsChannelReady(true);
      //isChannelReady = true;
    });

    socketRef.current.on('q_result', function(q_result) {
        const qres = JSON.parse(q_result);
        if(qres.header==='ServiceList'){
          //setServiceList(qres.data);
          serviceList.current = qres.data;
          setProfileList(qres.data);
          let nextList = selectList;
          for (const [key, value] of Object.entries(Object(serviceList.current))) {
            nextList = nextList.concat(`${key}:${value.sid}`);
          }
          setSelectList(nextList);
        }
    });

    socketRef.current.on('msg-v1', async (packet) => {
        console.log('------------------msg-v1 ', packet.message.type ,'-------------------');
        let message = packet.message;
        console.log('msg from:', packet.from);
        console.log('Client received message:', message);
        socketFrom.current = packet.from;
        try{
          if (message === 'connection request') {
            console.log('check : connection request');      
          } else if (message.type === 'offer') {
            doAnswer(message, packet.from);
          } else if (message.type === 'answer') {
            if (!pcRef.current) return;
            console.log('signalingStat', pcRef.current.signalingState);
            if(pcRef.current.signalingState !== 'stable') {
              console.log('set the pcRef : ', pcRef.current);
              pcRef.current.setRemoteDescription(new RTCSessionDescription(message));
              pcRef.current.onaddstream = handleRemoteStreamAdded;
            }
          } else if (message.type === 'candidate') {
            let candidate = new RTCIceCandidate({
              sdpMLineIndex: message.label,
              candidate: message.candidate
            });
            pcRef.current.addIceCandidate(candidate);
          } else if (message === 'bye') {
          }

        }catch(e){
          console.log('error', e);
        }
    });

    socketRef.current.on('log', function(message) {
      console.log(message);
    });
    return () => {
      if (socketRef.current) {
        //   socketRef.current.disconnect();
      }
      if (pcRef.current) {
        //   pcRef.current.close();
      }
    };
  }, []);

  const onNewCommand = (command) => {
    const packet = JSON.stringify({type:"DUP",data:command})
    setTxPacket(packet)
    // socketRef.current.emit("msg-v2", packet);
    sendMessageV2(packet, null)
    console.log("operate:",packet)
  }

  const onProfileSelect = (profile) =>{
    setTargetProfile(profile);
    JoinRTCService(profile);
    console.log("Selected profile:",profile)
  }

  const onClickStartButton = ()=>{
    const packet = JSON.stringify({type:"CONFIG",data:{"record":"START"}})
    setTxPacket(packet)
    sendMessageV2(packet, null)
    console.log("operate:",packet)
  }
  const onClickSaveButton = ()=>{
    const packet = JSON.stringify({type:"CONFIG",data:{"record":"WRITE"}})
    setTxPacket(packet)
    sendMessageV2(packet, null)
    console.log("operate:",packet)
  }

  const onClickCalibrationButton = ()=>{
    const packet = JSON.stringify({type:"SIG",data:{"type":"modeRobot","mode":"calibration"}})
    setTxPacket(packet)
    sendMessageV2(packet, null)
    console.log("operate:",packet)
  }

  const onClickOperationButton = ()=>{
    const packet = JSON.stringify({type:"SIG",data:{"type":"modeRobot","mode":"operation"}})
    setTxPacket(packet)
    sendMessageV2(packet, null)
    console.log("operate:",packet)
  }

  const onClickTerminationButton = ()=>{
    const packet = JSON.stringify({type:"SIG",data:{"type":"modeRobot","mode":"termination"}})
    setTxPacket(packet)
    sendMessageV2(packet, null)
    console.log("operate:",packet)
  }

  const stateCheck = () => {
    console.log('connection state?', pcRef.current.connectionState);
  }

  return (
    <>
      <Header />

      <PageBanner
        pageTitle="Monkey Eye"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Teleoperation"
        bgImgClass="item-bg2"
      />
      <DatachannelController />
      <Footer />
    </>
  );
};
export default Datachannel;
