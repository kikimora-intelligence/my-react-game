// NoteContext.js
import React, { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  // Function to add a new note
  const addNote = (text) => {
    setNotes((prevNotes) => [...prevNotes, { id: Math.random(), text }]);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => useContext(NoteContext);
