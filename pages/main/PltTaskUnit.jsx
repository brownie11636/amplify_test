
import {useRouter } from "next/router";
import React from 'react';
import styles from './main.module.css';


const PltTaskUnit = (props) => {
  const router = useRouter();
  const onSelect = () => {
    console.log(props.task);
    props.onSelect?props.onSelect(props.task):()=>{};
  }
  

  return (

    <div className={styles.item} onClick={() => onSelect()}>
      <div className={styles.deviceName}>{props.task?.alias}</div>
      <div className={styles.serialNumber}>{props.task?.id}</div>
      {/* <button className={styles.addButton}>+</button> */}
    </div>
  );
};
export default PltTaskUnit;
