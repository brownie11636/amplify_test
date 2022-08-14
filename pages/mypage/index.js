import React, { Component } from "react";
import NavbarTwo from "../../components/Layouts/NavbarTwo";
import Footer from "../../components/Layouts/Footer";
import MypageRoot from "../../components/Mypage/MypageRoot";
import MypageNavbar from "../../components/Mypage/MypageNavbar";

export default function Mypage({}) {

    return (
        <>
        <NavbarTwo />
        <div style={{display: "flex", flexDirection: "row", height: 720}}>
          <MypageNavbar />
          <MypageRoot />
        </div>
        <Footer />
      </>
    );
}
