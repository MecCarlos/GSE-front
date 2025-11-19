import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAuth } from "../AuthContext";
import { useCart } from "../Context/CartContext";
import SearchOverlay from "./SearchOverlay"; 
import "../Style/common/navbar.css";
import { API_URL } from '../config';
import { LuMessageCircleMore } from "react-icons/lu";

const AdminNavbar = () => { 
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [products, setProducts] = useState([]);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

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

  // Récupérer le nombre de messages non lus
  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Utiliser la nouvelle route dédiée
        const response = await fetch(`${API_URL}/admin/contacts/unread-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUnreadMessagesCount(data.count || 0);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des messages non lus:", error);
      }
    };

    fetchUnreadMessagesCount();

    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(fetchUnreadMessagesCount, 30000);

    return () => clearInterval(interval);
  }, []);

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

  const handleMessagesClick = () => {
    navigate("/admin-messages");
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

            {/* Messages avec badge */}
            <button
              className="circle-btn"
              onClick={handleMessagesClick}
              style={{ position: 'relative' }}
            >
              <LuMessageCircleMore size={20} />
              {unreadMessagesCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '1px',
                    right: '2px',
                    background: '#ef4444',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    fontSize: '0.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    border: '2px solid white'
                  }}
                >
                  {unreadMessagesCount > 99 ? '99+' : unreadMessagesCount}
                </span>
              )}
            </button>
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
          </ul>

          {/* Modal utilisateur */}
          {isConnected && showModal && (
            <div className="user_modal">
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