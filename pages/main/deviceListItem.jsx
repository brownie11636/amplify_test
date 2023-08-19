
import {useRouter } from "next/router";
import React from 'react';
import styles from './main.module.css';


const ListItem = ({ device }) => {
  const router = useRouter();
  const setSelectedDevice = (device) => {
    console.log(device);
    if(device.type === 'robot'){
      router.push(`/webrtc/teleoperation`);
    } else {
      // router.push(`/main/${device.serialNumber}/camera`);
    }
  }
  

  return (

    <div className={styles.item} onClick={() => setSelectedDevice(device)}>
      <div className={styles.deviceName}>{device.alias}</div>
      <div className={styles.serialNumber}>{device.serialNumber}</div>
      {/* <button className={styles.addButton}>+</button> */}
    </div>
  );
};
export default ListItem;