
import React, { useState, useEffect } from 'react'
import MainLayout from "../../components/Main/MainLayout";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import DeviceListItem from "./deviceListItem";
import TaskListItem from "./taskListItem";
import AddDevicePopup from './AddDevicePopup'; // Import the popup component
import axios from "axios";
import { useSession } from "next-auth/react";


const Main = () => {
  // Sample data for devices and tasks (replace with your actual data)
  const [moduleList, setModuleList] = useState([
    // { alias: 'Device 1', serialNumber: '12345' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 2', serialNumber: '67890' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 3', serialNumber: '12345' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 4', serialNumber: '67890' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 5', serialNumber: '12345' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 6', serialNumber: '67890' , type: 'Robot', manufacturer: 'Universal Robots'},
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


  console.log("Is admin");
  const { data: session } = useSession();
  if(session?.token?.user?.affiliation === "admin"){
    console.log("admin mode");
  }else{
    console.log("node-admin mode:",session?.token?.user?.affiliation)
  }

  // console.log(
  //   session?.token?.user?.affiliation === "admin" ? "logged in admin mode" : session?.token?.user?.affiliation
  // );
  // const [robotItemList, SetRobotItemList] = useRecoilState(RobotItemListAtom);


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
      const fetchedDevices = await axios.post("https://localhost:3333/portalfetch/module-list", {
        filter:{}
      });
      console.log(fetchedDevices?.data?.data);


      // const fetchedDevices = await fetchDevicesFromAPI();
      // const fetchedDevices = ['Device 1', 'Device 2', 'Device 3'];
      setModuleList(fetchedDevices?.data?.data?.reverse());
      //inverse the sequence of Modulelist


    };

    const fetchTasks = async () => {
      // Fetch tasks from an API and update the tasks state
      // const fetchedTasks = await fetchTasksFromAPI();
      const fetchedTasks = ['Task 1', 'Task 2', 'Task 3'];
      setTasks(fetchedTasks);
    };

    fetchDevices();
    fetchTasks();
  }, [session]); // Empty dependency array to run the effect only once




  return (
    <MainLayout>

        <div className={styles.container}>
          <div className={styles.section}>
            <div className={styles.header}>
              <h2>Manage Devices</h2>
              <button className={styles.addButton} onClick={handleOpenPopup}>+</button>
            </div>
            <div className={styles.list}>
              {moduleList.map((device, index) => (
                  // <div onClick={() => setSelectedDevice(device)}>
                    <DeviceListItem key={index} device={device}/>
                //  </div>
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
