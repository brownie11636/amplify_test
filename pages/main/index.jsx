
import React, { useState, useEffect } from 'react'
import MainLayout from "../../components/Main/MainLayout";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import axios from "axios";
import { useSession } from "next-auth/react";

import PltModuleRoster from './PltModuleRoster';
import PltTaskRoster from './PltTaskRoster';
import {fetchApiEndpoint} from '../../toServer/API-AccessPoint';

const Main = () => {
  const { data: session } = useSession();
  console.log("token:",session?.token)
  if(session?.token?.user?.affiliation === "admin"){
    console.log("admin mode");
  }else{
    console.log("none-admin mode:",session?.token?.user)
  }

  const fetchData = async () => {

    try {
      
      // const response = await axios.post("https://localhost:3333/fetch/v0.1/module/auth",[],{
      const response = await axios.post(fetchApiEndpoint+"/fetch/v0.1/module/auth",[],{
          headers: {
          authorization: `Bearer ${JSON.stringify(session?.token)}`,
        }
      });

      // Handle the response
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
    }
  };





  useEffect(() => {
  }, [session]); // Empty dependency array to run the effect only once

  return (
    <MainLayout>
        <div>
          {/* Your component content */}
          <button onClick={fetchData}>Fetch Data</button>
        </div>
        <div className={styles.container}>
          <PltModuleRoster/>
          <PltTaskRoster/>
        </div>
    </MainLayout>
  );
};

export default Main;
