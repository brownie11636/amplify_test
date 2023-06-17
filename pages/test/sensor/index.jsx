import Header from "../../../components/Layouts/Header";
import PageBanner from "../../../components/Common/PageBanner";
import Footer from "../../../components/Layouts/Footer";
// import WebRTCDetailsContent from "../../components/Services/WebRTCDetailsContent"
// import ChartSection from "../../../components/Test/Sensor/SensorChartSection";
// import ChartSection from "../../../components/Test/Sensor/ChartSection";
import BarChart from "../../../components/Test/Sensor/BarChart";
import LineChart from "../../../components/Test/Sensor/LineChart";



const Test = ()=> {
  const data = [
    { id: "test1", angle: 10, status: "SUCCESS" },
    { id: "test2", angle: 30, status: "SUCCESS" },
    { id: "test3", angle: 20, status: "FAIL" },
  ];

  const data2 = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  }

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
        <BarChart data={data}/>
        <LineChart data={data2}/>
        {/* <ChartSection/> */}
        {/* <MyResponsiveLine
          data={chartData}
        /> */}
        
        <Footer />
    </>
  );
}
export default Test;