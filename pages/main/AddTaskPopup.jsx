import React, { useState } from 'react';
import styles from './Popup.module.css';
import axios from "axios";
import PltModuleManager from './PltModuleRoster';
import DeviceListItem from "./deviceListItem";
import PltTaskAppSelector from './PltTaskAppSelector';
import PltModuleSelector from './PltModuleSelector';


const addTaskPopup = ({ onClose, onSearch }) => {
  const [serialNumber, setSerialNumber] = useState('dummy data');
  const [fetchedData, setFetchedData] = useState(null);
  const [password, setPassword] = useState('');
  
  const handleCreate = async () => {
    // Call the onSearch function and pass the serialNumber
    // const data = await onSearch(serialNumber);
      // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
      const fetchedDevices = await axios.post("https://localhost:3333/fetch/v0.1/module/list", {
        filter:{"serialNumber":serialNumber}
      });

    console.log(fetchedDevices?.data?.data)
    setFetchedData(fetchedDevices?.data?.data[0]);
  };

  
  return (
    <div className={styles.popupContainer}>
      <h1>Create New Task</h1>
      <div className={styles.infoContainer}>
        <div>
          <h3>Alias</h3>
          <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className={styles.inputField}
              autoComplete="off"
          />
        </div>
        
        <div>
          <h3>Application</h3>
          <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className={styles.inputField}
              autoComplete="off"
          />
        </div>
        <div>
          <h3>Application2</h3>
          <PltTaskAppSelector/>
        </div>
        <div>
          <h3>Default Robot:</h3>
          <PltModuleSelector filter={{type:"robot"}}/>
        </div>
        <div>
        <h3>Default Camera:</h3>
          <PltModuleSelector filter={{type:"camera"}}/>
        </div>
      </div>

      <button onClick={onClose} className={styles.closeButton}>
        <span aria-hidden="true">×</span>
      </button>
      <h2>Enter Task Number</h2>
      <div className={styles.inputContainer}>
        <button onClick={handleCreate} className={styles.searchButton}>
            Create
        </button>
      </div>
    </div>
  );
};

export default addTaskPopup;
