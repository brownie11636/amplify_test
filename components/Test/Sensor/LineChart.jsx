import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({ data }) => {
  // const idArr = data.map((item) => item.options.chart.id);
  // const angle = data.map((item) => item.series);
  const idArr = data.options.chart.id;
  const angle = data.series;
  const series = [
    {
      // name: ["각도"],
      data: angle,
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
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
      categories: idArr,
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
      <ReactApexChart options={data.options} series={data.series} type="line" height={200} />
    </div>
  );
};
export default LineChart;
