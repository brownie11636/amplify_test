import React, { useState } from "react";
import styles from "./Popup.module.css";
import axios from "axios";
import PltModuleManager from "./PltModuleRoster";
import DeviceListItem from "./deviceListItem";
import PltModuleSelector from "./PltModuleSelector";

const DevicePopup = ({ onClose, onSearch }) => {
  const [serialNumber, setSerialNumber] = useState("dummy data");
  const [isRobotSelectVisible, setIsRobotSelectVisible] = useState(false);
  const [isDefaultRobotSelected, setIsDefaultRobotSelected] = useState(false);
  const [isCameraSelectVisible, setIsCameraSelectVisible] = useState(false);
  const [defaultRobot, setDefaultRobot] = useState();
  const [fetchedData, setFetchedData] = useState(null);
  const [password, setPassword] = useState("");
  const filter = {};

  const [baseURL, setBaseURL] = useState();
  useEffect(() => {
    setBaseURL(
      typeof window !== "undefined" && window?.location.href.includes("www")
        ? process.env.NEXT_PUBLIC_API_URL_WWW
        : process.env.NEXT_PUBLIC_API_URL
    );
  }, []);
  const handleSearch = async () => {
    // Call the onSearch function and pass the serialNumber
    // const data = await onSearch(serialNumber);
    // curl -k -X POST -H "Content-Type: application/json" -d '{"filter":{}}' https://localhost:3333/portalfetch/module-list
    // const fetchedDevices = await axios.post(baseURL+"/fetch/v0.1/module/module-list", {
    const fetchedDevices = await axios.post(baseURL + "/api/portalfetch/module/module-list", {
      filter: { serialNumber: serialNumber },
    });

    console.log(fetchedDevices?.data?.data);
    setFetchedData(fetchedDevices?.data?.data[0]);
  };

  const handleRegister = () => {
    // Implement registration logic here
    console.log("Registering with password:", password);
  };

  const onAddDefaultRobotClick = () => {
    setIsRobotSelectVisible(true);
    console.log("robot clicked");
  };
  const onAddDefaultCameraClick = () => {
    setIsCameraSelectVisible(true);
    console.log("camera clicked");
  };

  const onSelectRobot = (selectedItem) => {
    console.log("on select robot event");
    console.log(selectedItem);
    setIsRobotSelectVisible(false);
    setDefaultRobot(selectedItem);
  };
  const onSelectCamera = () => {
    console.log("on select camera event");
  };

  return (
    <div className={styles.popupContainer}>
      <h1>Create New Task</h1>
      <div className={styles.infoContainer}>
        <div>
          <h3>Alias</h3>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className={styles.inputField}
            autoComplete="off"
          />
        </div>

        <div>
          <h3>Application</h3>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className={styles.inputField}
            autoComplete="off"
          />
        </div>
        <div>
          <h3>Default Robot:</h3>
          <PltModuleSelector filter={{ type: "robot" }} />
        </div>
        <div>
          <h3>Default Camera:</h3>
          <PltModuleSelector filter={{ type: "camera" }} />
        </div>
      </div>

      <button onClick={onClose} className={styles.closeButton}>
        <span aria-hidden="true">×</span>
      </button>
      <h2>Enter Task Number</h2>
      <div className={styles.inputContainer}>
        <button onClick={handleSearch} className={styles.searchButton}>
          Create
        </button>
      </div>
    </div>
  );
};

export default DevicePopup;
