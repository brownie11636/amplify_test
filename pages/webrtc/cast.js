import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Header from "../../components/Layouts/Header";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import {socketPoint} from "../../toServer/API-AccessPoint";

const pc_config = {
  iceServers: [
    // {
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
const SOCKET_SERVER_URL = socketPoint;
// const socketRef = io(SOCKET_SERVER_URL,{W
//     transports: ["websocket"] // HTTP long-polling is disabled
//     }
// );

export const App = () => {
  const socketRef = useRef();
  const pcRef = useRef();
  const pcsRef = useRef({});



  const socketFrom = useRef();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const serviceProfile = useRef();
  const selected = useRef();
  const serviceList = useRef();
  const [selectList, setSelectList] = useState([]);
  

  const sendMessage = (message, destination) => {
    console.log("send message(emit msg-v1)", message.type, destination);
    let packet = { from: socketRef.current.id, to: destination, message: message };
    //console.log('Client sending message: ', packet);
    socketRef.current.emit("msg-v1", packet);
  };

  const setVideoTracks = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      // if (!(pcRef.current && socketRef.current)) return;
      stream.getTracks().forEach((track) => {
        if (!pcRef.current) return;
        pcRef.current.addTrack(track, stream);
      });
      // pcRef.current.onicecandidate = (e) => {
      //   if (e.candidate) {
      //     if (!socketRef.current) return;
      //     console.log("onicecandidate");
      //     //socketRef.current.emit("candidate", e.candidate);
      //     sendMessage({
      //       type: 'candidate',
      //       label: e.candidate.sdpMLineIndex,
      //       id: e.candidate.sdpMid,
      //       candidate: e.candidate.candidate
      //     }, socketFrom.current);
      //   }
      // };
      // pcRef.current.oniceconnectionstatechange = (e) => {
      //   console.log('oniceconnectionstatechange : ', e.target.connectionState);
      // };

      socketRef.current.emit("Start_Service", {
        socketId: socketRef.current.id,
        room: "room:" + socketRef.current.id,
        type: "Device_1",
        description: "Streamer",
        contents: "jooonik", //contents 수정필요!!!!!!!!!!!!!!!!!!
      });
      sendMessage('got user media', null);

      // socketRef.current.emit("join_room", {
      //   room: "1234",
      // });
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    console.log("create offer");
    let selectedProfile = serviceList.current.find(function(data){
        //console.log(data);
        return data.sid === selected.current;
    });
    console.log(selectedProfile);
    console.log(selectedProfile);
    socketRef.current.emit("Join_Service", selectedProfile.sid);

    //if (!(pcRef.current && socketRef.current)) return;
    try {
      const sdp = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));

      console.log(pcRef.current.iceGatheringState);
      pcRef.current.oniceconnectionstatechange = (e) => {
        console.log('oniceconnectionstatechange : ', e.target.connectionState);
      };
      //socketRef.current.emit("offer", sdp);
      sendMessage(sdp, selectedProfile.sid);
      socketFrom.current = selectedProfile.sid;
      //socketRef.current.emit("offer", sdp);

    } catch (e) {
      console.log('errrrrrrrrr');
      console.error(e);
    }
  };

  const reOffer = async () => { 
    try {
      const sdp = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));

      console.log(pcRef.current.iceGatheringState);
      pcRef.current.oniceconnectionstatechange = (e) => {
        console.log('oniceconnectionstatechange : ', e.target.connectionState);
      };
      //socketRef.current.emit("offer", sdp);
      sendMessage(sdp, socketFrom.current);
      socketRef.current.emit("offer", sdp);

    } catch (e) {
      console.log('errrrrrrrrr');
      console.error(e);
    }
  }

  // function sleep(ms) {
  //   const wakeUpTime = Date.now() + ms;
  //   while (Date.now() < wakeUpTime) {}
  // }

  const onCreateSessionDescriptionError = (error) => {
    console.log('Failed to create session description: ' + error.toString());
  }
  

  const createAnswer = async (sdp, from) => { //getoffer & doAnswer
    //if (!(pcRef.current && socketRef.current)) return;
    try {
      pcsRef.current[from] = new RTCPeerConnection(pc_config);

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
        }
      };
      pcRef.current.oniceconnectionstatechange = (e) => {
        console.log('oniceconnectionstatechange : ', e.target.connectionState);
      };

      pcsRef.current = {...pcsRef.current, [from]: pcRef.current};



      await pcsRef.current[from].setRemoteDescription(new RTCSessionDescription(sdp));
//      await pcsRef.current[from].setRemoteDescription(new RTCSessionDescription(sdp));
      console.log("answer set remote description success", pcsRef.current);
