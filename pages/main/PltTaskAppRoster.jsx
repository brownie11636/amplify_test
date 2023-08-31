
import React, { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import PltTaskAppUnit from "./PltTaskAppUnit";
import axios from "axios";
import { useSession } from "next-auth/react";


const PltTaskManager = (props) => {

  const [taskApps, setTaskApps] = useState([
    { name:"Teleoperation", description: 'robot operation', version: 'v0.1', config:{camera:null,robot:null}},
    { name:"PTS-cambot", description: 'camera and robot', version: 'v0.1', config:{camera:null,robot:null}},
    { name:"WebRTC 2D", description: 'ordinary streaming', version: 'v0.1', config:{camera:null,robot:null}},
    { name:"WebRTC Streovision", description: '2ch streaming', version: 'v0.1', config:{camera:null,robot:null}},
    { name:"WebRTC 3D", description: 'depthview', version: 'v0.1', config:{camera:null,robot:null}},
  ]);

  // const { data: session } = useSession();
 
  const onSelect = (selectedItem) => {
    props.onSelect(selectedItem);
    console.log("onSelect in the module");
  }


  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
 
  //   };
  //   fetchTasks();
  // }, [session]); // Empty dependency array to run the effect only once

  return (
    <div className={styles.section}>
      <div className={styles.list}>
        {taskApps.map((taskApp, index) => (
          <PltTaskAppUnit key={index} taskApp={taskApp} onClick={onSelect}/>
        ))}
      </div>
    </div>
  );
};

export default PltTaskManager;
