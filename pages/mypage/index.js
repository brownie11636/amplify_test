import React, { Component } from "react";
import NavbarTwo from "../../components/Layouts/NavbarTwo";
import Footer from "../../components/Layouts/Footer";
import MypageAddDeviceContainer from "../../components/Mypage/MypageAddDeviceContainer";
import MypageDeviceList from "../../components/Mypage/MypageDeviceList";
import MypageNavbar from "../../components/Mypage/MypageNavbar";

export default function Mypage({}) {

    return (
        <>
        <NavbarTwo />
        <div style={{display: "flex", flexDirection: "row", height: "100%", minHeight: 720}}>
          <MypageNavbar />
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%"}}>
            <MypageAddDeviceContainer />
            <MypageDeviceList />
          </div>
        </div>
        <Footer />
      </>
    );
}
