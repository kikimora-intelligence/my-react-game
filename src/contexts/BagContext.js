import React, { createContext, useContext, useState } from "react";

const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [playerBag, setPlayerBag] = useState(() => {
    const storedBag = localStorage.getItem("playerBag");
    return storedBag ? JSON.parse(storedBag) : [];
  });

  const updatePlayerBag = (newItems) => {
    setPlayerBag((prevBag) => {
      // Filter out the key from the bag
      const updatedBag = prevBag.filter((item) => item.name !== "Key");

      // Add new items to the bag
      updatedBag.push(...newItems);

      // Store updated bag in local storage
      localStorage.setItem("playerBag", JSON.stringify(updatedBag));

      return updatedBag;
    });
  };

  return (
    <BagContext.Provider value={{ playerBag, updatePlayerBag }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => {
  return useContext(BagContext);
};

export { BagContext };
