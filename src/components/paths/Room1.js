import React from "react";
import RoomPage from "../reusable components/RoomPage";
import Character from "../reusable components/Character";
import styles from "./Room1.module.css";

const Room1 = () => {
  const selectedCharacterImage = localStorage.getItem("selectedCharacter");
  const playerName = localStorage.getItem("playerName");

  const room1Items = [
    {
      id: 1,
      name: "Book",
      description: "A dusty old book.",
      image: "/images/book.png",
    },
    {
      id: 2,
      name: "Key",
      description: "A rusty key.",
      image: "/images/key.png",
    },
  ];

  const dialogues = [
    `Welcome to Room 1, ${playerName}!`,
    `I see you found a book and a key.`,
    "Use the key to open the door in Room 2!",
    `Good luck, ${playerName}!`,
  ];

  return (
    <div className={styles.roomContainer}>
      <Character
        characterImage={selectedCharacterImage}
        dialogues={dialogues}
      />
      <RoomPage roomName="" items={room1Items} />
    </div>
  );
};

export default Room1;
