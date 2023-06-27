import React, {memo} from 'react';
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = (props) => {
  const options = [{
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
    colors: ["#00069E"],
    stroke: {
      curve: 'smooth'
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
    title: {
      text: 'x',
      align: 'left'
    },
  }, {
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
    colors: ["#00E396"],
    stroke: {
      curve: 'smooth'
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
    title: {
      text: 'y',
      align: 'left'
    },
  }, {
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
    colors: ["#008FFB"],
    stroke: {
      curve: 'smooth'
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
    title: {
      text: 'z',
      align: 'left'
    },
  }];

  return (
    <div style={{width:"100%"}}>
      <ReactApexChart options={options[0]} series={props.data.x} type="line" height={200} />
      <ReactApexChart options={options[1]} series={props.data.y} type="line" height={200} />
      <ReactApexChart options={options[2]} series={props.data.z} type="line" height={200} />
    </div>
  );
};
export default memo(LineChart);
