import React, { useState, useEffect } from "react";
import "../../Style/common/home.css";
import Service from "../../components/Service";
import { Link } from 'react-router-dom';
import Produit from "../../components/Produit";
import Footer from "../../components/Footer";
import { Contact } from "../commons/Contact";
import { motion } from "framer-motion";
import Carousel from "../../components/Carousel";
import Produit_img from "../../components/Produit_img";
import Bande from "../../components/Bande";
import Ultra from "../../components/Ultra";
import Carousel_home from "../../components/Carousel_home";


export const A_accueil = () => { 

 const [carouselColor, setCarouselColor] = useState("#ffffff");
  const [currentProduct, setCurrentProduct] = useState({
    name: "HP Pavilion",
    desc: "Un produit de qualité supérieure disponible dès maintenant.",
    price: "850 000 FCFA",
    btnColor: "#0d6efd",
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };


    return (
        <div className="home_page">
        <section
        className="home_intro"
        style={{
          backgroundColor: carouselColor,
          transition: "background-color 1s ease",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 5%",
          minHeight: "100vh",
        }}
      >
        <div className="home_left">
          <motion.div
            key={currentProduct.name}
            className="product_info"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.3 }}
          >
            <motion.h2 variants={variants}>{currentProduct.name}</motion.h2>
            <motion.p variants={variants}>{currentProduct.desc}</motion.p>
            <motion.h4 variants={variants}>{currentProduct.price}</motion.h4>
            <motion.a
              href="/catalogue"
              className="btn_explorer"
              style={{ backgroundColor: currentProduct.btnColor }}
              variants={variants}
            >
              Explorer
            </motion.a>
          </motion.div>
        </div>

        <div className="home_center">
          <Carousel_home
            onColorChange={setCarouselColor}
            onProductChange={setCurrentProduct}
          />
        </div>
      </section>

            {/* bande d'image */}
            {/* <Carousel/> */}

            {/* section produit */}
            {/* <Produit_img/> */}
            
            {/* Bande */}
            {/* <Bande/> */}

            {/* design */}
            {/* <Ultra/> */}


            {/* products */}
            {/* <Produit/> */}

            {/* service */}
            {/* <Service/> */}


            {/* section contact */}
            {/* <Contact/> */}

            {/* Avis */}
            {/* <Avis/> */}

            {/* Carte */}
            {/* <Map/> */}

            {/* Footer */}
            {/* <Footer/> */}
        </div>

        
    );
    }