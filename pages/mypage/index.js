import React, { Component } from "react";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import MypageAddDeviceContainer from "../../components/Mypage/MypageAddDeviceContainer";
import MypageNavbar from "../../components/Mypage/MypageNavbar";
import MypageDeviceList from "../../components/Mypage/MypageDeviceList";

export default function Mypage({}) {

    return (
        <>
        <Header />
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
