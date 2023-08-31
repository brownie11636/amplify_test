import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import TaskListItem from "./taskListItem";
import AddTaskPopup from "./AddTaskPopup"; // Import the popup component
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

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

  const { data: session } = useSession();
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
  }, [session]);

  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    if (baseURL) {
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
            // console.log(err);
          });

        // Fetch tasks from an API and update the tasks state
      };

      fetchTasks();
    }
  }, [baseURL]); // Empty dependency array to run the effect only once

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Manage Tasks</h2>
        <button className={styles.addButton} onClick={handleAddTaskPopup}>
          +
        </button>
      </div>
      <div className={styles.list}>
        {taskList?.map((task, index) => (
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

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/main/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: { sessions: session },
    };
  }
};
