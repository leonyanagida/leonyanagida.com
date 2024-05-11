"use client";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function CursorFollower() {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [wordPosition, setWordPosition] = useState({ 
    x: 0,
    y: 0,
    word: "",
    visible: false
  });

  useEffect(() => {
    const follower = document.createElement('div');
    follower.className = styles.cursorFollower;
    document.body.appendChild(follower);

    const moveFollower = (e: { clientX: any; clientY: any; }) => {
      follower.style.left = `${e.clientX}px`;
      follower.style.top = `${e.clientY}px`;
      createTrail(e.clientX, e.clientY);
    };

    const createTrail = (x: any, y: any) => {
      const trail = document.createElement('div');
      trail.className = styles.trail;
      document.body.appendChild(trail);
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;

      setTimeout(() => {
        document.body.removeChild(trail);
      }, 800);
    };

    const handleClick = (e: { clientX: number; clientY: number; }) => {
      const words = ["Magic!", "Wow", "Woof!", "😄", "🫡"];
      const randomWord = words[Math.floor(Math.random() * words.length)];

      const clickEffect = document.createElement('div');
      clickEffect.className = styles.clickEffect;
      document.body.appendChild(clickEffect);
      clickEffect.style.left = `${e.clientX}px`;
      clickEffect.style.top = `${e.clientY}px`;

      // Clear any existing timeout to prevent premature hiding
      if (timeoutId) clearTimeout(timeoutId);

      const newTimeoutId = setTimeout(() => {
        setWordPosition(prev => ({ ...prev, visible: false }));
        document.body.removeChild(clickEffect);
      }, 1000);

      setTimeoutId(newTimeoutId);
      setWordPosition({ 
        x: e.clientX,
        y: e.clientY,
        word: randomWord,
        visible: true
      });
    []};

    document.addEventListener('mousemove', moveFollower);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', moveFollower);
      document.removeEventListener('click', handleClick);
      document.body.removeChild(follower);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div>
      {wordPosition.visible && (
        <div 
          className={styles.magicWord} 
          style={{ 
            position: 'fixed',
            left: `${wordPosition.x}px`,
            top: `${wordPosition.y}px`,
            zIndex: 1,
          }}
        >
          {wordPosition.word}
        </div>
      )}
    </div>
  );
}
