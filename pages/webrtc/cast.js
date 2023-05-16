import React, { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import Header from "../../components/Layouts/Header";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import { socketPoint } from "../../toServer/API-AccessPoint";
import ServiceListPanel from "../../components/ServiceProfile/ServiceListPanel";
import RTCvideo from "../../components/Services/VideoPanel";
import 'bootstrap/dist/css/bootstrap.css';

const pc_config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
const SOCKET_SERVER_URL = socketPoint;

export const App = () => {

  const [profileList, setProfileList] = useState([]);
  const [targetProfile, setTargetProfile] = useState({});

  const setStream = (stream) => {
    localVideoRef.current = stream;
  }

  const socketRef = useRef();
  const pcRef = useRef();
  const pcsRef = useRef({});
  const socketFrom = useRef();


  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const serviceProfile = useRef();
  const selected = useRef();
  const serviceList = useRef();
  const [selectList, setSelectList] = useState([]);


  const sendMessage = (message, destination) => {
    console.log("send message(emit msg-v1)", message, message.type, destination);
    let packet = { from: socketRef.current.id, to: destination, message: message };
    console.log('Client sending message: ', packet);
    socketRef.current.emit("msg-v1", packet);
  };

  const setVideoTracks = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;

      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      socketRef.current.emit("Start_Service", {
        socketId: socketRef.current.id,
        room: "room:" + socketRef.current.id,
        roomId: "room:" + socketRef.current.id,
        state: { roomId: socketRef.current.id, socketId: socketRef.current.id },
        type: "Device_1",
        description: "Streamer",
        contents: "jooonik", //contents 수정필요!!!!!!!!!!!!!!!!!!
        stream: stream,
        //nickname : "aaaa",
      });
      sendMessage({ message: "got user media" });
      console.log('socket ID? >> ', socketRef.current.id);
      // socketRef.current.emit("join_room", {
      //   room: "1234",
      // });
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    console.log("create offer");
    let selectedProfile = serviceList.current.find(function (data) {
      //console.log(data);
      return data.sid === selected.current;
    });
    console.log(selectedProfile);
    socketRef.current.emit("Join_Service", selectedProfile.sid);
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

      sendMessage(sdp, socketFrom.current);

    } catch (e) {
      console.log('reOffer error!');
      console.error(e);
    }
  }

  const createPeerConnection = useCallback((socketID) => {

    const pc = new RTCPeerConnection(pc_config);

    try {
      localStreamRef.current.getTracks().forEach((track) => {
        if (!pcRef.current) return;
        pc.addTrack(track, localStreamRef.current);
        console.log('localStream track added.');
      });

      pc.ontrack = (ev) => {
        console.log("add remotetrack success");
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = ev.streams[0];
        }
      };

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) return;
          console.log("onicecandidate");
          //socketRef.current.emit("candidate", e.candidate);
          sendMessage({
            type: 'candidate',
            label: e.candidate.sdpMLineIndex,
            id: e.candidate.sdpMid,
            candidate: e.candidate.candidate
          }, socketID);
        }
      };

      pc.oniceconnectionstatechange = (e) => {
        console.log('oniceconnectionstatechange! : ', e.target.connectionState);
        if (e.target.connectionState == 'connecting') {

        }
      };

      pc.ondatachannel = (event) => {
        const channel = event.channel;
          channel.onopen = (event) => {
          channel.send('Hi back!');
        }
        channel.onmessage = (event) => {
          console.log(event.data);
        }
      }


      if (localStreamRef.current) {
        console.log('localstream add');
        localStreamRef.current.getTracks().forEach((track) => {
          if (!localStreamRef.current) return;
          pc.addTrack(track, localStreamRef.current);
        });
      } else {
        console.log('no local stream');
      }

      return pc;

    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, []);

  //--------------------------

  const onCreateSessionDescriptionError = (error) => {
    console.log('Failed to create session description: ' + error.toString());
  }


  const createAnswer = async (sdp, from) => { //getoffer & doAnswer

    console.log('createAnswer from > ', from)

    try {
      await pcsRef.current[from].setRemoteDescription(new RTCSessionDescription(sdp));
      console.log("answer set remote description success", pcsRef.current);

      pcsRef.current[from].createAnswer().then(async (sessionDescription) => {
        await pcsRef.current[from].setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendMessage(sessionDescription, from);
      }, onCreateSessionDescriptionError);


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

    console.log('useEffect socket event or somethings');

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
    if (socketRef.current.connected) {
      console.log("connected");
    } else {
      console.log(SOCKET_SERVER_URL);
      console.log("not conn");
    }

    socketRef.current.emit("q_service", querya);

    //pcRef.current = new RTCPeerConnection(pc_config);
    serviceProfile.current = {
      socketId: socketRef.current.id,
      room: "room:" + socketRef.current.id,
      type: "Device_1",
      description: "Streamer",
      contents: "jooonik", //contents 수정필요!!!!!!!!!!!!!!!!!!
    };

    socketRef.current.on("joined", function (room, socketTo) {
      console.log("joined!");
    });

    socketRef.current.on('join', function (room) {
      console.log('Another peer made a request to join room ' + room);
      console.log('This peer is the initiator of room ' + room + '!');
    });

    socketRef.current.on('q_result', function (q_result) {
      const qres = JSON.parse(q_result);


      if (qres.header === 'ServiceList') {

        setProfileList(qres.data);
        serviceList.current = qres.data;
        let nextList = selectList;
        for (const [key, value] of Object.entries(Object(serviceList.current))) {
          nextList = nextList.concat(`${key}:${value.sid}`);
        }
        setSelectList(nextList);
      }
    });

    socketRef.current.on('msg-v1', async (packet) => {
      console.log('----------------- msg-v1 ', packet.message.type, '------------------');
      let message = packet.message;
      console.log('msg from', packet.from);
      console.log('cast-Client received message:', message);
      socketFrom.current = packet.from;



      try {
        if (message === 'connection request') {
          //console.log('check : connection request');      

        } else if (message.type === 'offer') {
          const pc = createPeerConnection(packet.from);
          pcsRef.current = { ...pcsRef.current, [packet.from]: pc };

          //console.log('check : offer', message);
          createAnswer(message, packet.from);
        }
        else if (message.type === 'viewer ready') {
          // console.log('viewer ready, stream? >>',typeof(localVideoRef.current.srcObject), localVideoRef.current.srcObject);
          // const stream = JSON.stringify(localVideoRef.current.srcObject);
          // const stream2 = BSON.serialize(localVideoRef.current.srcObject);
          // console.log('viewer ready2, stream? >>',typeof(stream), stream);
          // console.log('viewer ready2-1, stream? >>',typeof(stream2), stream2);
          // sendMessage({type:'convey stream', stream: stream}, packet.from);
          //localVideoRef.current.srcObject
        }
      } catch (e) {
        console.log('msg-v1 Error!', e);
      }
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

  const handleSelect = (e) => {
    console.log(e.target.value);
    selected.current = e.target.value;
  };

  const debugcode = () => {
    reOffer(socketFrom.current);
    console.log(pcsRef.current);
  }

  // ----------- 컴포넌트 분리 작업 중
  const onProfileSelect = (profile) => {
    setTargetProfile(profile);
    JoinRTCService(profile);
    console.log("Selected profile:", profile)
  }

  // -----------


  return (
    <>
      <Header />

      <PageBanner
        pageTitle="You are Broadcaster!"
        homePageUrl="/"
        homePageText="Home"
        activePageText="WebRTC-Cast"
        bgImgClass="item-bg2"
      />

      <div>
        <div className="row">
          <div className="col-md-4">
          </div>

          <div className="col-md-4">
            <RTCvideo stream={localVideoRef.current} setStream={setStream} />
            {/* <button onClick={setVideoTracks}>Start Streaming</button> */}
            <div className="col-md-4">

              <select className="form-control" style={{ width: '400px' }} onChange={handleSelect} value={targetProfile}>
                {profileList.map((item) => (
                  <option value={item.sid} key={Math.random()}>
                    {item.sid}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" className="btn btn-primary" onClick={setVideoTracks}>Start Streaming</button>
            <button type="button" className="btn btn-primary" onClick={debugcode}>console debug</button>

          </div>

          <div className="col-md-4">
          </div>
        </div>
      </div>

      {/* <div className="service-list-area">
            <ServiceListPanel2 nProfileSelect={setTargetProfile}/>
    </div> */}

      <Footer />
    </>
  );
};

export default App;
