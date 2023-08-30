
import React, { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import TaskListItem from "./taskListItem";
import AddTaskPopup from './AddTaskPopup'; // Import the popup component
import axios from "axios";
import { useSession } from "next-auth/react";


const PltTaskManager = () => {

  const [taskList, setTasks] = useState([
    // { id:"TN000-FAKE-0000", alias: 'TeleoperationTset', config: 'Robot', status: 'Universal Robots', descriptions:"not yet", createdAt:"2023...today"},
  ]);

  const [isAddTaskPopupVisible, setAddTaskPopupVisible] = useState(false);
  const handleAddTaskPopup = () => {
    setAddTaskPopupVisible(true);
  };

  const handleCloseAddTaskPopup = () => {
    setAddTaskPopupVisible(false);
  };

  const handleSearch = (serialNumber) => {
    // Implement search logic here
    console.log('Searching for serial number:', serialNumber);
    // Close the popup after performing the search
    // handleCloseAddModulePopup();
  };


  const { data: session } = useSession();
  // if(session?.token?.user?.affiliation === "admin"){
  // }else{
  // }


  useEffect(() => {
    // Simulate fetching data or changing the list dynamically
    // For example, fetchDevices and fetchTasks could be API calls
    const fetchTasks = async () => {
      // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
      const fetchedTasks = await axios.post("https://localhost:3333/fetch/v0.1/task/list", {
        filter:{}
      // },{headers: {Authorization: `Bearer ${session?.token?.token}`}});
    },{headers: {Authorization: "admin"}});
    console.log(fetchedTasks?.data?.data);

      // Fetch tasks from an API and update the tasks state
      setTasks(fetchedTasks?.data?.data?.reverse());
    };
    fetchTasks();
  }, [session]); // Empty dependency array to run the effect only once

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Manage Tasks</h2>
        <button className={styles.addButton} onClick={handleAddTaskPopup}>+</button>
      </div>
      <div className={styles.list}>
        {taskList.map((task, index) => (
          <TaskListItem key={index} task={task} />
        ))}
      </div>
      {isAddTaskPopupVisible && (
        <div className={styles.overlay}>
          <AddTaskPopup onClose={handleCloseAddTaskPopup} onSearch={handleSearch} />
        </div>
      )}
    </div>
  );
};

export default PltTaskManager;
