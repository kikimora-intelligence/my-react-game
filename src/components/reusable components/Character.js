// Character.js
import React, { useState } from "react";
import styles from "./Character.module.css";

const Character = ({ characterImage, dialogues }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const handleNextDialogue = () => {
    setCurrentDialogueIndex((prevIndex) =>
      prevIndex < dialogues.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className={styles.characterContainer}>
      <img
        src={characterImage}
        alt="Character"
        className={styles.characterImage}
      />
      <div className={styles.dialogueBox} onClick={handleNextDialogue}>
        <p>{dialogues[currentDialogueIndex]}</p>
        <button className={styles.nextButton}>Next</button>
      </div>
    </div>
  );
};

export default Character;
