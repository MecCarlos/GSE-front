import React, { useState, useEffect } from "react";
import "../Style/common/carousel_home.css";

import ipad from "../../src/assets/images/ipad.png";
import macbook2 from "../../src/assets/images/macbook2.png";
import hp3 from "../../src/assets/images/hp3.png";
import airpodmax from "../../src/assets/images/AirPodsMax5.png";

const images = [
  { src: ipad, color: "rgba(248, 125, 146, 0.57)" },
  { src: macbook2, color: "#eebf6f80" },
  { src: hp3, color: "rgba(121, 204, 236, 0.47)" },
  { src: airpodmax, color: "#f3c77a8e" },
];

const Carousel_home = ({ onColorChange }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (onColorChange) {
      onColorChange(images[current].color); 
    }
  }, [current, onColorChange]);

  return (
    <div className="color-carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div className="slide" key={index}>
            <img src={img.src} alt={`slide-${index}`} />
          </div>
        ))}
      </div>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
export default Carousel_home;
