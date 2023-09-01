import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import PltTaskUnit from "./PltTaskUnit";
import AddTaskPopup from './AddTaskPopup'; // Import the popup component
import axios from "axios";
import { useSession } from "next-auth/react";
import {useRouter } from "next/router";

const PltTaskManager = ({ sessions }) => {
  const router = useRouter();
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
    // console.log("Searching for serial number:", serialNumber);
    // Close the popup after performing the search
    // handleCloseAddModulePopup();
  };


  const onSelect = (selectedItem) => {
    console.log("onSelect in the module");
    console.log(selectedItem);
    if(selectedItem.app){
      const app = JSON.parse(selectedItem.app)
      console.log(app);
      if(app.name === "remoteXR"){
        router.push(`/task/remoteXr/`);
        // router.push(`/main/PltTask/${selectedItem?.id}`);
      }else if(app.name === "cambot"){
        router.push(`/task/cambot/`);
      }else if(app.name === "webRtc2d"){
        //convert selectedItem to Json
        sessionStorage.setItem("taskAppConfig", JSON.stringify(selectedItem));
        // useTaskAppStore.setState({socketID: selectedItem});
        router.push(`/task/webRtc2d/`);
      }else if(app.name === "webRtcStreo"){
        router.push(`/task/webRtc2d/`);
      }else if(app.name === "webRtc3d"){
        router.push(`/task/webRtc2d/`);
      }else{
        console.log("app not supported");
      }
    }else{
      console.log(" No app");
    }
    // router.push(`/main/PltTask/${selectedItem?.id}`);
  }


  useEffect(() => {
    if (!sessions?.token?.user?.affiliation) {
      return;
    } else {
      // console.log("Is admin");
      if (sessions?.token?.user?.affiliation === "admin") {
        // console.log("admin mode");
      } else {
        // console.log("node-admin mode:", sessions?.token?.user?.affiliation);
      }
    }
  }, [sessions]);

  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    if (baseURL && sessions) {
      // Simulate fetching data or changing the list dynamically
      // For example, fetchDevices and fetchTasks could be API calls
      const fetchTasks = async () => {
        // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
        // const fetchedTasks = await axios.post(baseURL+"/fetch/v0.1/task/list", {
        await axios
          .post(
            baseURL + "/fetch/v0.1/task/list",
            {
              filter: {},
            },
            { headers: { Authorization: `${sessions?.token?.accessToken}` } }
          )
          .then((res) => {
            // console.log(res?.data?.data);
            setTasks(res?.data?.data?.reverse());
          })
          .catch((err) => {
            console.log(err);
          });

        // Fetch tasks from an API and update the tasks state
      };

      fetchTasks();
    }
  }, [baseURL, sessions]); // Empty dependency array to run the effect only once

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Manage Tasks</h2>
        <button className={styles.addButton} onClick={handleAddTaskPopup}>
          +
        </button>
      </div>
      <div className={styles.list}>
        {taskList.map((task, index) => (
          <PltTaskUnit key={index} task={task} onSelect={onSelect}/>
        ))}
      </div>
      {isAddTaskPopupVisible && (
        <div className={styles.overlay}>
          <AddTaskPopup onClose={handleCloseAddTaskPopup} onSearch={handleSearch} sessions={sessions} />
        </div>
      )}
    </div>
  );
};

export default PltTaskManager;
