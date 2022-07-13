import React, { Component } from "react";
import NavbarTwo from "../../components/Layouts/NavbarTwo";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";

import { useRouter } from "next/router";
import SocketChat from "../../components/Services/SocketChat";

export default function Detail({params}) {
    const router = useRouter();
    //const [title, id] = params || []; //catch-all url params
    console.log('rt?', router);
    console.log('rt2?', router.query.roomid);
    const roomID = router.query.roomid;
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
  
        <SocketChat roomID={roomID}/>
  
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
