import React, { useState, useEffect } from "react";
import MainLayout from "../../components/Main/MainLayout";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import DeviceListItem from "./deviceListItem";
import TaskListItem from "./taskListItem";
import AddModulePopup from "./AddDevicePopup"; // Import the popup component
import AddTaskPopup from "./AddTaskPopup"; // Import the popup component
import axios from "axios";
import { useSession } from "next-auth/react";

import PltModuleRoster from "./PltModuleRoster";
import PltTaskRoster from "./PltTaskRoster";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  // Sample data for devices and tasks (replace with your actual data)
  const [moduleList, setModuleList] = useState([
    // { alias: 'Device 1', serialNumber: '12345' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 2', serialNumber: '67890' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 3', serialNumber: '12345' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 4', serialNumber: '67890' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 5', serialNumber: '12345' , type: 'Robot', manufacturer: 'Universal Robots'},
    // { alias: 'Device 6', serialNumber: '67890' , type: 'Robot', manufacturer: 'Universal Robots'},
  ]);

  const [taskList, setTasks] = useState([
    {
      id: "TN000-FAKE-0000",
      alias: "TeleoperationTset",
      config: "Robot",
      status: "Universal Robots",
      descriptions: "not yet",
      createdAt: "2023...today",
    },
  ]);

  const [isAddModulePopupVisible, setAddModulePopupVisible] = useState(false);
  const [isAddTaskPopupVisible, setAddTaskPopupVisible] = useState(false);
  const handleAddModulePopup = () => {
    setAddModulePopupVisible(true);
  };

  const handleCloseAddModulePopup = () => {
    setAddModulePopupVisible(false);
  };

  const handleAddTaskPopup = () => {
    setAddTaskPopupVisible(true);
  };

  const handleCloseAddTaskPopup = () => {
    setAddTaskPopupVisible(false);
  };

  const handleSearch = (serialNumber) => {
    // Implement search logic here
    console.log("Searching for serial number:", serialNumber);
    // Close the popup after performing the search
    // handleCloseAddModulePopup();
  };

  // const router = useRouter();
  // useEffect(() => {
  //   router.push(`/main`);
  // }, []);

  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.token?.user?.affiliation) {
      return;
    } else {
      console.log("Is admin");
      if (session?.token?.user?.affiliation === "admin") {
        console.log("admin mode");
      } else {
        console.log("node-admin mode:", session?.token?.user?.affiliation);
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
  // console.log(
  //   session?.token?.user?.affiliation === "admin" ? "logged in admin mode" : session?.token?.user?.affiliation
  // );
  // const [robotItemList, SetRobotItemList] = useRecoilState(RobotItemListAtom);

  // Simulate fetching data or changing the list dynamically
  // For example, fetchDevices and fetchTasks could be API calls
  const fetchDevices = async () => {
    await axios
      .post(baseURL + "/api/mongo/robotList", {
        companyNumber:
          session?.token?.user?.affiliation === "admin"
            ? "admin"
            : session?.token?.user?.affiliation,
      })
      .then((res) => {
        console.log(res?.data?.data);
        // setModuleList(res?.data?.data?);
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.msg);
        // return router.push(`/main/login`);
      });
  };
  const fetchModuleList = async () => {
    // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
    await axios
      .post(baseURL + "/api/fetch/v0.1/module/module-list", {
        filter: {},
      })
      .then((res) => {
        console.log(res?.data?.data);
        setModuleList(res?.data?.data?.reverse());
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.msg);
        return router.push(`/main/login`);
      });
  };
  const fetchTasks = async () => {
    // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
    await axios
      .post(baseURL + "/api/fetch/v0.1/task/list", {
        filter: {},
      })
      .then((res) => {
        console.log(res?.data?.data);
        setTasks(res?.data?.data?.reverse());
      })
      .catch((err) => {
        console.log(err);
        alert(err?.response?.data?.msg);
        return router.push(`/main/login`);
      });

    // Fetch tasks from an API and update the tasks state
    // const fetchedTasks = await fetchTasksFromAPI();
    // const fetchedTasks = ['Task 1', 'Task 2', 'Task 3'];
  };
  useEffect(() => {
    if (baseURL) {
      fetchDevices();
      fetchModuleList();
      fetchTasks();
    }
  }, [session, baseURL]); // Empty dependency array to run the effect only once

  return (
    <MainLayout>
      <div className={styles.container}>
        {/* <PltModuleRoster />
        <PltTaskRoster /> */}
      </div>
    </MainLayout>
  );
};

export default Main;
