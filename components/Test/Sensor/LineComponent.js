import React, { useState, useEffect } from 'react';
import ThreeLines from './ThreeLine';
import styles from "../../../styles/Login2.module.css";
import parser from "./seriesParsers";

export default function App() {
  const d = new Date();
  const [targetURL, settargetURL] = useState("perpet/SerialNumber/acc");
  const [submitFlag, setSubmitFlag] = useState(true);
  const [targetSensor, setTargetSensor] = useState("acc")

  const [data, setData] = useState([]);
  const mqtt_url = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload/topic?topic=';

  const onChangeTargetURL = (event) => {
    settargetURL(event.target.value);
  };

  useEffect(() => {
    setData([]);
    const timeout = setInterval(() => {
      fetch(mqtt_url+targetURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        let arr = data.data.content;
        setData(parser(arr,"1q2w3e4r"));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, 1000)
  
    return () => clearInterval(timeout);
  }, [submitFlag]);

  const Submit = (e) => {
    setSubmitFlag(!submitFlag);
    console.log(submitFlag);
  };

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div className={styles.login_id}>
        <h4>choose data range</h4>
        <input
          id="name"
          value={targetURL}
          onChange={onChangeTargetURL}
          type="name"
          placeholder="target URL"
        />
      </div>
      <div className={styles.submit}>
        <input type="submit" value="submit" onClick={Submit} />
      </div>
      <ThreeLines data={data} />
    </div>
  )
}