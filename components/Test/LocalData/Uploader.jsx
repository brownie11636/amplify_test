import React from 'react';



const SensorDataDownloader = () => {
  const handleDownload = () => {
    // Sample sensor data for demonstration purposes
    const sensorData = {
      temperature: 25.5,
      humidity: 60,
      pressure: 1013.25,
      timestamp: new Date().toISOString(),
    };

    // Convert sensor data to JSON format
    const jsonData = JSON.stringify(sensorData);

    // Create a Blob from the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
    console.log("blob: ", blob);

    // Create a FormData object and append the .json file
    const formData = new FormData();
    formData.append('file', blob, 'sensor_data.json');

    //https://localhost:3333/portalfetch/test
    // Send the .json file to the server using Fetch API
    fetch('https://192.168.0.22:3333/portalfetch/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server if needed
        console.log(data);
      })
      .catch(error => {
        console.error('Error uploading data:', error);
      });

      


    const url = 'https://localhost:3333/portalfetch/upload';
    const data = {
      anyData: 'Hello, Server!!!!',
      tag: 'fetchTest Real',
    };

      // let mqtt_url = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload/topic?topic=perpet/SN000-DEV-0000/acc';
      let mqtt_url = 'https://192.168.0.22:3333/portalfetch/download';

      fetch(mqtt_url,{
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then(data => {
        // let arr = data.data.content;
        console.log("arr: ", data);
      })
      .catch(error => {
        console.error('Error:', error);
      });


  };

  return (
    <div>
      <button onClick={handleDownload}>Upload Sensor Data</button>
    </div>
  );
};

export default SensorDataDownloader;
