import { Suspense, createContext,useContext, useEffect, useState, useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic'

import { PortalCommContext } from '../../utils/contexts/portalComm';


export const RgbdContext = createContext();
export const PortalRTCContext = createContext();

const SioRobot = (props) => {
  const {commClientV01} = useContext(PortalCommContext);
  const [inputString, setInputString] = useState("(string-type input)");
  const inputJsonString_default = {"type":"set_pos","data":{"arm":[-0.1074,-0.4774,0.2029,1.135,-3.047,2.150],"grip":500}};
  //convert json to string
  const [inputJsonString, setInputJsonString] = useState(JSON.stringify(inputJsonString_default));
  const [chartDataPos, setChartDataPos] = useState([]);
  const [chartDataAng, setChartDataAng] = useState([]);

 
  commClientV01.socket.on("robot", (type, packet) => {
    console.log("received type:", type);
    console.log("received packet:", packet);
  });
  
  const [robotPosData, setRobotPosData] = useState([]);


  const [sliderValue, setSliderValue] = useState(50); // Initial value

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

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


      // setDataArray((prevDataArray) => [...prevDataArray, [time, ...inputJson.data.arm]]);
      // console.log("dataArray:", dataArray);

      let msg = {from:commClientV01.socket.id, to:props.target.serialNumber, msg:inputJson};

      commClientV01.socket.emit("robot", "C2C", msg,(res) => {
        console.log("response for connection request:", res);
      })
      
    } catch (e) {
      console.log("inputJsonString is not valid json");
      return;
    }
  }

  const onClickConnectRobot = () => {
    console.log("props.target:",props.target);
    // let selected = deviceSlt.current.options[deviceSlt.current.selectedIndex].value;
    let msg = { serialNumber: props.target.serialNumber }
    // console.log(deviceSlt.current.options[deviceSlt.current.selectedIndex])
    commClientV01.socket.emit("connect-module", msg, (res) => {
      console.log("response for connection request:", res);
      if(res.status === "ok") {
        console.log(commClientV01)
        // commClientV01.connectedModules.push(selected);
      }
      // console.log("module connected:", selected);
    });
    // console.log("request robot connection",selected);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Convert the data to the format expected by ApexCharts
    
      // const dataSeriesX = timeArray.map((time, index) => ({ x: time, y: dataArrayX[index] }));
      // const dataSeriesY = timeArray.map((time, index) => ({ x: time, y: dataArrayY[index] }));
      // const dataSeriesZ = timeArray.map((time, index) => ({ x: time, y: dataArrayZ[index] }));
      const dataSeriesX = robotPosData.map(data => ({ x: data[0], y: data[1] }));
      const dataSeriesY = robotPosData.map(data => ({ x: data[0], y: data[2] }));
      const dataSeriesZ = robotPosData.map(data => ({ x: data[0], y: data[3] }));
      const dataSeriesRoll = robotPosData.map(data => ({ x: data[0], y: data[4] }));
      const dataSeriesPitch = robotPosData.map(data => ({ x: data[0], y: data[5] }));
      const dataSeriesYaw = robotPosData.map(data => ({ x: data[0], y: data[6] }));


    }, 100);
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [robotPosData]);



  return (
    <>
      <section className="bg-white w-[984px] h-[1200px] mt-[38px] flex flex-col">

        <div>
          <button 
          className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
          onClick={onClickConnectRobot}
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

        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <p>Height: {sliderValue}</p>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <p>angle1: {sliderValue}</p>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <p>angle2: {sliderValue}</p>
        </div>
        <div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <p>angle3: {sliderValue}</p>
        </div>

      </section>
    </>
  );
};

export default SioRobot;