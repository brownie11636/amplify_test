import LineChart from './NivoLineChart'
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import ServiceListPanel from "../ServiceProfile/ServiceListPanel";
import {socketPoint} from "../../toServer/API-AccessPoint";


const SOCKET_SERVER_URL = socketPoint;
// const socketRef = io(SOCKET_SERVER_URL,{W
//     transports: ["websocket"] // HTTP long-polling is disabled
//     }
// );

export const App = () => {
  const socketRef = useRef();
  const pcRef = useRef();
  const socketFrom = useRef();
  const serviceProfile = useRef();
  const selected = useRef();
  const serviceList = useRef();
  const [profileList, setProfileList] = useState([]);
  const [selectList, setSelectList] = useState([]);


  
  const sendMessage = (message, destination) => {
    console.log("send message(emit msg-v1)", message.type, destination);
    let packet = { from: socketRef.current.id, to: destination, message: message };
    //console.log('Client sending message: ', packet);
    socketRef.current.emit("msg-v1", packet);
  };

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
      console.log("connected");
    } else {
      console.log("not conn");
    }

    socketRef.current.emit("q_service", querya);

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
    });

    socketRef.current.on("joined", function (room, socketTo) {
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
          setProfileList(qres.data);
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
          } else if (message.type === 'candidate') {
            console.log('check : candi');
          } else if (message === 'bye') {
          }

        }catch(e){
          console.log('error', e);
        }
    });

    socketRef.current.on('log', function(message) {
      console.log(message);
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


  const onNewCommand = (value) => {
    socketRef.current.emit("msg-v1", value);

    console.log("operate:",value)
  }

  const onProfileSelect = (profile) =>{
    // socketRef.current.emit("msg-v1", value);

    // createOffer(profile);
    console.log("Selected profile:",profile.nickname)
  }
  return (
    <>
      <div className="base-frame bg-f2f6f9">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-8">
              <div className="service-list-area">
                <ServiceListPanel profileList={profileList} onProfileSelect={onProfileSelect}/>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-4 col-sm-6">

        </div> */}
        </div>
        <div style={{height:500}}>
            <LineChart/>
        </div>
    </>
  );
};
export default App;
