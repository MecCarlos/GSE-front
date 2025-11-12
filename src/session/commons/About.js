import { AboutComp } from "../../components/AboutComp";
import Footer from "../../components/Footer";
import "../../Style/common/contact.css";
import { useState } from "react";

export const About = () => { 


  return (
    <div className="home_page">
      <div className="home_content contact_page">
        {/* <header className="about_header">
          <h1>À Propos de Nous</h1>
          <p>
            Découvrez notre histoire, nos valeurs et l'équipe qui se cache derrière nos succès.
          </p>
      </header> */}

        <AboutComp/>
        
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
