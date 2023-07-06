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
    colors: ["#00069E"],
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: "numeric",
    },
    yaxis: {
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
      text: 'Pressure',
      align: 'left'
    },
  };

  return (
    <div style={{width:"100%"}}>
      <ReactApexChart options={options} series={props.data} type="line" height={400} />
    </div>
  );
};
export default memo(App);