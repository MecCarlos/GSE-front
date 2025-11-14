import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone, FaTiktok, FaSnapchat } from "react-icons/fa";
import { PiTiktokLogoLight } from "react-icons/pi";
import "../Style/common/footer.css";
import { BsSnapchat } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="text-light pt-5 pb-3">
      <div className="container-fluid">
        <div className="row">
 
          {/* À propos */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">À propos de nous</h5>
            <p>
              Boutique en ligne spécialisée en produits électroniques et accessoires. Nous mettons la qualité au cœur de nos services.
            </p>
          </div>

          {/* Liens utiles */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Navigation</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Accueil</Link></li>
              <li><Link to="/Catalogue" className="text-light text-decoration-none">Produits</Link></li>
              <li><Link to="/panier" className="text-light text-decoration-none">Panier</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
              <li><Link to="/apropos" className="text-light text-decoration-none">A propos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Contact</h5>
            <p><FaMapMarkerAlt className="me-2" />Pahoun, Bénin</p>
            <p><FaEnvelope className="me-2" />olatechcorrporations@gmail.com</p>
            <p><FaPhone className="me-2" />+229 01 49 30 65 16</p>
 
            <div className="mt-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-light me-3"><FaInstagram size={20} /></a>
              <a href="https://wa.me/+2290149306516" target="_blank" rel="noreferrer" className="text-light  me-3"><FaWhatsapp size={20} /></a>
              <a href="https://www.tiktok.com/@olatechcorporations20" target="_blank" rel="noreferrer" className="text-light  me-3"><PiTiktokLogoLight size={20} /></a>
              <a href="https://www.snapchat.com/add/g-ldas29?share_id=I8njbTHM_Mc&locale=fr-BJ" target="_blank" rel="noreferrer" className="text-light  me-3"><BsSnapchat size={20} /></a>
            </div>
          </div>
        </div>

        <hr className="border-light" />

        {/* Copyright */}
        <div className="text-center">
          <small>&copy; {new Date().getFullYear()} Olatetch Corporation - Tous droits réservés.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
