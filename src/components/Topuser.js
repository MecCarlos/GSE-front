import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Style/common/navbar.css";
import logo from "../assets/images/logo.png";
import { BiCartAlt } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";

// 👉 Import du CartContext
import { useCart } from "../Context/CartContext.js";

const Topuser = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // ✅ Récupération du panier
  const { cart } = useCart();

  //  Détection du scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //  Fonction déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className={`Top_user navbar navbar-expand-lg navbar-light fixed-top ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          {/* Logo */}
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} className="me-2 logo" alt="logo" />
          </NavLink>

          {/* Toggle mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Liens */}
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/">Accueil</NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/catalogue">Catalogue</NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/login">Commande</NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/contact">Contact</NavLink>
              </li>
              <li className="nav-item mx-3">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/apropos">À propos</NavLink>
              </li>
            </ul> 

            {/* Icônes et bouton user */}
            <div className="d-flex align-items-center s-btn">
              <NavLink className="btn-icn me-2" to="#"><IoSearch /></NavLink>

              

              {/*  Icône User qui ouvre le modal */}
              <button className="btn s-btn connexion" onClick={() => setShowModal(!showModal)}>
                <FaRegUserCircle />
              </button>

              {/*  Panier avec compteur */}
              <NavLink className="btn-icn me-2 position-relative" to="/panier">
                <BiCartAlt />
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </NavLink>
            </div>
          </div>

          {/*  Modal Déconnexion */}
          {showModal && (
            <div className="user_modal " style={{borderRadius: '10px', backgroundColor: 'whitesmoke'}}>
              <NavLink className="profil" style={{color : "navy"}} to="#"><FaRegUserCircle /> Profil</NavLink>
              <button className="dec text-danger " onClick={handleLogout}> 
                <RiLogoutCircleRLine /> Déconnexion
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Topuser;
