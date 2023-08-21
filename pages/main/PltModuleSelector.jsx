import React, { useState } from 'react';
import styles from './Popup.module.css';
import axios from "axios";
import PltModuleRoster from './PltModuleRoster';
import DeviceListItem from "./deviceListItem";

const PltModuleSelector = (props) => {
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const [selectedPltModule, setSelectedPltModule] = useState();
    
  const onAddDefaultRobotClick = () => {
    setIsSelectorVisible(true);
    console.log("robot clicked");
  }

  const onSelectRobot = (selectedItem) => {
    console.log("on select robot event");
    console.log(selectedItem);
    setIsSelectorVisible(false);
    setSelectedPltModule(selectedItem);
    props.onSelect?props.onSelect(selectedItem):()=>{};
  }
  return (
        <div>
          {!selectedPltModule &&
            <div className={styles.plusIcon} onClick={onAddDefaultRobotClick}>
              <div className={styles.horizontalLine}></div>
              <div className={styles.verticalLine}></div>
            </div>
          }
          {selectedPltModule &&
            <DeviceListItem device={selectedPltModule}/>
          }
          {isSelectorVisible &&
            (<PltModuleRoster filter={props.filter} onSelect={onSelectRobot}/>)
          }
        </div>
  );
};

export default PltModuleSelector;
