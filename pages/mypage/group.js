import React, { Component } from "react";
import NavbarTwo from "../../components/Layouts/NavbarTwo";
import Footer from "../../components/Layouts/Footer";
import MypageAddDeviceContainer from "../../components/Mypage/MypageAddDeviceContainer";
import MypageDeviceList from "../../components/Mypage/MypageDeviceList";
import MypageDeviceList2 from "../../components/Mypage/MypageDeviceList2";
import MypageNavbar from "../../components/Mypage/MypageNavbar";
import MypageGroupList from "../../components/Mypage/MypageGroupList";
import MypageCreateGroup from "../../components/Mypage/MypageCreateGroup";


export default function GroupManage({}) {

  console.log('1')

    return (
        <>
        <NavbarTwo />
        <div style={{display: "flex", flexDirection: "row", height: "100%", minHeight: 720}}>
          <MypageNavbar />
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%"}}>
            <MypageAddDeviceContainer />
            <MypageDeviceList2 />
            {/* <MypageGroupList /> */}
            {/* <MypageCreateGroup /> */}
          </div>
        </div>
        <Footer />
      </>
    );
}
