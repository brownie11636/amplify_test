import Link from "next/link";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";

export default function WebRTC() {
  return (
    <>
      <NavbarTwo />

      <PageBanner
        pageTitle="Security & Surveillance"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Service Details"
        bgImgClass="item-bg2"
      />

      <h1>WebRTC Main Page</h1>
      <Link href="/webrtc/cast">
        <h3>Cast</h3>
      </Link>
      <br />
      <Link href="/webrtc/view">
        <h3>View</h3>
      </Link>

      <Footer />
    </>
  );
}
