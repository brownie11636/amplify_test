import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import PltModuleUnit from "./PltModuleUnit";
import AddModulePopup from "./AddDevicePopup"; // Import the popup component
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PltModuleManager = (props) => {
  const router = useRouter();
  const { data: session } = useSession()

  // Sample data for devices and tasks (replace with your actual data)
  const [moduleList, setModuleList] = useState([]);

  const [isAddModulePopupVisible, setAddModulePopupVisible] = useState(false);
  const handleAddModulePopup = () => {
    setAddModulePopupVisible(true);
  };

  const handleCloseAddModulePopup = () => {
    setAddModulePopupVisible(false);
  };

  const onSelect = (selectedItem) => {
    props.onSelect?props.onSelect(selectedItem):()=>{console.log("onSelect in the module:", selectedItem)};
  };

  const [baseURL, setBaseURL] = useState(
    // typeof window !== "undefined" && window?.location.href.includes("www")
    //   ? process.env.NEXT_PUBLIC_API_URL_WWW
    //   : process.env.NEXT_PUBLIC_API_URL
  );

  useEffect(() => {
    if (!session.token?.user?.affiliation) {
      return;
    } else {
      // console.log("Is admin");
      if (session.token?.user?.affiliation === "admin") {
        // console.log("admin mode");
      } else {
        // console.log("node-admin mode:", props?.sessions?.token?.user?.affiliation);
      }
    }
  }, [session]);

  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    console.log("baseURL:", baseURL);
    console.log(props);
    if (baseURL && session) {
      // Simulate fetching data or changing the list dynamically
      // For example, fetchDevices and fetchTasks could be API calls
      const fetchPltModules = async () => {
        console.log("hihi")
        // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
        await axios
          .post(
            baseURL + "/fetch/v0.1/module/list",
            {
              filter: props.filter,
            },
            { headers: { Authorization: `${session.token?.accessToken}` } }
          )
          .then((res) => {
            console.log(res?.data?.data);
            setModuleList(res?.data?.data?.reverse());
          })
          .catch((err) => {
            console.log(err);
          },{headers: {Authorization: "admin"}});
      };

      fetchPltModules();
    }
  }, [session, baseURL]); // Empty dependency array to run the effect only once

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>Manage Devices</h2>
        <button className={styles.addButton} onClick={handleAddModulePopup}>
          +
        </button>
      </div>
      <div className={styles.list}>
        {moduleList?.map((device, index) => (
          <PltModuleUnit key={index} device={device} onClickModule={onSelect} />
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
