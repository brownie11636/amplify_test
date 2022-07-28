import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import WebRTCDetailsContent from "../components/Services/WebRTCDetailsContent"

export default function WebRTC() {
  return (
    <>
      <NavbarTwo />

      <PageBanner
        pageTitle="WebRTC"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Service Details"
        bgImgClass="item-bg2"
      />

      <WebRTCDetailsContent />

      <Footer />
    </>
  );
}
