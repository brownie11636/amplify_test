import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AreaChart = ({ data }) => {
  const idArr = data?.id;
  const timeToAngle = data.timeToAngle;
  const angle = timeToAngle.map((item) => item.angle);
  const time = timeToAngle.map((item) => item.time);
  const series = [
    {
      name: "각도",
      data: angle,
    },
  ];
  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      height: 200,
      offsetY: 10,
    },
    stroke: {
      curve: "straight",
      width: 1,
    },
    markers: {
      size: 4,
      hover: {
        size: 5,
      },
    },
    colors: ["#00069E"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    fill: {
      colors: ["#182A5B"],
      opacity: 0.5,
    },
    xaxis: {
      title: {
        text: "시간(분)",
      },
    },
    yaxis: {
      title: {
        text: "각도",
      },
    },
    tooltip: {
      followCursor: true,
      shared: false,
      x: {
        show: false,
      },
      y: {
        formatter: function (val) {
          return val + "º";
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
    <div className="w-[200px] min-w-[200px] h-[200px]">
      <ReactApexChart options={options} series={series} type="area" height={200} />
    </div>
  );
};
export default AreaChart;
