import React, { useState } from 'react';
import styles from './Popup.module.css';
import axios from "axios";
import PltTaskAppRoster from './PltTaskAppRoster';
import PltTaskAppUnit from './PltTaskAppUnit';

const PltTaskAppSelector = (props) => {
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const [selectedPltTaskApp, setSelectedPltTaskApp] = useState();
    
  const onAddTaskAppClicked = () => {
    setIsSelectorVisible(true);
  }

  const onSelectTaskApp = (selectedItem) => {
    setIsSelectorVisible(false);
    setSelectedPltTaskApp(selectedItem);
    console.log(selectedPltTaskApp)
    props.onSelect?props.onSelect(selectedItem):()=>{};
  }
  return (
        <div>
          {!selectedPltTaskApp &&
            <div className={styles.plusIcon} onClick={onAddTaskAppClicked}>
              <div className={styles.horizontalLine}></div>
              <div className={styles.verticalLine}></div>
            </div>
          }
          {selectedPltTaskApp &&
            <PltTaskAppUnit taskApp={selectedPltTaskApp} />
          }
          {isSelectorVisible &&
            (<PltTaskAppRoster filter={props.filter} onSelect={onSelectTaskApp}/>)
          }
        </div>
  );
};

export default PltTaskAppSelector;
