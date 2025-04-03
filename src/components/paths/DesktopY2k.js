import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import styles from "./DesktopY2k.module.css";

const DesktopY2k = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [removeNotification, setRemoveNotification] = useState(false);
  const [windows, setWindows] = useState([
    {
      id: 2,
      title: "Video Window",
      minimized: false,
      position: { top: "160px", left: "370px" },
      content: (
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/RDVgfFzZVsA"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ),
    },
    {
      id: 3,
      title: "Custom Content Window",
      minimized: false,
      position: { top: "50px", left: "900px" },
      content: (
        <img src="/images/window.jpg" alt="Window" style={{ width: "100%" }} />
      ),
    },
  ]);

  const navigate = useNavigate();

  const handleOrbClick = () => {
    setShowMessage(true);
    setRemoveNotification(true);
  };

  const handleReply = () => {
    if (message.trim() === "") {
      alert("Type in a message to continue!");
    } else {
      localStorage.setItem("room3Message", message);
      navigate("/សាល");
    }
  };

  const updateWindow = (id, changes) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...changes } : w))
    );
  };

  const handleClose = (id) =>
    setWindows((prev) => prev.filter((w) => w.id !== id));

  return (
    <div>
      <div className={styles["desktop-background"]}></div>
      <div>
        <div className={styles["purple-orb"]} onClick={handleOrbClick}>
          <div className={styles["inner-orb"]}></div>
        </div>
        {!removeNotification && (
          <div className={styles.messageText}>
            You have a message, click for it!
          </div>
        )}
      </div>

      {windows.map(({ id, title, minimized, position, content }) => (
        <Draggable key={id}>
          <div
            className={`${styles.window} ${minimized ? styles.minimized : ""}`}
            style={{ ...position }}
          >
            <div className={styles["title-bar"]}>
              <div className={styles["title-bar-text"]}>{title}</div>
              <div className={styles["title-bar-controls"]}>
                <button onClick={() => handleClose(id)}>x</button>
                <button
                  onClick={() => updateWindow(id, { minimized: !minimized })}
                >
                  _
                </button>
              </div>
            </div>
            {!minimized && (
              <div className={styles["window-body"]}>{content}</div>
            )}
          </div>
        </Draggable>
      ))}

      <div className={styles["taskbar"]}>
        {windows
          .filter((w) => w.minimized)
          .map(({ id, title }) => (
            <button
              key={id}
              onClick={() => updateWindow(id, { minimized: false })}
              className={styles["taskbar-button"]}
            >
              {title}
            </button>
          ))}
      </div>

      {showMessage && (
        <div className={styles["message-window"]}>
          <div className={styles["title-bar"]}>
            <div className={styles["title-bar-text"]}>Messages</div>
          </div>
          <div className={styles["window-body"]}>
            <h2>From Lily</h2>
            <p>L: This game is so exciting!</p>
            <div>
              <input
                type="text"
                placeholder="Your text..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReply()}
              />
              <button onClick={handleReply}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopY2k;
