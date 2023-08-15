import React, { useState } from 'react';
import styles from './AddDevicePopup.module.css';

const DevicePopup = ({ onClose, onSearch }) => {
  const [serialNumber, setSerialNumber] = useState('');
  const [fetchedData, setFetchedData] = useState(null);
  const [password, setPassword] = useState('');

  const handleSearch = async () => {
    // Call the onSearch function and pass the serialNumber
    // const data = await onSearch(serialNumber);
    const data = {
        status: 'Registered',
        'device-type': 'Arm',
        manufacturer: 'Arm Inc.',

    };
    setFetchedData(data);
  };

  const handleRegister = () => {
    // Implement registration logic here
    console.log('Registering with password:', password);
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
          <p>Device Type: {fetchedData['device-type']}</p>
          <p>Manufacturer: {fetchedData.manufacturer}</p>
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
