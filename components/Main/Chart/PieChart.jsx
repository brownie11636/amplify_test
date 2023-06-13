import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = ({ data, type }) => {
  const success = data.filter((item) => item.status === "SUCCESS").length;
  const fail = data.filter((item) => item.status === "FAIL").length;
  const total = success + fail;
  const successRate = Math.round((success / total) * 100);
  const failRate = Math.round((fail / total) * 100);

  const series = [type ? successRate : failRate];
  const options = {
    colors: ["#222222"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        bottom: -2,
        left: -2,
        right: -2,
        top: -2,
      },
    },
    fill: {
      colors: [type ? "#00069E" : "#C80000"],
    },
    labels: [`${type ? "SUCCESS" : "FAIL"} ${type ? success : fail}`],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: true,
            fontSize: "18px",
            fontWeight: "400",
            offsetY: -10,
          },
          value: {
            show: true,
            color: "#222222",
            fontSize: "28px",
            fontWeight: "400",
            offsetY: 10,
          },
        },
        hollow: {
          margin: 0,
          size: "70%",
          background: "transparent",
        },
        track: {
          background: type ? "#00069E24" : "#C8000024",
          strokeWidth: "100%",
        },
      },
    },
  };

  return (
    <div className="w-[200px] min-w-[200px] h-[200px]">
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        width="100%"
        height="100%"
      />
    </div>
  );
};
export default PieChart;
