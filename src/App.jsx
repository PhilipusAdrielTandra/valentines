import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import Hangyodon from "../public/311240653d50514816b99a1accddf0bf.jpg";
import Hangyodon2 from "../public/Cdhmf8ZUUAAl3Db.jpg";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const moveButton = () => {
    if (accepted) return;

    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;

    setPosition({ x: randomX, y: randomY });
  };
  const celebrate = () => {
    setAccepted(true);

    const duration = 6 * 1000;
    const animationEnd = Date.now() + duration;

    const valentineColors = [
      "#EF476F",
      "#FFB3C1",
      "#FFD1DC",
      "#FFFFFF",
      "#FFD166",
    ];

    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };
    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 40 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        colors: valentineColors,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        colors: valentineColors,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#FFB3C1] text-center overflow-hidden gap-5 px-4">
      <h1 className="text-[#5A0F2E] text-2xl font-semibold">
        {accepted ? "YAY 💖 I LOVE YOU!!" : "Will you be my valentine? 🥺"}
      </h1>
      <img
        src={accepted ? Hangyodon2 : Hangyodon}
        className="w-48 h-48 object-cover rounded-full border-4 border-[#5A0F2E] shadow-lg transition-all duration-500 scale-100"
        alt="Hangyodon"
      />
      <div
        ref={containerRef}
        className="relative flex gap-6 w-[90vw] max-w-[360px] h-[140px] items-center justify-center"
      >
      {!accepted && (
        <button
          onClick={celebrate}
          className="px-6 py-2 bg-[#EF476F] text-white rounded-lg
                    hover:scale-110 transition-all duration-300
                    shadow-md"
        >
          Yes
        </button>
      )}
        {!accepted && (
          <button
            ref={buttonRef}
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            className="px-6 py-2 bg-[#3A3A3A] text-white rounded-lg
                       transition-transform duration-100 ease-out shadow-md"
          >
            No
          </button>
        )}
      </div>
    </div>
  );
}

export default App;