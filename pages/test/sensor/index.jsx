import Header from "../../../components/Layouts/Header";
import PageBanner from "../../../components/Common/PageBanner";
import Footer from "../../../components/Layouts/Footer";
// import WebRTCDetailsContent from "../../components/Services/WebRTCDetailsContent"
// import ChartSection from "../../../components/Test/Sensor/SensorChartSection";
// import ChartSection from "../../../components/Test/Sensor/ChartSection";
import BarChart from "../../../components/Test/Sensor/BarChart";
import LineChart from "../../../components/Test/Sensor/LineChart";

import React, { useEffect, useRef, useState } from "react";

const mqtt_url = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload/topic?topic=';

// const mqtt_url = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload/topic?topic=perpet/SerialNumber/acc';
import parser from "../../../components/Test/Sensor/seriesParsers";

const Test = ()=> {
  const data = [
    { id: "test1", angle: 10, status: "SUCCESS" },
    { id: "test2", angle: 30, status: "SUCCESS" },
    { id: "test3", angle: 20, status: "FAIL" },
  ];

  const data2 = {
    options: {
      title: {
        text:"Empty title",
        align: "center",
        style:{
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color:  '#263238'
        }
      },
      chart: {
        id: "basic-line",
        height: 380,
        width: "100%",
        Animation:{
          initialAnimation:{
            enabled: false
          }
        }
      },
      stroke: {
        curve: "smooth",//smooth, straight, stepline
        show: true,
        width: 2,
      },
      xaxis: {
        type: 'numeric',
        // type: 'datetime'
        title: {
          text: "time",
        },
      },
      yaxis: {
        title: {
          text: "sensor name[unit]",
        },
      },
    },
    series: [
      {
        name: "series-1",
        data: [[0,30], [20,40], [30,45], [40,50], [50,49], [60,60], [70,70], [1101,91]]
      },
      {
        name: "series-2",
        data: [[0,10], [200,40], [300,35], [400,100], [500,149], [600,160], [700,50], [1001,191]]
      }
    ]
  }
  
  const [targetDevice, setTargetDevice] = useState("perpet/SerialNumber/")
  const [targetSensor, setTargetSensor] = useState("acc")
  const [chartSeries, setChartSeries] = useState(data2.series)
  const [chartOption, setChartOption] = useState(data2.options)



  useEffect(() => {
    let series=[{
      name: targetDevice,
      data:[[0,10], [200,40], [300,35], [400,100], [500,149], [600,160], [700,50], [1001,191]]
    }]
    setChartOption(()=>{
      chartOption.title.text=targetDevice+targetSensor;
      return chartOption;
    })

    fetch(mqtt_url+targetDevice+targetSensor)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      let arr = data.data.content;
      setChartSeries(parser(arr,"1q2w3e4r", targetSensor));
      // parser(arr,"1q2w3e4r", targetSensor);
    })
    .catch(error => {
      console.error('Error:', error);
    });



  },[])

  return (
    <>
        <Header />

        <PageBanner
        pageTitle="Sensor IoT"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Sensor IoT"
        bgImgClass="item-bg2"
        />
        <LineChart
          options={chartOption} 
          series={chartSeries}
        />
        <BarChart data={data}/>
        {/* <ChartSection/> */}
        
        <Footer />
    </>
  );
}
export default Test;