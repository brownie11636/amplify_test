import Header from "../../components/Layouts/Header";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import WebRTCDetailsContent from "../../components/Services/WebRTCDetailsContent"
// import ChartSection from "../../components/Charts/ChartSection";

export default function WebRTC() {
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
        {/* <ChartSection/> */}
        
        <Footer />
    </>
  );
}
