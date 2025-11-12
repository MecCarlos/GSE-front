import React, { useState } from "react";
import { motion } from "framer-motion";
import "../../Style/common/home.css";

import Carousel_home from "../../components/Carousel_home";
import Carousel from "../../components/Carousel";
import ProduitImg from "../../components/Produit_img";
import Bande from "../../components/Bande";
import Ultra from "../../components/Ultra";
import Produit from "../../components/Produit";
import Service from "../../components/Service";
import { ContactComp } from "../../components/ContactComp";
import Footer from "../../components/Footer";

const Home = () => {
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
      {/* === SECTION ACCUEIL === */}
      <section 
        className="home_intro"
        style={{ backgroundColor: carouselColor }} 
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

      {/* === AUTRES SECTIONS === */}
      <Carousel />
      <ProduitImg />
      <Bande />
      <Ultra />
      <Produit />
      <Service />
      {/* <ContactComp /> */}
      <Footer />
    </div>
  );
};

export default Home;