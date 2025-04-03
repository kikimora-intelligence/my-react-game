import React, { useState } from "react";
import styles from "./Labyrinth.module.css";

// A more complex initial maze
const initialMaze = [
  ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
  ["W", "P", " ", " ", "W", " ", "W", " ", " ", " ", "G", "W"],
  ["W", "W", "W", " ", "W", " ", "W", " ", "W", "W", "W", "W"],
  ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"],
  ["W", " ", "W", "W", "W", " ", "W", "W", "W", "W", " ", "W"],
  ["W", " ", " ", " ", "W", " ", " ", " ", " ", "W", " ", "W"],
  ["W", "W", "W", " ", "W", "W", "W", "W", " ", "W", " ", "W"],
  ["W", " ", " ", " ", " ", " ", " ", "W", " ", " ", " ", "W"],
  ["W", " ", "W", "W", "W", "W", " ", "W", "W", "W", "W", "W"],
  ["W", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "W"],
  ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
];

const Labyrinth = () => {
  const [maze, setMaze] = useState(initialMaze);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });

  const handleKeyDown = (e) => {
    const { x, y } = playerPosition;
    let newX = x;
    let newY = y;

    if (e.key === "ArrowUp") newX -= 1;
    if (e.key === "ArrowDown") newX += 1;
    if (e.key === "ArrowLeft") newY -= 1;
    if (e.key === "ArrowRight") newY += 1;

    // Ensure the player doesn't move through walls
    if (maze[newX][newY] !== "W") {
      const newMaze = maze.map((row) => [...row]);
      newMaze[x][y] = " "; // Clear the old player position
      newMaze[newX][newY] = "P"; // Move to the new position
      setMaze(newMaze);
      setPlayerPosition({ x: newX, y: newY });

      // Check if player reached the goal
      if (maze[newX][newY] === "G") {
        alert("You win!");
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPosition]);

  return (
    <div className={styles.labyrinthContainer}>
      <p className={styles.instructions}>
        Use the arrow keys to navigate through the maze!
      </p>
      <div className={styles.labyrinth}>
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`${styles.cell} ${
                  styles[cell === "W" ? "wall" : "path"]
                }`}
              >
                {cell === "P" && <div className={styles.player}></div>}
                {cell === "G" && <div className={styles.goal}></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labyrinth;
