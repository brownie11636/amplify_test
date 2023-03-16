import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Header from "../../../components/Layouts/Header";
import PageBanner from "../../../components/Common/PageBanner";
import Footer from "../../../components/Layouts/Footer";
import { socketPoint } from "../../../toServer/API-AccessPoint";
import ServiceListPanel2 from "../../../components/ServiceProfile/ServiceListPanel2";
import ServiceListPanel from "../../../components/ServiceProfile/ServiceListPanel";
import RTCvideo from "../../../components/Services/VideoPanel";
import RTCvideo2 from "../../../components/Services/VideoPanel2";
import 'bootstrap/dist/css/bootstrap.css';

const BSON = require('bson');

const pc_config = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};
const SOCKET_SERVER_URL = socketPoint;

export default function View2(props) {

  // ------------------- 컴포넌트 분리 작업 중...
  const [targetProfile, setTargetProfile] = useState({});
  const [profileList, setProfileList] = useState([]);


  const streamRef = useRef(undefined);
  const setStream = (stream) => {
    props.setStream(stream);
    //remoteVideoRef.current = stream; 
    console.log('stream?', stream.srcObject);
   }

  useEffect( () => {
    
  }, [])


  // -------------------
  const socketRef = useRef();
  const pcRef = useRef();

  const socketFrom = useRef();

  const remoteVideoRef = useRef(undefined);

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

  const createOffer = async () => {
    let selectedProfile = profileList.find(function (data) {
      return data.sid === targetProfile;
    });
    console.log('selectedProfile ?', selectedProfile);
    console.log("create offer & send offer to ", selectedProfile.sid);

    socketRef.current.emit("Join_Service", selectedProfile.sid);

    //if (!(pcRef.current && socketRef.current)) return;
    try {
      const sdp = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
      sendMessage(sdp, selectedProfile.sid);
      socketFrom.current = selectedProfile.sid;

    } catch (e) {
      console.error(e);
    }
  };

  const onCreateSessionDescriptionError = (error) => {
    console.log('Failed to create session description: ' + error.toString());
  }

  function handleRemoteStreamAdded(event) {
    console.log("Remote stream added. event.stream?>>>", event.stream);
    //remoteVideoRef.current.srcObject = event.stream;
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

    if (socketRef.current.connected) {
      console.log("connected socket \n my socket id > ", socketRef.current.id);
    } else {
      console.log("not connected socket");
    }

    socketRef.current.emit("q_service", querya);

    pcRef.current = new RTCPeerConnection(pc_config);
    serviceProfile.current = {
      socketId: socketRef.current.id,
      room: "room:" + socketRef.current.id,
      type: "Device_1",
      description: "Streamer",
      contents: "jooonik", //contents 수정필요!!!!!!!!!!!!!!!!!!
    };

    socketRef.current.on("joined", function (room, socketTo) {
      //reOffer();
      console.log("joined!");
    });

    socketRef.current.on('join', function (room) {
      console.log('Another peer made a request to join room ' + room);
      console.log('This peer is the initiator of room ' + room + '!');
      //setIsChannelReady(true);
      //isChannelReady = true;
    });

    socketRef.current.on('q_result', function (q_result) {

      if (socketRef.current.connected) {
        console.log("connected socket \n my socket id > ", socketRef.current.id);
      } else {
        console.log("not connected socket");
      }

      const qres = JSON.parse(q_result);
      console.log('list >', qres);


      if (qres.header === 'ServiceList') {
        //setServiceList(qres.data);
        serviceList.current = qres.data;
        let nextList = selectList;
        for (const [key, value] of Object.entries(Object(serviceList.current))) {
          //console.log('list set up log',`${key}:${value.sid}`);
          nextList = nextList.concat(`${key}:${value.sid}`);
        }
        setSelectList(nextList);
        setProfileList(qres.data);
      }
    });

    socketRef.current.on('msg-v1', async (packet) => {
      console.log('------------------msg-v1 ', packet.message.type, '-------------------');
      let message = packet.message;
      console.log('msg from', packet.from);
      console.log('Client received message:', message);
      socketFrom.current = packet.from;
      // let socketId = "arbitary socketID";
      try {
        if (message === 'connection request') {
          console.log('check : connection request');
        } else if (message.type === 'offer') {
          console.log('Viewer just do nothing in this msg type!');
        } else if (message.type === 'answer') {

          if (!pcRef.current) return;
          console.log('signalingStat', pcRef.current.signalingState);
          if (pcRef.current.signalingState !== 'stable') {
            console.log('set the pcRef : ', pcRef.current);
            pcRef.current.setRemoteDescription(new RTCSessionDescription(message));
            pcRef.current.onaddstream = handleRemoteStreamAdded;
          }
          pcRef.current.ontrack = (ev) => {
            console.log("add remotetrack success");
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = ev.streams[0];
              setStream(remoteVideoRef.current);
              console.log('src?', remoteVideoRef.current.srcObject);
              console.log('current?', remoteVideoRef.current);
            }
          };

          //sendMessage({type:'viewer ready'}, packet.from);

          console.log('set the pcRef2 : ', pcRef.current);

        } else if (message.type === 'candidate') {
        } else if (message.type === 'convey stream') {
          // console.log('convey stream. stream? >>', message);
          // remoteVideoRef.current.srcObject = BSON.deserialize(message.stream);
        }

      } catch (e) {
        console.log('err in msg-v1!', e);
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
    console.log(targetProfile.sid);
    console.log(e.target.value);
    selected.current = e.target.value;
    setTargetProfile(e.target.value)
  };

  const debugcode = () => {
    console.log(pcRef.current);
    console.log(remoteVideoRef.current.srcObject);
    console.log(remoteVideoRef.current)
    const tmp = remoteVideoRef.current.srcObject;
    remoteVideoRef.current.srcObject = tmp;
  }


  return (
      <div>
        <div class="row">
          <div class="col-md-4">

          </div>
          <div class="col-md-4">

            {/* <RTCvideo2 stream={remoteVideoRef.current} setStream={setStream} /> */}
            <video
            id="remotevideo"
            style={{
              width: 400,
              height: 400,
              margin: 5,
              backgroundColor: "black",
            }}
            ref={remoteVideoRef}
            autoPlay
            />


            

            <div class="col">

              <div class="col-md-4">
                <select class="form-control" style={{ width: '400px' }} onChange={handleSelect} value={targetProfile}>
                  {profileList.map((item) => (
                    <option value={item.sid} key={item.sid}>
                      {item.sid}
                    </option>
                  ))}
                </select>
              </div>

              <button type="button" class="btn btn-primary" onClick={createOffer}>Join Streaming</button>
              <button type="button" class="btn btn-primary" onClick={debugcode}>console debug</button>

            </div>

          </div>
        </div>
      </div>
  );
};
