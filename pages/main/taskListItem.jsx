import React from 'react';
import styles from './main.module.css';

const ListItem = ({ text }) => {
  return (
    <div className={styles.item}>
      {text}
      {/* <button className={styles.addButton}>+</button> */}
    </div>
  );
};

export default ListItem;