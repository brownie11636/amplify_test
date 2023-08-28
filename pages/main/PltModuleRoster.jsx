import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import DeviceListItem from "./deviceListItem";
import AddModulePopup from "./AddDevicePopup"; // Import the popup component
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PltModuleManager = (props) => {
  const router = useRouter();
  // Sample data for devices and tasks (replace with your actual data)
  const [moduleList, setModuleList] = useState([]);

  const [isAddModulePopupVisible, setAddModulePopupVisible] = useState(false);
  const handleAddModulePopup = () => {
    setAddModulePopupVisible(true);
  };

  const handleCloseAddModulePopup = () => {
    setAddModulePopupVisible(false);
  };

  const { data: session } = useSession();

  const onSelect = (selectedItem) => {
    props.onSelect(selectedItem);
    console.log("onSelect in the module");
  };

  const [baseURL, setBaseURL] = useState();

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

  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  useEffect(() => {
    if (baseURL && session?.token?.accessToken) {
      // Simulate fetching data or changing the list dynamically
      // For example, fetchDevices and fetchTasks could be API calls
      const fetchDevices = async () => {
        await axios
          .post(
            baseURL + "/api/mongo/robotList",
            {
              companyNumber:
                session?.token?.user?.affiliation === "admin"
                  ? "admin"
                  : session?.token?.user?.affiliation,
            },
            { headers: { Authorization: `${session?.token?.accessToken}` } }
          )
          .then((res) => {
            console.log(res?.data?.data);
          })
          .catch((err) => {
            console.log(err);
            if (err?.response?.status === 403) {
              alert(err?.response?.data?.msg);
              router.push("/main/login");
            }
          });

        // setModuleList(response.data?.data);

        // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
        await axios
          .post(
            baseURL + "/fetch/v0.1/module/list",
            {
              filter: props.filter,
            },
            { headers: { Authorization: `${session?.token?.accessToken}` } }
          )
          .then((res) => {
            console.log(res?.data?.data);
            setModuleList(res?.data?.data?.reverse());
          })
          .catch((err) => {
            console.log(err);
            if (err?.response?.status === 403) {
              alert(err?.response?.data?.msg);
              router.push("/main/login");
            }
          });
      };

      fetchDevices();
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
          <DeviceListItem key={index} device={device} onClickModule={onSelect} />
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
