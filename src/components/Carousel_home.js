import "../Style/common/carousel_home.css";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ipad from "../assets/images/ipad.png";
import ecran from "../assets/images/asus.png";
import hp3 from "../assets/images/hp3.png";
import luminaire from "../assets/images/luminaire.png";
import manette from "../assets/images/manette-eclaire.png";
import airpodmax from "../assets/images/AirPodsMax5.png";

const images = [
  {
    src: hp3,
    color: "rgba(163, 188, 197, 0.35)",
    name: "HP Pavilion",
    btnColor: "#0d6efd",
  },
  {
    src: ipad,
    color: "rgba(248, 125, 146, 0.39)",
    name: "iPad Pro",
    btnColor: "#e91e63",
  },
  {
    src: luminaire,
    color: "rgba(236, 183, 10, 0.32)",
    name: "Lampe décorative",
    btnColor: "#ffc107",
  },
  {
    src: ecran,
    color: "rgba(121, 203, 236, 0.29)",
    name: "Écran Asus",
    btnColor: "#00bcd4",
  },
  {
    src: manette,
    color: "rgba(121, 203, 236, 0.26)",
    name: "Manette gamer",
    btnColor: "#009688",
  },
  {
    src: airpodmax,
    color: "#f3c77a50",
    name: "AirPods Max",
    btnColor: "#ff9800",
  },
];

const Carousel_home = ({ onColorChange, onProductChange }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (onColorChange) onColorChange(images[index].color);
    if (onProductChange)
      onProductChange({
        name: images[index].name,
        desc: "Un produit de qualité supérieure disponible dès maintenant.",
        price: `${800000 + index * 25000} FCFA`,
        btnColor: images[index].btnColor,
      });
  }, [index, onColorChange, onProductChange]);

  const variants = {
    enter: { y: -200, opacity: 0, scale: 0.8 },
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
    exit: { y: 200, opacity: 0, scale: 0.8, transition: { duration: 1 } },
  };

  return (
    <div className="vertical_carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index].src}
          src={images[index].src}
          alt={images[index].name}
          className="carousel_image"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        />
      </AnimatePresence>
    </div>
  );
};

export default Carousel_home;
