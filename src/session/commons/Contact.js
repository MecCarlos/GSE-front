import React from "react";
import Topmenu from "../../components/Topmenu";
import "../../Style/common/home.css";
import Map from "../../components/Map";
import Footer from "../../components/Footer";
import "../../Style/common/contact.css"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const Contact = () => {
  return (
    <div className="home_page">
        <Topmenu />
        {/* </> */}
      <Map />
      <Footer />
    </div>
  );
};
