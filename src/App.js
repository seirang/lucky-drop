import React, { useState, useEffect } from 'react';
import './App.css';

import cloverImg from './assets/도트_네잎클로버_배경투명.png';
import ribbonImg from './assets/도트_리본_연분홍_배경투명.png';
import jewelImg from './assets/도트_보석_배경투명.png';
import pearlImg from './assets/도트_진주알_연분홍.png';
import heartImg from './assets/도트_하트_진분홍_배경투명.png';
import titleLogo from './assets/도트_럭키드롭_배경투명.png';
import goButtonImg from './assets/도트_네잎클로버_분홍.png';
import sparkleImg from './assets/도트_반짝이_흰색_배경투명.png';


// Helper to generate a random value
const getRandom = (min, max) => Math.random() * (max - min) + min;

const itemImages = [cloverImg, ribbonImg, jewelImg, pearlImg, heartImg];

function App() {
  const [numbers, setNumbers] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fallingItems, setFallingItems] = useState([]);
  const [animationCycle, setAnimationCycle] = useState(0);

  const generateFallingItems = (cycle) => {
    const items = Array.from({ length: 50 }).map((_, i) => {
      const itemSrc = itemImages[i % itemImages.length];
      return {
        id: `${cycle}-${i}`, // Use cycle to create unique keys
        src: itemSrc,
        style: {
          left: `${getRandom(0, 100)}vw`,
          animationDuration: `${getRandom(2, 4)}s`,
          animationDelay: `${getRandom(0, 2)}s`,
        },
      };
    });
    setFallingItems(items);
  };

  const handleGoClick = () => {
    if (isAnimating) return; // Prevent clicks during animation

    const newCycle = animationCycle + 1;
    setAnimationCycle(newCycle);
    setIsAnimating(true);
    generateFallingItems(newCycle);

    // Generate lotto numbers
    const lottoNumbers = new Set();
    while (lottoNumbers.size < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      lottoNumbers.add(num);
    }
    const sortedNumbers = Array.from(lottoNumbers).sort((a, b) => a - b);
    setNumbers(sortedNumbers);

    // Wait for animation to finish before allowing another click
    setTimeout(() => {
      setIsAnimating(false);
    }, 4000); // Max animation duration
  };
  
  // Clear items when animation is done
  useEffect(() => {
    if (!isAnimating) {
      // Give items time to fall off screen before removing them
      const timer = setTimeout(() => setFallingItems([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);


  return (
    <div className="App">
      {fallingItems.map(item => (
        <img
          key={item.id}
          src={item.src}
          className="falling-item"
          style={item.style}
          alt=""
        />
      ))}

      <header className="App-header">
        <div className="title-image">
          <img src={sparkleImg} className="title-sparkle sparkle-1" alt="" />
          <img src={sparkleImg} className="title-sparkle sparkle-2" alt="" />
          <img src={titleLogo} alt="Lucky Drop" className="logo-img"/>
          <img src={sparkleImg} className="title-sparkle sparkle-3" alt="" />
          <img src={sparkleImg} className="title-sparkle sparkle-4" alt="" />
        </div>
        <p className="intro-text">Today's Lucky Draw - Catch your luck!</p>
        
        {numbers.length === 0 && (
          <img
            src={goButtonImg}
            alt="GO"
            className="go-button-img"
            onClick={handleGoClick}
          />
        )}
      </header>

      {numbers.length > 0 && (
        <div className="results-section">
          <div className="results-container">
            {numbers.map((num) => (
              <div key={num} className="number-ball">
                {num}
                <span className="sparkle"></span>
              </div>
            ))}
          </div>
          <img
            src={goButtonImg}
            alt="AGAIN"
            className={`go-button-img again-button ${isAnimating ? 'disabled' : ''}`}
            onClick={handleGoClick}
          />
        </div>
      )}
    </div>
  );
}

export default App;