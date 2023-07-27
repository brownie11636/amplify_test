import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BarChart = ({ data }) => {
  const idArr = data?.id;
  const timeToAngle = data.timeToAngle;
  const angle = timeToAngle.map((item) => item.angle);
  const time = timeToAngle.map((item) => item.time);
  const series = [
    {
      name: ["각도"],
      data: angle,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
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
      title: {
        text: "시간",
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "각도",
      },
      labels: {
        show: false,
      },
    },
    tooltip: {
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
      <ReactApexChart options={options} series={series} type="bar" height={200} />
    </div>
  );
};
export default BarChart;
