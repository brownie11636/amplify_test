import React, { Component } from "react";
import Header from "../../components/Layouts/Header";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";

import { useRouter } from "next/router";
// import SocketChat from "../../components/Services/SocketChat";

export default function Detail({}) {
    const router = useRouter();
    //const [socknum, id] = params || []; //catch-all url params
    //console.log('rt?',router.asPath);
    const a = router.query.roomid
    console.log('rt2?', router.query.query_roomid);
    console.log('rt?', router);
    const roomID = router.query.query_roomid;
    return (
        <>
        <Header />
  
        <PageBanner
          pageTitle="Security & Surveillance"
          homePageUrl="/"
          homePageText="Home"
          activePageText="Service Details"
          bgImgClass="item-bg2"
        />
  
        {/* <SocketChat roomID={roomID}/> */}
  
        <Footer />
      </>
    );
}


// export function getServerSideProps({params:{params}}) {
//     return {
//         props: {
//             params,
//         },
//     };
// }
