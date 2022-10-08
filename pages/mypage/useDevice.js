import React, { Component, useEffect, useState } from "react";
import Header from "../../components/Layouts/Header";
import Footer from "../../components/Layouts/Footer";
import MypageNavbar from "../../components/Mypage/MypageNavbar";
import MypageGroupList from "../../components/Mypage/MypageGroupList";
import MypageDeviceListByGroup from "../../components/Mypage/MypageDeviceListByGroup";

export default function UseDevice({}) {
    
    const [groupID, setGroupID] = useState("");
    const [gpList, setGpList] = useState([]);

    const handleSelect = (e) => {
        console.log(e.target.value);
        setGroupID(e.target.value);
    };

    return (
        <>
        <Header />
        <div style={{display: "flex", flexDirection: "row", height: "100%", minHeight: 720}}>
          <MypageNavbar />
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%"}}>
            <MypageGroupList setGpList={setGpList}/>
            <select onChange={handleSelect}>
                {gpList.map((item) => (
                    <option value={item.group_id} key={item.group_id}>
                    {item.group_nickname}
                    </option>
                ))}
            </select>
            <MypageDeviceListByGroup groupID={groupID}/>
          </div>
        </div>
        <Footer />
      </>
    );
}
