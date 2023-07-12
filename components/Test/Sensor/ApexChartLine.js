import React, {memo} from 'react';
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const App = (props) => {

  return (
    <div style = {{width:"90%", marginTop: "10px"}}>
      <ReactApexChart options={props.options} series={props.data} type="line" height={400} />
    </div>
  );
};
export default memo(App);