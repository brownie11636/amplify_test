import React, { useState, useEffect } from "react";
import MainLayout from "../../components/Main/MainLayout";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import DeviceListItem from "./deviceListItem";
import TaskListItem from "./taskListItem";
import AddModulePopup from "./AddDevicePopup"; // Import the popup component
import AddTaskPopup from "./AddTaskPopup"; // Import the popup component
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

import PltModuleRoster from "./PltModuleRoster";
import PltTaskRoster from "./PltTaskRoster";

const Main = ({ sessions }) => {
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
    // console.log("Searching for serial number:", serialNumber);
    // Close the popup after performing the search
    // handleCloseAddModulePopup();
  };

  // const router = useRouter();
  // useEffect(() => {
  //   router.push(`/main`);
  // }, []);

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
    console.log(process.env.NEXT_PUBLIC_API_URL);
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  // console.log(
  //   sessions?.token?.user?.affiliation === "admin" ? "logged in admin mode" : sessions?.token?.user?.affiliation
  // );
  // const [robotItemList, SetRobotItemList] = useRecoilState(RobotItemListAtom);

  useEffect(() => {
    if (baseURL && sessions) {
      // Simulate fetching data or changing the list dynamically
      // For example, fetchDevices and fetchTasks could be API calls
      const fetchDevices = async () => {
        await axios
          .post(
            baseURL + "/api/mongo/robotList",
            {
              companyNumber:
                sessions?.token?.user?.affiliation === "admin"
                  ? "admin"
                  : sessions?.token?.user?.affiliation,
            },
            { headers: { Authorization: `${sessions?.token?.accessToken}` } }
          )
          .then((res) => {
            // console.log(res?.data?.data);
            // setModuleList(res?.data?.data?);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const fetchModuleList = async () => {
        // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
        await axios
          .post(
            baseURL + "/fetch/v0.1/module/list",
            {
              filter: {},
            },
            { headers: { Authorization: `${sessions?.token?.accessToken}` } }
          )
          .then((res) => {
            // console.log(res?.data?.data);
            setModuleList(res?.data?.data?.reverse());
          })
          .catch((err) => {
            // console.log(err);
          });
      };
      const fetchTasks = async () => {
        // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
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
        // const fetchedTasks = await fetchTasksFromAPI();
        // const fetchedTasks = ['Task 1', 'Task 2', 'Task 3'];
      };
      fetchDevices();
      fetchModuleList();
      fetchTasks();
    }
  }, [sessions, baseURL]); // Empty dependency array to run the effect only once

  return (
    <MainLayout>
      <div className={styles.container}>
        <PltModuleRoster sessions={sessions} test={1} />
        <PltTaskRoster sessions={sessions} />
      </div>
    </MainLayout>
  );
};

export default Main;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // console.log(session);
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
