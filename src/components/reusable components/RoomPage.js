import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Bag from "./Bag";
import styles from "./RoomPage.module.css";
import { useBag } from "../../contexts/BagContext";

const RoomPage = ({ roomName, roomImage, items = [] }) => {
  const { updatePlayerBag, playerBag } = useBag();
  //const [selectedItem, setSelectedItem] = useState(null);

  const [roomItems, setRoomItems] = useState(() => {
    const storedRoomItems = localStorage.getItem(`${roomName}-items`);

    try {
      const parsedItems = storedRoomItems ? JSON.parse(storedRoomItems) : items;
      return parsedItems;
    } catch (error) {
      console.error("Error parsing stored room items:", error);
      return items;
    }
  });

  useEffect(() => {
    localStorage.setItem(`${roomName}-items`, JSON.stringify(roomItems));
  }, [roomItems, roomName]);

  const handleItemClick = (item) => {
    const newBag = [...playerBag, item];
    updatePlayerBag(newBag);

    const remainingItems = roomItems.filter(
      (roomItem) => roomItem.id !== item.id
    );
    setRoomItems(remainingItems);

    // Debugging output
    console.log("Player's Bag: ", newBag);
    console.log("Remaining Items in Room: ", remainingItems);
  };

  return (
    <div className={styles.room}>
      <div className={styles.roomImage}></div>
      <div className={styles.infoBox}>
        <Link to="/សាល">
          <img
            className={styles.arrowLink}
            src="/images/arrow1.png"
            alt="Back to Hallway"
          />
          <span className={styles.hoverText}>Hallway</span>
        </Link>
        <div className={styles.itemContainer}>
          {roomItems.length > 0 ? (
            roomItems.map((item) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.name}
                className={styles.item}
                onClick={() => handleItemClick(item)}
              />
            ))
          ) : (
            <p>No items left in this room.</p>
          )}
        </div>
      </div>

      <Bag />
    </div>
  );
};

export default RoomPage;
