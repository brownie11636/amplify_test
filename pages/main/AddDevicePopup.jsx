import React, { useEffect, useState } from "react";
import styles from "./Popup.module.css";
import axios from "axios";

const DevicePopup = ({ onClose, onSearch }) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [password, setPassword] = useState("");

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
    // const fetchedDevices = await axios.post(baseURL+"/fetch/v0.1/module/list", {
    const fetchedDevices = await axios.post(baseURL + "/api/portalfetch/module/list", {
      filter: { serialNumber: serialNumber },
    });

    console.log(fetchedDevices?.data?.data);

    // const data = {
    //     status: 'Registered',
    //     'device-type': 'Arm',
    //     manufacturer: 'Arm Inc.',
    // };
    setFetchedData(fetchedDevices?.data?.data[0]);
  };

  const handleRegister = () => {
    // Implement registration logic here
    console.log("Registering with password:", password);
  };

  return (
    <div className={styles.popupContainer}>
      <button onClick={onClose} className={styles.closeButton}>
        <span aria-hidden="true">×</span>
      </button>
      <h2>Enter Serial Number</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className={styles.inputField}
          autoComplete="off"
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
      {fetchedData && (
        <div className={styles.infoContainer}>
          <h3>Fetched Information</h3>
          <p>Status: {fetchedData.status}</p>
          <p>Device Type: {fetchedData.type}</p>
          <p>Description: {fetchedData.descriptions}</p>
          <p>Location: {fetchedData.location}</p>
          <p>Vender: {fetchedData.vender}</p>

          <div className={styles.inputContainer}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className={`${styles.passwordField} ${styles.inputField}`}
              autoComplete="off"
            />
            <button onClick={handleRegister} className={styles.registerButton}>
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevicePopup;
