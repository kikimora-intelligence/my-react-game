import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BagProvider } from "./contexts/BagContext";
import { NoteProvider } from "./contexts/NoteContext";

import GameInfoPage from "./components/paths/GameInfoPage";
import ChapterOne from "./components/paths/ChapterOne";
import DesktopY2k from "./components/paths/DesktopY2k";

import Hallway from "./components/paths/Hallway";
import Room1 from "./components/paths/Room1";
import Room2 from "./components/paths/Room2";
import Room3 from "./components/paths/Room3";
import UnlockedRoom from "./components/paths/UnlockedRoom";

import SettingsModal from "./components/settingsOptions/SettingsModal";
import SettingsButton from "./components/settingsOptions/SettingsButton";

import styles from "./App.css";
const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <Router>
      <div className={styles.appWrapper}>
        <NoteProvider>
          <BagProvider>
            <SettingsButton onClick={openSettings} />
            <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />

            <Routes>
              <Route path="/" element={<GameInfoPage />} />
              <Route path="/room1" element={<Room1 />} />
              <Route path="/room2" element={<Room2 />} />
              <Route path="/room3" element={<Room3 />} />
              <Route path="/unlocked-room" element={<UnlockedRoom />} />

              <Route path="/ព័ត៌មាន" element={<GameInfoPage />} />
              <Route path="/ហ្គេម" element={<ChapterOne />} />
              <Route path="/ការស្លាប់" element={<DesktopY2k />} />

              <Route path="/សាល" element={<Hallway />} />
            </Routes>
          </BagProvider>
        </NoteProvider>
      </div>
    </Router>
  );
};

export default App;
