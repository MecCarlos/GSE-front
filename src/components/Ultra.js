import React, { useEffect, useRef, useState } from "react";
import "../Style/common/ultra.css";
// import double_laptop from "../assets/images/double_laptop.png";
import double_laptop from "../assets/images/casque_yellow.png";
import { NavLink } from "react-router-dom";

const Ultra = () => {
  const ultraRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ultraRef.current) observer.observe(ultraRef.current);

    const handleScroll = () => {
      if (ultraRef.current) {
        const rect = ultraRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setZoom(isInView);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={ultraRef}
      className={`section_ultra ${visible ? "visible" : ""} ${zoom ? "zoom" : ""}`}
    >
      <div className="ultra d-flex">
        <div className="left">
          <h6 className="reduc">- 15%</h6>
          <div className="text_box">
            <h1>CE</h1>
            <h1>MOIS</h1>
          </div>
          <h6 className="reduc">Stock très limité</h6>
        </div>

        <div className="right">
          {/* <h6 className="reduc">25%</h6> */}
          <div className="text_box">
            <h3>Gildas Empire</h3>
            <p>Consultez nos meilleurs produits en stock et faites-vous livrer en un rien de temps.</p>
            <NavLink className="bttn rounded-pill">Boutique</NavLink>
          </div>
        </div>
      </div>
      <img className="casque" src={double_laptop} alt="Laptop" />
    </section>
  );
};

export default Ultra;
