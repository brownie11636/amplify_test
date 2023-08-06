import { Suspense, createContext,useContext, useEffect, useState, useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic'

import { PortalCommContext } from '../../utils/contexts/portalComm';
import ApexChartLine from './Sensor/ApexChartLine';


// const Scene = dynamic(() => import("../../components/PortalXR/Scene"), { ssr: true })
// import Scene from "../../components/PortalXR/Scene";

export const RgbdContext = createContext();
export const PortalRTCContext = createContext();

const SioInterface = () => {
  const {commClientV01} = useContext(PortalCommContext);
  const [inputString, setInputString] = useState("(string-type input)");
  const inputJsonString_default = {"type":"set_pos","data":{"arm":[-0.1074,-0.4774,0.2029,1.135,-3.047,2.150],"grip":500}};
  //convert json to string
  const [inputJsonString, setInputJsonString] = useState(JSON.stringify(inputJsonString_default));
  const [chartData, setChartData] = useState([]);


  const [options, setOptions] = useState({
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: false,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
    },
    xaxis: {
      type: "datetime",
      // type: "numeric"
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 0
    },
  });


  const portalRTCRef = useRef();
  // const svcSltOpt = uesRef();

  const robotSlt = useRef();

 
  commClientV01.socket.on("robot", (type, packet) => {
    console.log("received type:", type);
    console.log("received packet:", packet);
  });
  
  const [dataArray, setDataArray] = useState([]);


  const updateRobotSelect = (modules) => {
    //module: List of moduleJSONs
    console.log("robotmodulesTYPE:",typeof modules)
    console.log("robotmodules:",modules)
    console.log('%c updateRobotSelect, received JSON \n', `color: ${"white"}; background: ${"black"}`, modules);
    robotSlt.current.options.length = 1;
    modules.map((JSON)=>{
      const option = document.createElement("option");
      option.innerText = `id: ${JSON.id}`;
      option.value = JSON.id;
      option.key = JSON.id;
      robotSlt.current.append(option);
      console.log(JSON)
    });
  }

//convert json to string


  // Event handler to handle text input changes
  const onChangeInputString = (event) => {
    setInputString(event.target.value);
  }; 
  const onChangeInputJson = (event) => {
    setInputJsonString(event.target.value);
  }; 


  const onClickButtonSendString = () => {
    console.log("inputString:",inputString);
    commClientV01.socket.emit("query-module-portal", "filter",(res) => {
      updateRobotSelect(res)
    })
  }

  const onClickButtonSendJson = () => {
    try {
      const inputJson = JSON.parse(inputJsonString);
      console.log("inputJsonString:",inputJson);

      //set current time, and merge it with inputJson.data.arm
      let time = new Date().getTime();


      setDataArray((prevDataArray) => [...prevDataArray, [time, ...inputJson.data.arm]]);
      console.log("dataArray:", dataArray);

      let msg = {from:commClientV01.socket.id, to:robotSlt.current.options[robotSlt.current.selectedIndex].value, msg:inputJson};

      commClientV01.socket.emit("robot", "C2C", msg,(res) => {
        console.log("response for connection request:", res);
      })
      
    } catch (e) {
      console.log("inputJsonString is not valid json");
      return;
    }
  }


  useEffect(() => {
    const interval = setInterval(() => {
      // Convert the data to the format expected by ApexCharts
      const timeArray = dataArray.map(data => data[0]);
      const dataArrayX = dataArray.map(data => data[1]);
      const dataArrayY = dataArray.map(data => data[2]);
      const dataArrayZ = dataArray.map(data => data[3]);
    
      const dataSeriesX = timeArray.map((time, index) => ({ x: time, y: dataArrayX[index] }));
      const dataSeriesY = timeArray.map((time, index) => ({ x: time, y: dataArrayY[index] }));
      const dataSeriesZ = timeArray.map((time, index) => ({ x: time, y: dataArrayZ[index] }));
    
      const tempData =  [
        {
          "name": "x",
          "data": dataSeriesX
        },
        {
          "name": "y",
          "data": dataSeriesY
        },
        {
          "name": "z",
          "data": dataSeriesZ
        }
      ]
    
      setChartData(tempData);



    }, 100);
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [dataArray]);



  return (
    <>
      <section className="bg-white w-[984px] h-[600px] mt-[38px] flex flex-col">

        <div>
          <select className="w-[250px]" ref={robotSlt}>
            <option>available robots</option>
          </select>
          <button 
          className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
          onClick={() => {
            commClientV01.socket.emit("query-module-portal", "filter",(res) => {
              updateRobotSelect(res)
            })
          }}
          >query robots</button>        
          <button 
          className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
          onClick={() => {
            let selected = robotSlt.current.options[robotSlt.current.selectedIndex].value;
            let msg = { moduleId: selected }
            console.log(robotSlt.current.options[robotSlt.current.selectedIndex])
            commClientV01.socket.emit("connect-module", msg, (res) => {
              console.log("response for connection request:", res);
              if(res.status === "ok") {
                console.log(commClientV01)
                commClientV01.connectedModules.push(selected);
              }
              console.log("module connected:", selected);
            });
            console.log("request robot connection",selected);
            }}
          >connect robot</button>
        </div>

        <div className="flex flex-row">
          <input
            type="text"
            id="inputString"
            className='w-[80%] bg-[#e5e5ff]'
            value={inputString}
            onChange={onChangeInputString}
          />
          <button 
            onClick={onClickButtonSendString}
            className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
            >
            <span>send string</span>
          </button>

        </div>        

        <div className="flex flex-row">
          <input
            type="text"
            id="inputString"
            className='w-[80%] bg-[#e5e5ff]'
            value={inputJsonString}
            onChange={onChangeInputJson}
          />
          <button 
            onClick={onClickButtonSendJson}
            className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
            >
            <span>send json</span>
          </button>
        </div>
        <ApexChartLine data={chartData} options={{ ...options, title: {text: "robot coordinate"}}}/>

      </section>
    </>
  );
};



export default SioInterface;