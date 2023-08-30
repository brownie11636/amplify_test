
import {useRouter } from "next/router";
import React from 'react';
import styles from './main.module.css';


const PltTaskAppWrapper = ({taskApp,onClick}) => {
  const router = useRouter();
  const onSelectTaskApp = () => {
    console.log(taskApp);
    if(onClick){
      onClick(taskApp);
    }
  }
  return (
    <div className={styles.item} onClick={() => onSelectTaskApp()}>
      <div className={styles.deviceName}>{taskApp?.name}</div>
      <div className={styles.serialNumber}>{taskApp?.description}</div>
      {/* <button className={styles.addButton}>+</button> */}
    </div>
  );
};
export default PltTaskAppWrapper;
