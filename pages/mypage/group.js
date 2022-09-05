import React, { Component, useEffect, useState } from "react";
import NavbarTwo from "../../components/Layouts/NavbarTwo";
import Footer from "../../components/Layouts/Footer";
import MypageAddDeviceContainer from "../../components/Mypage/MypageAddDeviceContainer";
import MypageNavbar from "../../components/Mypage/MypageNavbar";
import MypageCreateGroup from "../../components/Mypage/MypageCreateGroup";
import MypageGroupList from "../../components/Mypage/MypageGroupList";
import MypageDeviceList from "../../components/Mypage/MypageDeviceList";
import MypageGroupEntering from "../../components/Mypage/MypageGroupEntering";
import MypageAddDvToGroup from "../../components/Mypage/MypageAddDvToGroup";

const { v4: uuidv4 } = require("uuid");

export default function GroupManage({}) {

    const [dvList, setDvList] = useState([]);
    const [gpList, setGpList] = useState([]);

    const inviteCode = async (groupId) => {
    
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const expiration = date.toISOString();
        const identifier = uuidv4();
    
        let response = await fetch("https://localhost:3333/mypage/createGroupInviteLink", {
          method: "POST",
          body: JSON.stringify({
            groupId, expiration, identifier
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log('data?', data);
        let status = response.status;
        if (status === 200) {
          alert("초대링크 생성 완료: " + identifier);
        }
        else {
          alert('somethings wrong!');
        }
    };


    return (
        <>
        <NavbarTwo />
        <div style={{display: "flex", flexDirection: "row", height: "100%", minHeight: 720}}>
          <MypageNavbar />
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%"}}>
            <MypageAddDeviceContainer />
            <MypageDeviceList setDvList={setDvList} />
            <MypageGroupList setGpList={setGpList} inviteCode={inviteCode} />
            <MypageAddDvToGroup dvList={dvList} gpList={gpList}/>
            <MypageCreateGroup />
            <MypageGroupEntering />
          </div>
        </div>
        <Footer />
      </>
    );
}
