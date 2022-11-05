import LineChart from './NivoLineChart'
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import ServiceListPanel from "../ServiceProfile/ServiceListPanel";
import {socketPoint} from "../../toServer/API-AccessPoint";


// const SOCKET_SERVER_URL = socketPoint;
const SOCKET_SERVER_URL = "https://192.168.0.22:3333";
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

  const [chartData, setChartData] = useState([{
    "id": "japan",
    "color": "hsl(135, 70%, 50%)",
    "data":[{x:0,y:0},{x:10,y:10},{x:20,y:20},{x:30,y:10},{x:40,y:30}]
  }])

  
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

    socketRef.current.on("user-connected", (data) => {
      console.log('"user-connected"', data);
    });

    socketRef.current.on("joined", function (room, socketTo) {
        console.log("joined!");
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
  
    socketRef.current.on('msg-v0', async (packet) => {
        console.log('msg-v0: ', JSON.parse(packet));
        const rxData = JSON.parse(packet).data;
        let buf = {"ch0":[],"ch1":[],"ch2":[],"ch3":[],"ch4":[]}
        let dataset=[];
        for(const ch in buf){
          dataset.push({"id":ch,"data":buf[ch]})
        }

        for(const item of rxData){
          const obj=JSON.parse(item.data);
          const key=Object.keys(obj)[0];
          const data = obj[key].data;
          const t0 = obj[key].t0;
          console.log(data);
          data.forEach((value, i) => {
            buf[key].push({x:t0+i*40,y:value});    
          });
        }
        console.log("buf:",buf);

        setChartData(dataset);
        // try{
        //   if (message === 'connection request') {
        //     //RTCClientList.push({'socketId':packet.from});
        //     console.log('check : connection request');      
        //   } else if (message.type === 'candidate') {
        //     console.log('check : candi');
        //   } else if (message === 'bye') {
        //   }
        // }catch(e){
        //   console.log('error', e);
        // }
    });

    socketRef.current.on('log', function(message) {
      console.log(message);
    });


    

    return () => {
    };
  }, []);


  const onNewCommand = (value) => {
    socketRef.current.emit("msg-v1", value);

    console.log("operate:",value)
  }

  const onProfileSelect = (profile) =>{
    let txPacket = {
      _H:"DREQ",
      TSID:"test_0000_0000_0000",
    }
    socketRef.current.emit("msg-v0", txPacket);
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
            <LineChart data={chartData}/>
        </div>
    </>
  );
};
export default App;
