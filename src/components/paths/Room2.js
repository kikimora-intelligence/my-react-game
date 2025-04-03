import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBag } from "../../contexts/BagContext";
import RoomPage from "../reusable components/RoomPage";

import styles from "./Room2.module.css";

const Room2 = () => {
  const navigate = useNavigate();
  const [isDoorUnlocked, setIsDoorUnlocked] = useState(false);

  const { playerBag } = useBag();

  useEffect(() => {
    const hasKey = playerBag.some((item) => item.name === "Key");
    setIsDoorUnlocked(hasKey);
  }, [playerBag]);

  const handleDoorClick = () => {
    if (isDoorUnlocked) {
      navigate("/unlocked-room");
    } else {
      alert("You need the key to open this door.");
    }
  };

  return (
    <div className={styles.room2}>
      <RoomPage roomName="Room 2" />
      <div className={styles.doorContainer}>
        <img
          src="images/door.jpg"
          alt="Door"
          className={styles.door}
          onClick={handleDoorClick}
        />
        {!isDoorUnlocked && (
          <p className={styles.tooltip}>You need the key to open it</p>
        )}
      </div>
    </div>
  );
};

export default Room2;
