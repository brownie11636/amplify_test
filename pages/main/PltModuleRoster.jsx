import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./main.module.css";
import DeviceListItem from "./deviceListItem";
import AddModulePopup from "./AddDevicePopup"; // Import the popup component
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PltModuleManager = (props, { sessions }) => {
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
    // console.log("onSelect in the module");
  };

  const [baseURL, setBaseURL] = useState();

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
          })
          .catch((err) => {
            // console.log(err);
          });

        // setModuleList(response.data?.data);

        // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
        await axios
          .post(
            baseURL + "/fetch/v0.1/module/list",
            {
              filter: props.filter,
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
