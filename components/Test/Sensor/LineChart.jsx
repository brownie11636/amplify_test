import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = (props) => {
  // const idArr = data.map((item) => item.options.chart.id);
  // const angle = data.map((item) => item.series);
  // const angle = data.series;
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    stroke: {
      curve: "smooth",
      show: true,
    },
    colors: ["#00069E"],
    toolbar: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    fill: {
      colors: ["#00069E"],
    },
    toolbar: {
      show: false,
    },
    xaxis: {
      // type: "numeric",
      type: "datetime",
      title: {
        text: "시간",
      },
    },
    yaxis: {
      title: {
        text: "각도",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "";
        },
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
  };

  return (
    <div>
      <ReactApexChart options={props.options} series={props.series} type="line" height={200} />
    </div>
  );
};
export default LineChart;
