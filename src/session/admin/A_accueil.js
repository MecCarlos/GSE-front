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
import Topadmin from "../../components/Topadmin";


export const A_accueil = () => { 

    const [bgColor, setBgColor] = useState("#fff");

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const variantsRight = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 2 } }
    };

    return (
        <div className="home_page">
            <div className="home_content"   style={{
                backgroundColor: bgColor, 
                transition: "background-color 1s ease",
                minHeight: "100vh", 
                padding: "20px"
            }}>
                {/* <Topadmin/> */}
                <div className="part left">
                      <motion.div
                        className="home_text"
                        initial="hidden"
                        animate="visible"
                        transition={{ staggerChildren: 0.2 }}
                        >
                        <motion.h1 variants={variants}>Gildas Empire Services</motion.h1>
                        <motion.h5 variants={variants}>Bienvenue sur notre site de vente en ligne</motion.h5>
                        <motion.p variants={variants}>Découvrez nos produits de qualité, conçus pour répondre à vos besoins.</motion.p>
                        <motion.button className="btn btn-primary rounded-pill" variants={variants}>
                            Explorer
                        </motion.button>
                        </motion.div>
                </div>
                <div className="part right">
                    {/* <img src={airpod}/> */}

                    <Carousel_home onColorChange={setBgColor}/>


                    {/* <motion.div 
                        className="text"
                        initial="hidden"
                        animate="visible"
                        variants={variantsRight}
                        >
                        <motion.h5 variants={variantsRight}>Apple airpod max</motion.h5>
                        <motion.p variants={variantsRight}>Decouvrez une nouvelle expériences auditives</motion.p>

                        <motion.div className="price" variants={variantsRight}>
                            <h6 className="text-danger">200.775<span className="p-1">F</span></h6>
                            <button className="rounded-pill">Commander</button>
                        </motion.div>
                    </motion.div> */}

                </div>
            </div>

            {/* bande d'image */}
            <Carousel/>

            {/* section produit */}
            <Produit_img/>
            
            {/* Bande */}
            <Bande/>

            {/* design */}
            <Ultra/>


            {/* products */}
            {/* <Produit/> */}

            {/* service */}
            <Service/>


            {/* section contact */}
            <Contact/>

            {/* Avis */}
            {/* <Avis/> */}

            {/* Carte */}
            {/* <Map/> */}

            {/* Footer */}
            <Footer/>
        </div>

        
    );
    }