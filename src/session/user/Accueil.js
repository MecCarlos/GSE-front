import React from "react";
import "../../Style/common/home.css";
import lp1 from "../../assets/images/Lp1.jpeg";
import lp2 from "../../assets/images/Lp3.jpg";
import lp3 from "../../assets/images/Lp4.jpg";
import Service from "../../components/Service";
import { Link } from 'react-router-dom';
import Produit from "../../components/Produit";
import Avis from "../../components/Avis";
import Map from "../../components/Map";
import Footer from "../../components/Footer";
import Topmenu from "../../components/Topuser";


export const Accueil = () => { 

   

    return (
        <div className="home_page">
            <div className="home_content">
                <Topmenu/>

                <div id="carouselExampleSlidesOnly" className="carousel w-100 slide" data-bs-ride="carousel" style={{position: "absolute", top: "0", left: "0"}}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={lp1} className="d-block w-100"/>
                        </div>
                        <div className="carousel-item">
                        <img src={lp2} className="d-block w-100"/>
                        </div>
                        <div className="carousel-item">
                        <img src={lp3} className="d-block w-100"/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Message hello */}
            <div className="hello_box">
                <div className="home_text text-white">
                    <h1>Bienvenue sur notre site de vente en ligne</h1>
                    <p>Découvrez nos produits de qualité, conçus pour répondre à vos besoins.</p>
                    <button className="btn btn-primary">Explorer</button>
                </div>
            </div>

            {/* section service */}

            <section className="section services">
                <div className="container">
                    <div className="section-title">
                        <h3>🔧 Nos Services</h3>
                        <p>Nous offrons une gamme de services pour améliorer votre expérience d'achat.</p>
                    </div>

                    {/* service */}
                    <Service/>

                </div>
            </section>

            {/* section produit */}
                <Produit/>

            {/* Avis */}
            <Avis/>

            {/* Carte */}
            <Map/>

            {/* Footer */}
            <Footer/>
        </div>

        
    );
}