import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Style/common/navbar.css";
import logo from "../assets/images/logo.png";
import { BiCartAlt } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAuth } from "../AuthContext";

const AdminNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Déconnexion
  const handleLogout = () => {
    logout(); // nettoie le contexte + localStorage
    setShowModal(false); // ferme le menu user
    navigate("/", { replace: true }); // redirige vers login/accueil
  };

  return (
    <nav
      className={`Top_user navbar navbar-expand-lg navbar-light fixed-top ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="container">
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
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/admin-accueil"
              >
                Accueil
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/admin-catalogue"
              >
                Catalogue
              </NavLink>
            </li>
            <li className="nav-item mx-3">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/admin-commande"
              >
                Commande
              </NavLink>
            </li>
          </ul>

          {/* Icônes et bouton user */}
          <div className="d-flex align-items-center s-btn">
            <NavLink className="btn-icn me-2" to="#">
              <IoSearch />
            </NavLink>
            <NavLink className="btn-icn me-2" to="#">
              <BiCartAlt />
            </NavLink>

            {/* Icône User qui ouvre le menu */}
            <button
              className="btn s-btn connexion"
              onClick={() => setShowModal(!showModal)}
            >
              <FaRegUserCircle />
            </button>
          </div>
        </div>

        {/* Menu User */}
        {showModal && (
          <div
            className="user_modal"
            style={{
              borderRadius: "10px",
              backgroundColor: "whitesmoke",
              position: "absolute",
              top: "70px",
              right: "20px",
              padding: "10px 15px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            <NavLink className="profil d-block mb-2" style={{ color: "navy" }} to="#">
              <FaRegUserCircle /> Profil
            </NavLink>
            <button className="dec text-danger w-100" onClick={handleLogout}>
              <RiLogoutCircleRLine /> Déconnexion
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
