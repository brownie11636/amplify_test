import {useRouter } from "next/router";
import React, { useState, useEffect } from 'react'
import MainLayout from "../../components/Main/MainLayout";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import DeviceListItem from "./deviceListItem";
import TaskListItem from "./taskListItem";
import AddDevicePopup from './AddDevicePopup'; // Import the popup component


const Main = () => {
  // Sample data for devices and tasks (replace with your actual data)
  const [devices, setDevices] = useState([
    { name: 'Device 1', serialNumber: '12345' , type: 'Robot', manufacturer: 'Universal Robots'},
    { name: 'Device 2', serialNumber: '67890' , type: 'Robot', manufacturer: 'Universal Robots'},
    { name: 'Device 3', serialNumber: '12345' , type: 'Robot', manufacturer: 'Universal Robots'},
    { name: 'Device 4', serialNumber: '67890' , type: 'Robot', manufacturer: 'Universal Robots'},
    { name: 'Device 5', serialNumber: '12345' , type: 'Robot', manufacturer: 'Universal Robots'},
    { name: 'Device 6', serialNumber: '67890' , type: 'Robot', manufacturer: 'Universal Robots'},
  ]);
  const [tasks, setTasks] = useState(['Task 1', 'Task 2', 'Task 3']);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleSearch = (serialNumber) => {
    // Implement search logic here
    console.log('Searching for serial number:', serialNumber);
    // Close the popup after performing the search
    handleClosePopup();
  };


  // const router = useRouter();
  // useEffect(() => {
  //   router.push(`/main`);
  // }, []);

  useEffect(() => {
    // Simulate fetching data or changing the list dynamically
    // For example, fetchDevices and fetchTasks could be API calls
    const fetchDevices = async () => {
      // Fetch devices from an API and update the devices state
      // const fetchedDevices = await fetchDevicesFromAPI();
      const fetchedDevices = ['Device 1', 'Device 2', 'Device 3'];
      // setDevices(fetchedDevices);
    };

    const fetchTasks = async () => {
      // Fetch tasks from an API and update the tasks state
      // const fetchedTasks = await fetchTasksFromAPI();
      const fetchedTasks = ['Task 1', 'Task 2', 'Task 3'];
      setTasks(fetchedTasks);
    };

    fetchDevices();
    fetchTasks();
  }, []); // Empty dependency array to run the effect only once

  const setSelectedDevice = (device) => {
    console.log(device);
    if(device.type === 'Robot'){
      // router.push(`/main/${device.serialNumber}`);
    } else {
      // router.push(`/main/${device.serialNumber}/camera`);
    }

  }


  return (
    <MainLayout>

        <div className={styles.container}>
        {/* <div className={styles.section}>
          <div className={styles.header}>
            <h2>Manage Devices</h2>
            <button className={styles.addButton}>+</button>
          </div>
          <div className={styles.list}>
            {devices.map((device, index) => (
              <ListItem key={index} text={device} />
            ))}
          </div>
        </div> */}

          <div className={styles.section}>
            <div className={styles.header}>
              <h2>Manage Devices</h2>
              <button className={styles.addButton} onClick={handleOpenPopup}>+</button>
            </div>
            <div className={styles.list}>
              {devices.map((device, index) => (
                <div onClick={() => setSelectedDevice(device)}>
                  <DeviceListItem key={index} device={device}/>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.section}>
            <div className={styles.header}>
              <h2>Manage Tasks</h2>
              <button className={styles.addButton}>+</button>
            </div>
            <div className={styles.list}>
              {tasks.map((task, index) => (
                <TaskListItem key={index} text={task} />
              ))}
            </div>
          </div>
          {isPopupVisible && (
            <div className={styles.overlay}>
              <AddDevicePopup onClose={handleClosePopup} onSearch={handleSearch} />
            </div>
          )}
        </div>

    </MainLayout>
  );
};

export default Main;
