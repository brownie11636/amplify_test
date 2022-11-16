import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei'
import Header from "../components/Layouts/Header";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";


const Scene = dynamic(() => import('../components/canvas/Scene'), { ssr: true })

export default function Teleoperation(Component, props){


  return (
    <>
      <Header />

      <PageBanner
        pageTitle= "teleoperation"
        homePageUrl="/"
        homePageText="Home"
        activePageText="Service Details"
        bgImgClass="item-bg2"
      />
      <Scene />    
      <Footer />
    </>
  );
};

// export async function getStaticProps() {
//   return { props: { title: 'teleoperation' } }
// }
