import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Style/common/navbar.css'; 
import logo from '../assets/images/logo.png';
import { IoMdSearch } from "react-icons/io";

const Topmenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalogue?search=${searchTerm.trim()}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} className="me-2 logo" alt="Logo" />
          </NavLink>

            {/* Recherche visible sur mobile seulement */}
          <form
            onSubmit={handleSearch}
            className="d-lg-none mx-auto rounded-pill"
            style={{ maxWidth: '60%' }}
            id='phone_form'
          >
            <input
              type="text"
              className=""
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="rounded-pill" type="submit">
              <IoMdSearch />
            </button>
          </form>


          {/* Champ de recherche pc*/}
          <form onSubmit={handleSearch} className="d-flex ms-3 " id='pc_form'>
            <input
              type="text"
              className="rounded-pill"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: '100%' }}
            />
            <button className="rounded-pill ms-2" type="submit">
              <IoMdSearch />
            </button>
          </form>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <NavLink to="/accueil" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id='lk'>
                Accueil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/catalogue" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id='lk'>
                Catalogue
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/panier" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id='lk'>
                Panier
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/commande" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id='lk'>
                Commande
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact_utilisateur" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id='lk'>
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <button className="btn-connexion ms-lg-3" onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topmenu;
