import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import "../Style/common/footer.css";

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
              <li><Link to="/produits" className="text-light text-decoration-none">Produits</Link></li>
              <li><Link to="/panier" className="text-light text-decoration-none">Panier</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Contact</h5>
            <p><FaMapMarkerAlt className="me-2" /> Pahoun, Bénin</p>
            <p><FaEnvelope className="me-2" /> contact@boutique.com</p>
            <p><FaPhone className="me-2" /> +229 90 00 00 00</p>

            <div className="mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-light me-3"><FaFacebook size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-light me-3"><FaInstagram size={20} /></a>
              <a href="https://wa.me/22990000000" target="_blank" rel="noreferrer" className="text-light"><FaWhatsapp size={20} /></a>
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
