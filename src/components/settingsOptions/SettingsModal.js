import React, { useEffect, useState } from "react";
import styles from "./SettingsModal.module.css";

const SettingsModal = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  if (!isOpen && !visible) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${!isOpen ? styles.hidden : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>Settings</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.settingItem}>
          <label>
            Sound
            <input type="checkbox" />
          </label>
        </div>
        <div className={styles.settingItem}>
          <label>
            Lighting
            <input type="range" min="0" max="100" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
