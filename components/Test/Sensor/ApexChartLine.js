import React, {memo} from 'react';
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const App = (props) => {
  const options = {
    chart: {
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
      }}
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    xaxis: {
      type: "numeric",
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    markers: {
      size: 5
    },
  };

  const DoubleYaxisOption = [
    {
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#008FFB'
      },
      labels: {
        style: {
          colors: '#008FFB',
        }
      },
      tooltip: {
        enabled: true
      }
    },
    {
      seriesName: 'rh',
      opposite: true,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#00E396'
      },
      labels: {
        style: {
          colors: '#00E396',
        }
      },
    }
  ];


  return (
    <div style = {{width:"90%"}}>
      <div style={{marginTop:"10px"}}>
        <ReactApexChart options={{ ...options, title: {text: "Accelerometer"}}} series={props.accData} type="line" height={400} />
      </div>
      <div style={{marginTop:"10px"}}>
        <ReactApexChart options={{ ...options, title: {text: "pressure"}}} series={props.prsData} type="line" height={400} />
      </div>
      <div style={{marginTop:"10px"}}>
        <ReactApexChart options={{ ...options, yaxis: DoubleYaxisOption, title: {text: "Temperature/Relative humidity"}}} series={props.trhData} type="line" height={400} />
      </div>
    </div>
  );
};
export default memo(App);