
import React, { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import DeviceListItem from "./deviceListItem";
import AddModulePopup from './AddDevicePopup'; // Import the popup component
import axios from "axios";
import { useSession } from "next-auth/react";


const PltModuleManager = (props) => {
  // Sample data for devices and tasks (replace with your actual data)
  const [moduleList, setModuleList] = useState([
  ]);

  const [isAddModulePopupVisible, setAddModulePopupVisible] = useState(false);
  const handleAddModulePopup = () => {
    setAddModulePopupVisible(true);
  };

  const handleCloseAddModulePopup = () => {
    setAddModulePopupVisible(false);
  };


  const { data: session } = useSession();
  if(session?.token?.user?.affiliation === "admin"){
  }else{
  }

  const onSelect = (selectedItem) => {
    props.onSelect(selectedItem);
    console.log("onSelect in the module");
  }

  useEffect(() => {
    // Simulate fetching data or changing the list dynamically
    // For example, fetchDevices and fetchTasks could be API calls
    const fetchDevices = async () => {
      const response = await axios.post("https://localhost:3333/api/mongo/robotList", {
        companyNumber:
          session?.token?.user?.affiliation === "admin" ? "123" : session?.token?.user?.affiliation,
      });
      console.log(response.data?.data);
      // setModuleList(response.data?.data);

      // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
      const fetchedDevices = await axios.post("https://localhost:3333/fetch/v0.1/module/list", {
        filter:props.filter
      });
      console.log(fetchedDevices?.data?.data);
      setModuleList(fetchedDevices?.data?.data?.reverse());
    };

    fetchDevices();
  }, [session]); // Empty dependency array to run the effect only once


  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Manage Devices</h2>
        <button className={styles.addButton} onClick={handleAddModulePopup}>+</button>
      </div>
      <div className={styles.list}>
        {moduleList.map((device, index) => (
          <DeviceListItem key={index} device={device} onClickModule={onSelect}/>
        ))}
      </div>

      {isAddModulePopupVisible && (
        <div className={styles.overlay}>
          <AddModulePopup onClose={handleCloseAddModulePopup} />
        </div>
      )}
      </div>

  );
};

export default PltModuleManager;
