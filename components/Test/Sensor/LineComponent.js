import React, { useState, useEffect } from 'react';
import ApexChartLine from './ApexChartLine';
import styles from "../../../styles/login2.module.css";
import parser from "./seriesParsers";

export default function App() {

  const [serialNumber, setSerialNumber] = useState("SN000-000-0000");
  const [urlFlag, setUrlFlag] = useState(true);
  const [message, setMessage] = useState("");
  const [accData, setAccData] = useState([]);
  const [prsData, setPrsData] = useState([]);
  const [trhData, setTrhData] = useState([]);
  const [xTimeRange, setXTimeRange] = useState(20);
  const [options, setOptions] = useState({
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: false,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      type: "numeric"
    },
    markers: {
      size: 0
    },
  });
  const mqtt_url = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload/topic?topic=perpet/';
  const mqtt_url2 = 'https://jayutest.best:58004/iot-service/v1/mqtt/payload';

  const DoubleYaxisOption = [
    { 
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#008FFB'
      },
      labels: {
        style: {
          colors: '#008FFB',
        }
      },
      tooltip: {
        enabled: true
      }
    },
    {
      opposite: true,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#00E396'
      },
      labels: {
        style: {
          colors: '#00E396',
        }
      },
    }
  ];

  const onChangeSerialNumber = (event) => {
    setSerialNumber(event.target.value);
  };

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const onChangeXTimeRange = (event) => {
    setXTimeRange(event.target.value);
  };
  
  useEffect(() => {
    setAccData([]);
    setPrsData([]);
    setTrhData([]);
    const timeout1 = setInterval(() => {
      fetch(mqtt_url+serialNumber+"/acc")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.data.content);
        let arr = data.data.content;
        setAccData(parser(arr,"acc"));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, 1000);
    
    const timeout2 = setInterval(() => {
      fetch(mqtt_url+serialNumber+"/prs")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.data.content);
        let arr = data.data.content;
        setPrsData(parser(arr,"prs"));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, 1000);

    const timeout3 = setInterval(() => {
      fetch(mqtt_url+serialNumber+"/trh")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data.data.content);
        let arr = data.data.content;
        setTrhData(parser(arr,"trh"));
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }, 1000)

    return () => {
      clearInterval(timeout1);
      clearInterval(timeout2);
      clearInterval(timeout3);
    };
    
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

  const xTimeRangeSubmit = (e) => {
    setOptions({ ...options, xaxis: {type: "numeric", range: 1000*xTimeRange}});
    console.log(options);
  }

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
        <h4>Label message</h4>
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
      <div className={styles.login_id}>
        <h4>set Xaxis range in second </h4>
        <input
          id="xrange"
          value={xTimeRange}
          onChange={onChangeXTimeRange}
          type="number"
          placeholder="Xaxis range in second"
        />
      </div>
      <div className={styles.submit}>
        <input type="submit" value="submit" onClick={xTimeRangeSubmit} />
      </div>
      <ApexChartLine data={accData} options={{ ...options, title: {text: "Accelerometer"}}}/>
      <ApexChartLine data={prsData} options={{ ...options, title: {text: "pressure"}}}/>
      <ApexChartLine data={trhData} options={{ ...options, yaxis: DoubleYaxisOption, title: {text: "Temperature/Relative humidity"}}}/>
    </div>
  )
}