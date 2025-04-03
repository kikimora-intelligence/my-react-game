import React, { useContext } from "react";
import { BagContext } from "../../contexts/BagContext";
import styles from "./Bag.module.css";

const Bag = () => {
  const { playerBag } = useContext(BagContext);

  const seenItems = new Set();

  return (
    <div className={styles.bag}>
      <h2>Inventory</h2>
      {playerBag && playerBag.length > 0 ? (
        <div className={styles.bagItems}>
          {playerBag.map((item, index) => {
            if (seenItems.has(item.name)) return null;
            return (
              <div key={index} className={styles.bagItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />

                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Your bag is empty. Collect items to see them here.</p>
      )}
    </div>
  );
};

export default Bag;
