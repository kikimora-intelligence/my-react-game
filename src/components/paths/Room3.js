import React, { useEffect, useState } from "react";
import RoomPage from "../reusable components/RoomPage";
import styles from "./Room3.module.css";

const Room3 = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedMessage = localStorage.getItem("room3Message");
    if (savedMessage) {
      setMessage(savedMessage);
    }
  }, []);

  return (
    <div className={styles.roomContainer}>
      <RoomPage roomName="Room 3" />
      <p className={styles.message}>{message || "No message found."}</p>
    </div>
  );
};

export default Room3;
