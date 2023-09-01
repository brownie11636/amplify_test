import React, { useState, useEffect } from "react";
import MainLayout from "../../components/Main/MainLayout";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

import PltModuleRoster from './PltModuleRoster';
import PltTaskRoster from './PltTaskRoster';
import {fetchApiEndpoint} from '../../toServer/API-AccessPoint';

const Main = ({sessions}) => {
  const { data: session } = useSession();
  console.log("token:",session?.token)
  if(session?.token?.user?.affiliation === "admin"){
    console.log("admin mode");
  }else{
    console.log("none-admin mode:",session?.token?.user)
  }

  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  // console.log(
  //   sessions?.token?.user?.affiliation === "admin" ? "logged in admin mode" : sessions?.token?.user?.affiliation
  // );
  // const [robotItemList, SetRobotItemList] = useRecoilState(RobotItemListAtom);

  useEffect(() => {
    if (baseURL && sessions) {

    }
  }, [sessions, baseURL]); // Empty dependency array to run the effect only once

  return (
    <MainLayout>
      <div className={styles.container}>
        <PltModuleRoster sessions={sessions} />
        <PltTaskRoster sessions={sessions} />
      </div>
        <div>
          {/* Your component content */}
          {/* <button onClick={fetchData}>Fetch Data</button> */}
        </div>
    </MainLayout>
  );
};

export default Main;

export const getInitialProps = async (context) => {
  const session = await getSession(context);
  // console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/main/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { sessions: session },
    };
  }
};
