import React, { useState } from 'react';
import styles from './Popup.module.css';
import PltModuleRoster from './PltModuleRoster';
import DeviceListItem from "./deviceListItem";

const PltModuleSelector = (props) => {
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const [selectedPltTaskApp, setSelectedPltTaskApp] = useState();
    
  const onAddDefaultRobotClick = () => {
    setIsSelectorVisible(true);
    console.log("task app clicked");
  }

  const onSelectRobot = (selectedItem) => {
    console.log(selectedItem);
    setIsSelectorVisible(false);
    setSelectedPltTaskApp(selectedItem);
    props.onSelect?props.onSelect(selectedItem):()=>{};
  }
  return (
        <div>
          {!selectedPltTaskApp &&
            <div className={styles.plusIcon} onClick={onAddDefaultRobotClick}>
              <div className={styles.horizontalLine}></div>
              <div className={styles.verticalLine}></div>
            </div>
          }
          {selectedPltTaskApp &&
            <DeviceListItem device={selectedPltTaskApp}/>
          }
          {isSelectorVisible &&
            (<PltModuleRoster filter={props.filter} onSelect={onSelectRobot}/>)
          }
        </div>
  );
};

export default PltModuleSelector;