//       const mySdp = await pcRef.current.createAnswer({
//         offerToReceiveVideo: true,
//         offerToReceiveAudio: true,
//       });
//       console.log("create answer");
//       await pcRef.current.setLocalDescription(new RTCSessionDescription(mySdp));
// //      await pcsRef.current[from].setLocalDescription(new RTCSessionDescription(mySdp));
//       pcsRef.current = {...pcsRef.current, [from]: pcRef.current};
//       sendMessage(mySdp, from);
      //socketRef.current.emit("answer", mySdp);

      pcsRef.current[from].createAnswer().then( async (sessionDescription) =>{
        await pcsRef.current[from].setLocalDescription(sessionDescription);
          console.log('setLocalAndSendMessage sending message', sessionDescription);
          sendMessage(sessionDescription, from);
        }, onCreateSessionDescriptionError);

      //pcsRef.current = {...pcsRef.current, [packet.from]: pcRef.current};


    } catch (e) {
      console.error(e);
    }
  };

  function handleRemoteStreamAdded(event) {
    console.log("Remote stream added. event.stream?>>>", event.stream);
    remoteVideoRef.current.srcObject = event.stream;
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
      transports: ["websocket"],
    });
    // const socketRef = io(SOCKET_SERVER_URL,{
    //     transports: ["websocket"] // HTTP long-polling is disabled
    //     }
    // );
    if (socketRef.current.connected) {
      console.log("connected");
    } else {
      console.log(SOCKET_SERVER_URL);
      console.log("not conn");
    }

    socketRef.current.emit("q_service", querya);

    pcRef.current = new RTCPeerConnection(pc_config);
    serviceProfile.current =   {
        socketId: socketRef.current.id,
        room: "room:" + socketRef.current.id,
        type: "Device_1",
        description: "Streamer",
        contents: "jooonik", //contents 수정필요!!!!!!!!!!!!!!!!!!
      };

    socketRef.current.on("all_users", (allUsers) => {
      console.log("alluser", allUsers.length, allUsers);
      // if (allUsers.length > 0) {
      //   createOffer();
      // }
    });

    socketRef.current.on("user-connected", (data) => {
      console.log('"user-connected"', data);
      //createOffer();
      // if (data > 0) {
      //     createOffer();
      //   }
    });

    socketRef.current.on("getOffer", (sdp) => {
      //console.log(sdp);
      console.log("get offer");
      createAnswer(sdp);
    });

    socketRef.current.on("getAnswer", (sdp) => {
      console.log("get answer");
      if (!pcRef.current) return;
      pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
      pcRef.current.onaddstream = handleRemoteStreamAdded;
      // pcRef.current.ontrack = (ev) => {
      //     console.log("add remotetrack success");
      //     if (remoteVideoRef.current) {
      //       remoteVideoRef.current.srcObject = ev.streams[0];
      //     }
      //   };
      //console.log(sdp);
    });

    socketRef.current.on("getCandidate", async (candidate) => {
      if (!pcRef.current) return;
      await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      console.log("candidate add success");
    });

    socketRef.current.on("joined", function (room, socketTo) {
        reOffer();
        console.log("joined!");
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
            let nextList = selectList;
            for (const [key, value] of Object.entries(Object(serviceList.current))) {
              //console.log('list set up log',`${key}:${value.sid}`);
              nextList = nextList.concat(`${key}:${value.sid}`);
            }
            setSelectList(nextList);
          }
      });

    socketRef.current.on('msg-v1', async (packet) => {
        console.log('------------------msg-v1 ', packet.message.type ,'-------------------');
        let message = packet.message;
        console.log('msg from', packet.from);
        console.log('Client received message:', message);
        socketFrom.current = packet.from;
        // let socketId = "arbitary socketID";
        try{
          if (message === 'connection request') {
            //RTCClientList.push({'socketId':packet.from});
            console.log('check : connection request');      
          } else if (message.type === 'offer') {
            // pcsRef.current[packet.from].onicecandidate = (e) => {
            //   if (e.candidate) {
            //     if (!socketRef.current) return;
            //     console.log("onicecandidate");
            //     //socketRef.current.emit("candidate", e.candidate);
            //     sendMessage({
            //       type: 'candidate',
            //       label: e.candidate.sdpMLineIndex,
            //       id: e.candidate.sdpMid,
            //       candidate: e.candidate.candidate
            //     }, socketFrom.current);
            //   }
            // };
            // pcsRef.current[packet.from].oniceconnectionstatechange = (e) => {
            //   console.log('oniceconnectionstatechange : ', e.target.connectionState);
            // };


            // await pcRef.current.setRemoteDescription(new RTCSessionDescription(message));

            // pcsRef.current = {...pcsRef.current, [packet.from]: pcRef.current};

            console.log('check : offer', message);
            createAnswer(message, packet.from);
          } else if (message.type === 'answer') {
            if (!pcRef.current) return;
            console.log('signalingStat', pcRef.current.signalingState);
            if(pcRef.current.signalingState !== 'stable') {
              console.log('set the pcRef : ', pcRef.current);
              pcRef.current.setRemoteDescription(new RTCSessionDescription(message));
              pcRef.current.onaddstream = handleRemoteStreamAdded;
            }
            console.log('set the pcRef2 : ', pcRef.current);      
          } else if (message.type === 'candidate') {
            console.log('check : candi---1');
          } else if (message === 'bye') {
          }

        }catch(e){
          console.log('eeeeeeeeeeee', e);
        }
      });

      

    //setVideoTracks();

    return () => {
      if (socketRef.current) {
        //   socketRef.current.disconnect();
      }
      if (pcRef.current) {
        //   pcRef.current.close();
      }
    };
  }, []);

  const handleSelect = (e) => {
    console.log(e.target.value);
    selected.current = e.target.value;
  };

  const debugcode = () => {
    reOffer(socketFrom.current);
    console.log(pcRef.current.iceGatheringState);
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
    <div>
      <video
        style={{
          width: 240,
          height: 240,
          margin: 5,
          backgroundColor: "black",
        }}
        muted
        ref={localVideoRef}
        autoPlay
      />
      <button onClick={setVideoTracks}>Start Streaming</button>
      <button onClick={debugcode}>console debug</button>
      <select onChange={handleSelect} value={selected.current}>
              {selectList.map((item) => (
              <option value={item.split(':')[1]} key={item}>
                  {item}
              </option>
            ))}
            </select>
    </div>
    <Footer />
    </>
  );
};

export default App;
