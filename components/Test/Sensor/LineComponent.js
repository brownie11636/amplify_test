import React, { useState, useEffect } from 'react';
import ApexChartLine from './ApexChartLine';
import styles from "../../../styles/login2.module.css";
import parser from "./seriesParsers";

export default function App() {

  const [serialNumber, setSerialNumber] = useState("SerialNumber");
  const [urlFlag, setUrlFlag] = useState(true);
  const [message, setMessage] = useState("");
  const [accData, setAccData] = useState([]);
  const [prsData, setPrsData] = useState([]);
  const [trhData, setTrhData] = useState([]);
  const mqtt_url = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload/topic?topic=perpet/';
  const mqtt_url2 = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload';

  const accData1 = [
    {
      "name": "x",
      "data": [[1,1],[2,2],[3,3],[4,2],[5,1]]
    },{
    "name": "y",
    "data": [[1,2],[2,4],[3,5],[4,3],[5,1]]
  },{
    "name": "z",
    "data": [[1,4],[2,3],[3,1],[4,2],[5,1]]
  }];

  const prsData1 = [
    {
      "name": "pressure",
      "data": [[1,10],[2,27],[3,32],[4,25],[5,15]]
    }];  

  const trhData1 = [
    {
      "name": "temperature",
      "data": [[1,1],[2,2],[3,3],[4,2],[5,1]]
    },{
    "name": "rh",
    "data": [[1,100],[2,200],[3,300],[4,200],[5,100]]
  }];

  const onChangeSerialNumber = (event) => {
    setSerialNumber(event.target.value);
    console.log(serialNumber);
  };

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  // useEffect(() => {
  //   setAccData([]);
  //   setPrsData([]);
  //   setTrhData([]);
  //   const timeout1 = setInterval(() => {
  //     fetch(mqtt_url+serialNumber+"/acc")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data.data.content);
  //       let arr = data.data.content;
  //       setAccData(parser(arr,"acc"));
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  //   }, 1000);
    
  //   const timeout2 = setInterval(() => {
  //     fetch(mqtt_url+serialNumber+"/prs")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data.data.content);
  //       let arr = data.data.content;
  //       setPrsData(parser(arr,"prs"));
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  //   }, 2000);

  //   const timeout3 = setInterval(() => {
  //     fetch(mqtt_url+serialNumber+"/trh")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data.data.content);
  //       let arr = data.data.content;
  //       setTrhData(parser(arr,"trh"));
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  //   }, 5000)

  //   return () => {
  //     clearInterval(timeout1);
  //     clearInterval(timeout2);
  //     clearInterval(timeout3);
  //   };
    
  // }, [urlFlag]);

  const urlSubmit = (e) => {
    setUrlFlag(!urlFlag);
    console.log(urlFlag);
  };

  const messageSubmit = (e) => {
    fetch(mqtt_url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic: "perpet/"+serialNumber+"/message",
        payload: message
      })
    })
      .then(response => {
        if (response.ok) {
          console.log('Message sent successfully.');
          setMessage(''); // Clear the message state after successful sending
        } else {
          console.log('Failed to send message.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div className={styles.login_id}>
        <h4>Type the serial number</h4>
        <input
          id="url"
          value={serialNumber}
          onChange={onChangeSerialNumber}
          type="text"
          placeholder="serial number"
        />
      </div>
      <div className={styles.submit}>
        <input type="submit" value="submit" onClick={urlSubmit} />
      </div>
      <div className={styles.login_id}>
        <h4>Patient message</h4>
        <input
          id="message"
          value={message}
          onChange={onChangeMessage}
          type="text"
          placeholder="Message"
        />
      </div>
      <div className={styles.submit}>
        <input type="submit" value="submit" onClick={messageSubmit} />
      </div>
      <ApexChartLine accData={accData1} prsData={prsData1} trhData={trhData1}/>
    </div>
  )
}