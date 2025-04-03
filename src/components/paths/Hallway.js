import React, { useState } from "react";
import { Link } from "react-router-dom";
import Bag from "../reusable components/Bag";
import styles from "./Hallway.module.css";

const arrows = [
  {
    id: 1,
    name: "Room 1",
    image: "images/arrow.png",
    arrowClass: "arrow-room1",
  },
  {
    id: 2,
    name: "Room 2",
    image: "images/arrow.png",
    arrowClass: "arrow-room2",
  },
  {
    id: 3,
    name: "Room 3",
    image: "images/arrow1.png",
    arrowClass: "arrow-room3",
  },
];

const Hallway = () => {
  const [bagItems, setBagItems] = useState([]);
  const [hoveredArrow, setHoveredArrow] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredArrow(id);
  };

  const handleMouseLeave = () => {
    setHoveredArrow(null);
  };

  return (
    <div className={styles["hallway-wrapper"]}>
      <h1 className={styles["label"]}>Explore the rooms</h1>
      <div className={styles["arrow-options"]}>
        {arrows.map((arrow) => (
          <Link
            key={arrow.id}
            to={`/room${arrow.id}`}
            className={styles["arrow-link"]}
          >
            <div
              className={styles["room-container"]}
              onMouseEnter={() => handleMouseEnter(arrow.id)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={arrow.image}
                alt={arrow.name}
                className={`${styles["arrow-image"]} ${
                  styles[arrow.arrowClass]
                }`}
              />
              {hoveredArrow === arrow.id && (
                <span
                  className={`${styles["room-label"]} ${
                    styles[`${arrow.arrowClass}-label`]
                  }`}
                >
                  {arrow.name}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
      <Bag bagItems={bagItems} />
    </div>
  );
};

export default Hallway;
