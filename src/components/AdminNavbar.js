import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiCartAlt } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAuth } from "../AuthContext";
import { useCart } from "../Context/CartContext";
import SearchOverlay from "./SearchOverlay"; 
import "../Style/common/navbar.css";
import { API_URL } from '../../config';



const AdminNavbar = () => { 
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [products, setProducts] = useState([]); // Pour stocker les produits

  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const { cart, clearCart } = useCart();
  const isConnected = !!auth.token;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Charger les produits pour la recherche
  useEffect(() => {
    if (showSearchOverlay) {
      fetch(`${API_URL}/adm/rec/produits`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => console.error("Erreur chargement produits:", err));
    }
  }, [showSearchOverlay]);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/", { replace: true });
    setShowModal(false);
  };

  const handleSearchClick = () => {
    setShowSearchOverlay(true);
  };

  const handleCloseSearch = () => {
    setShowSearchOverlay(false);
  };

  return (
    <>
      <nav className={`Top_user navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          {/* Boutons à gauche */}
          <div className="s-btn-left">
            <button className="circle-btn" onClick={handleSearchClick}>
              <IoSearch />
            </button>

            {isConnected ? (
              <button className="circle-btn" onClick={() => setShowModal(!showModal)}>
                <FaRegUserCircle />
              </button>
            ) : (
              <NavLink className="circle-btn" to="/login"><FaRegUserCircle /></NavLink>
            )}
          </div>

          {/* Hamburger pour mobile */}
          <button className="hamburger d-lg-none" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Menu droite */}
          <ul className={`menu-right ${menuOpen ? "open" : ""}`}>
            <li><NavLink to="/admin-accueil" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Accueil</NavLink></li>
            <li><NavLink to="/admin-catalogue" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Catalogue</NavLink></li>
            <li>
              {isConnected ? 
                <NavLink to="/admin-commande" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Commande</NavLink> :
                <NavLink to="/login" className="nav-link">Commande</NavLink>
              }
            </li>
            {/* <li><NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink></li> */}
            {/* <li><NavLink to="/apropos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>À propos</NavLink></li> */}
          </ul>

          {/* Modal utilisateur */}
          {isConnected && showModal && (
            <div className="user_modal">
              {/* <NavLink className="profil" to="#"><FaRegUserCircle /> Profil</NavLink> */}
              <button className="dec" onClick={handleLogout}><RiLogoutCircleRLine /> Déconnexion</button>
            </div>
          )}
        </div>
      </nav>

      {/* Overlay de recherche */}
      <SearchOverlay 
        isOpen={showSearchOverlay}
        onClose={handleCloseSearch}
        products={products}
      />
    </>
  );
};

export default AdminNavbar;