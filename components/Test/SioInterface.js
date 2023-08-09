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
  const [chartDataPos, setChartDataPos] = useState([]);
  const [chartDataAng, setChartDataAng] = useState([]);


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

  const deviceSlt = useRef();

 
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
    deviceSlt.current.options.length = 1;
    modules.map((JSON)=>{
      const option = document.createElement("option");
      option.innerText = `id: ${JSON.id}`;
      option.value = JSON.id;
      option.key = JSON.id;
      deviceSlt.current.append(option);
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

      let msg = {from:commClientV01.socket.id, to:deviceSlt.current.options[deviceSlt.current.selectedIndex].value, msg:inputJson};

      commClientV01.socket.emit("robot", "C2C", msg,(res) => {
        console.log("response for connection request:", res);
      })
      
    } catch (e) {
      console.log("inputJsonString is not valid json");
      return;
    }
  }
  const  downloadJsonFile = () => {
    // Convert array to JSON string
    const jsonString = JSON.stringify(dataArray, null, 2);
  
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" });
  
    // Create a download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
  
    // Trigger a click event to download the file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  const uploadJsonFileToServer = () => {
    // Prompt the user for a filename
    const fileName = prompt("Enter a filename", "data.json");

    if (!fileName) {
      return; // Exit if the user cancels the prompt
    }    
    // Convert sensor data to JSON format
    const jsonData = JSON.stringify(dataArray);

    // Create a Blob from the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
    console.log("blob: ", blob);

    // Create a FormData object and append the .json file
    const formData = new FormData();
    formData.append('file', blob, 'sensor_data.json');

    //https://localhost:3333/portalfetch/test
    // Send the .json file to the server using Fetch API
    fetch('https://192.168.0.22:3333/portalfetch/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
          // Inform the user using an alert
        alert(`File "${fileName}" has been uploaded successfully.`);
        // Handle the response from the server if needed
        console.log(data);
      })
      .catch(error => {
          // Inform the user using an alert
          alert(`Error in uploading the file`);
          console.error('Error uploading data:', error);
      });
    }



  useEffect(() => {
    const interval = setInterval(() => {
      // Convert the data to the format expected by ApexCharts
      const timeArray = dataArray.map(data => data[0]);
      const dataArrayX = dataArray.map(data => data[1]);
      const dataArrayY = dataArray.map(data => data[2]);
      const dataArrayZ = dataArray.map(data => data[3]);
    
      // const dataSeriesX = timeArray.map((time, index) => ({ x: time, y: dataArrayX[index] }));
      // const dataSeriesY = timeArray.map((time, index) => ({ x: time, y: dataArrayY[index] }));
      // const dataSeriesZ = timeArray.map((time, index) => ({ x: time, y: dataArrayZ[index] }));
      const dataSeriesX = dataArray.map(data => ({ x: data[0], y: data[1] }));
      const dataSeriesY = dataArray.map(data => ({ x: data[0], y: data[2] }));
      const dataSeriesZ = dataArray.map(data => ({ x: data[0], y: data[3] }));
      const dataSeriesRoll = dataArray.map(data => ({ x: data[0], y: data[4] }));
      const dataSeriesPitch = dataArray.map(data => ({ x: data[0], y: data[5] }));
      const dataSeriesYaw = dataArray.map(data => ({ x: data[0], y: data[6] }));
    
    
      setChartDataPos([
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
      ]);
      setChartDataAng([
        {
          "name": "roll",
          "data": dataSeriesRoll
        },
        {
          "name": "pitch",
          "data": dataSeriesPitch
        },
        {
          "name": "yaw",
          "data": dataSeriesYaw
        }
      ]);



    }, 100);
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [dataArray]);



  return (
    <>
      <section className="bg-white w-[984px] h-[1200px] mt-[38px] flex flex-col">

        <div>
          <select className="w-[250px]" ref={deviceSlt}>
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
            let selected = deviceSlt.current.options[deviceSlt.current.selectedIndex].value;
            let msg = { moduleId: selected }
            console.log(deviceSlt.current.options[deviceSlt.current.selectedIndex])
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
        <div>
        <button 
            onClick={downloadJsonFile}
            className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
          >
          <span>download as .csv file</span>
          </button>
          <button 
            onClick={uploadJsonFileToServer}
            className="text-white w-[130px] h-[40px] bg-[#182a5b]" 
          >
          <span>upload data to server</span>
          </button>
        </div>

        <div>
          <ApexChartLine data={chartDataPos} options={{ ...options, title: {text: "TCP pos"}}}/>
          <ApexChartLine data={chartDataAng} options={{ ...options, title: {text: "Tool posture"}}}/>
        </div>
      </section>
    </>
  );
};



export default SioInterface;