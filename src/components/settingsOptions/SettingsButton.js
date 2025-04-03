import React from "react";
import styles from "./SettingsButton.module.css";

const SettingsButton = ({ onClick }) => {
  return (
    <button className={styles.settingsButton} onClick={onClick}>
      <img className={styles.gear} src="/images/gear.png" alt="Settings" />
    </button>
  );
};

export default SettingsButton;
