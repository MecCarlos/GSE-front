import { AboutComp } from "../../components/AboutComp";
import Footer from "../../components/Footer";
import "../../Style/common/contact.css";
import { useState } from "react";

export const About = () => { 


  return (
    <div className="home_page">
      <div className="home_content contact_page">

        <AboutComp/>
        
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
