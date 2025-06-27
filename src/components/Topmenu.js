import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Style/common/navbar.css'; 
import logo from '../assets/images/logo.png';

const Topmenu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} className="me-2 logo" alt="logo" />
        </NavLink>

        

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id='lk' to="/">Accueil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id='lk' to="/produits">Catalogue</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id='lk' to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} id='lk' to="/apropos">À propos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn-connexion ms-lg-3" to="/Login">Connexion</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Topmenu;
