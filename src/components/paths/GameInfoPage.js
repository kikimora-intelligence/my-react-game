import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GameInfoPage.module.css";

const GameInfoPage = () => {
  const navigate = useNavigate();
  const characterImages = [
    "/images/character1.png",
    "/images/character2.png",
    "/images/character3.png",
  ];

  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [weather, setWeather] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Sofia&units=metric&appid=YOUR_API_KEY`
      );
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const fetchAIResponse = async () => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: chatInput }],
          }),
        }
      );
      const data = await response.json();
      setChatResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  const handleStartGame = () => {
    if (playerName === "") {
      alert("You need a name to continue into the game!");
    } else {
      localStorage.setItem(
        "selectedCharacter",
        characterImages[selectedCharacterIndex]
      );
      localStorage.setItem("playerName", playerName);
      localStorage.setItem("playerBag", JSON.stringify([]));
      navigate("/game");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Choose your character and name</h1>
      <div className={styles.characterSelection}>
        <button
          onClick={() =>
            setSelectedCharacterIndex((prev) =>
              prev > 0 ? prev - 1 : characterImages.length - 1
            )
          }
        >
          &lt;
        </button>
        <img
          src={characterImages[selectedCharacterIndex]}
          alt="Character"
          className={styles.characterImage}
        />
        <button
          onClick={() =>
            setSelectedCharacterIndex((prev) =>
              prev < characterImages.length - 1 ? prev + 1 : 0
            )
          }
        >
          &gt;
        </button>
      </div>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
        className={styles.nameInput}
      />
      <button onClick={handleStartGame} className={styles.startGameButton}>
        Start Game
      </button>

      <div className="sidebar">
        {weather && (
          <div className="weatherSection">
            <img src={weather.icon} alt="Weather Icon" />
            <p>
              {weather.temp}°C - {weather.description}
            </p>
          </div>
        )}

        <div className="chatbotSection">
          <input type="text" placeholder="Ask the AI..." />
          <button>Ask</button>
          <p className="chatResponse">AI response will appear here...</p>
        </div>
      </div>
    </div>
  );
};

export default GameInfoPage;
