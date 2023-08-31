import React, { useState } from 'react';
import styles from './Popup.module.css';
import axios from "axios";
import PltModuleManager from './PltModuleRoster';
import DeviceListItem from "./deviceListItem";
import PltTaskAppSelector from './PltTaskAppSelector';
import PltModuleSelector from './PltModuleSelector';


const addTaskPopup = ({ onClose, onSearch }) => {
  // const [taskAlias, setTaskAlias] = useState('alias');
  const [fetchedData, setFetchedData] = useState(null);
  const [password, setPassword] = useState('');
  // const [taskProfile, setTaskProfile] = useState({id:null,alias:null,app:{name:null,config:{camera:null,robot:null}}});
  const [taskProfile, setTaskProfile] = useState({id:null,alias:null,app:{name:null}});


  // Create random alias


  // taskProfile.alias = "";
  //create random serial id with alphabet and numbers
  taskProfile.id = "TN000-"+Math.random().toString(36).substring(2, 6)+"-"+Math.random().toString(36).substring(2, 6)+"-"+Math.random().toString(36).substring(2, 6)+"-"+Math.random().toString(36).substring(2, 6);
  // + Math.random().toString(36).substring(2, 15);
  console.log("taskProfile.id:", taskProfile.id)



  const handleCreate = async () => {
    console.log("handleCreate:", taskProfile);
    // Call the onSearch function and pass the serialNumber
    // const data = await onSearch(serialNumber);
      // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
    const response = await axios.post("https://localhost:3333/fetch/v0.1/task/create", {profile:taskProfile}, {headers: {Authorization: "admin"}});
    console.log(response)
  };

  const onSelectTaskApp = (selectedItem) => {
    taskProfile.app = selectedItem;
    setTaskProfile(taskProfile);
    console.log(taskProfile);
  }

  const onSelectCameraModule = (selectedItem) => {
    taskProfile.app.config.camera = selectedItem;
    setTaskProfile(taskProfile);
    console.log(taskProfile);
  }
  const onSelectRobotModule = (selectedItem) => {
    taskProfile.app.config.robot = selectedItem;
    setTaskProfile(taskProfile);
    console.log(taskProfile);
  }
  return (
    <div className={styles.popupContainer}>
      <h1>Create New Task</h1>
      <div className={styles.infoContainer}>
        <div>
          <h3>Alias</h3>
          <input
              type="text"
              value={taskProfile.alias}
              onChange={(e) => {
                taskProfile.alias = e.target.value;
                setTaskProfile(taskProfile);
              }}
              className={styles.inputField}
              autoComplete="off"
          />
        </div>
        
        <div>
          <h3>Application</h3>
          <input
              type="text"
              value={"filter(not supported)"}
              onChange={(e) => {}}
              className={styles.inputField}
              autoComplete="off"
          />
          <PltTaskAppSelector  onSelect={onSelectTaskApp}/>
        </div>
        <div>
          <h3>Default Robot:</h3>
          <PltModuleSelector filter={{type:"robot"}} onSelect={onSelectCameraModule}/>
        </div>
        <div>
        <h3>Default Camera:</h3>
          <PltModuleSelector filter={{type:"camera"}} onSelect={onSelectRobotModule}/>
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
