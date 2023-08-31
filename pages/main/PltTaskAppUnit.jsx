
import React from 'react';
import styles from './main.module.css';


const PltTaskAppUnit = ({taskApp,onClick}) => {
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
    </div>
  );
};
export default PltTaskAppUnit;
