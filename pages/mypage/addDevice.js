import React, { Component } from "react";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import MypageAddDeviceContainer from "../../components/Mypage/MypageAddDeviceContainer";
import MypageDeviceList from "../../components/Mypage/MypageDeviceList";
import MypageNavbar from "../../components/Mypage/MypageNavbar";
import MypageAddDevice from "../../components/Mypage/MypageAddDevice";

export default function Mypage({}) {

    return (
        <>
        <Header />
        <div style={{display: "flex", flexDirection: "row", height: "100%", minHeight: 720}}>
          <MypageNavbar />
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%"}}>
            <MypageAddDeviceContainer />
            <MypageAddDevice />
            <MypageDeviceList />
          </div>
        </div>
        <Footer />
      </>
    );
}
