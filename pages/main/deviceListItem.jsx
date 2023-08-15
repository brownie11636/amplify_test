import React from 'react';
import styles from './main.module.css';

const ListItem = ({ device }) => {
  return (
    <div className={styles.item}>
      <div className={styles.deviceName}>{device.name}</div>
      <div className={styles.serialNumber}>{device.serialNumber}</div>
      {/* <button className={styles.addButton}>+</button> */}
    </div>
  );
};
export default ListItem;