
import {useRouter } from "next/router";
import React from 'react';
import styles from './main.module.css';


const ListItem = ({ task: taskApp }) => {
  const router = useRouter();
  const onSelectTask = () => {
    console.log(taskApp);
  }
  

  return (

    <div className={styles.item} onClick={() => onSelectTask()}>
      <div className={styles.deviceName}>{taskApp?.name}</div>
      <div className={styles.serialNumber}>{taskApp?.description}</div>
      {/* <button className={styles.addButton}>+</button> */}
    </div>
  );
};
export default ListItem;
