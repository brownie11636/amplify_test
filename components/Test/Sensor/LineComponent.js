import React, { useState, useEffect } from 'react';
import ThreeLines from './ThreeLine';
import styles from "../../../styles/Login2.module.css";
import parser from "./seriesParsers";

export default function App() {

  const [targetURL, setTargetURL] = useState("perpet/SerialNumber/acc");
  const [urlFlag, setUrlFlag] = useState(true);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const mqtt_url = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload/topic?topic=';
  const mqtt_url2 = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload';

  const onChangeTargetURL = (event) => {
    setTargetURL(event.target.value);
  };

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
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
        console.log(data.data.content);
        let arr = data.data.content;
        setData(parser(arr,"pressure"));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, 1000)
  
    return () => clearInterval(timeout);
  }, [urlFlag]);

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
        topic: targetURL.split('/').map((part, index, arr) => (index === arr.length - 1 ? "message" : part)).join('/'),
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
        <h4>choose data range</h4>
        <input
          id="url"
          value={targetURL}
          onChange={onChangeTargetURL}
          type="text"
          placeholder="target URL"
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
      <ThreeLines data={data} />
    </div>
  )
}