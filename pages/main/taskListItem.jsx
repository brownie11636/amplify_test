import { useRouter } from "next/router";
import React from "react";
import styles from "./main.module.css";

const ListItem = ({ task }) => {
  const router = useRouter();
  const onSelectTask = () => {
    console.log(task);
    if (task.type === "robot") {
      // router.push(`/webrtc/teleoperation`);
    } else {
      // router.push(`/main/${device.serialNumber}/camera`);
    }
  };

  return (
    <div className={styles.item} onClick={() => onSelectTask()}>
      <div className={styles.deviceName}>{task?.alias}</div>
      <div className={styles.serialNumber}>{task?.id}</div>
      {/* <button className={styles.addButton}>+</button> */}
    </div>
  );
};
export default ListItem;
