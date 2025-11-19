import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./auth.css";
import logo from "../../assets/images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { API_URL } from '../../config';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");

  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/accueil";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Réinitialiser le message

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json(); 

      if (res.ok) {
        // Succès
        login(data.token, data.role, data.user);

        if (data.role === "admin") {
          navigate("/admin-accueil", { replace: true });
        } else {
          navigate(redirectPath, { replace: true });
        }

        setMessage("Connexion réussie !");
        setMessageType("success");
      } else {
        // Erreur du serveur (401, 404, etc.)
        setMessage(data.message || "Une erreur est survenue");
        setMessageType("danger");
      }
    } catch (err) {
      console.error("Erreur réseau:", err);
      setMessage("Erreur de connexion au serveur");
      setMessageType("danger");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000); // 5 secondes pour lire le message
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="log_page">
      <img src={logo} alt="Logo" className="logo" />

      <div className="auth-container">
        <h3 className="mb-3">Connexion</h3>
        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div> 
        )}

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
          />

          <div className="password-input">
            <label htmlFor="password">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              tabIndex={0}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="register-link mt-1 text-end">
            <p>
              <Link to="/forgot-password" className="text-link">
                Mot de passe oublié ?
              </Link>
            </p>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>

      <div className="register-link mt-3 text-center">
        <p className="noaccount">
          Pas de compte ?{" "}
          <Link to="/register" className="text-link">
            Créer un compte
          </Link>
        </p>
      </div>

      {/* Bouton de retour en haut à gauche */}
      <div className="back-button-container">
        <Link to="/">
          <FaArrowLeftLong className="login-back-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Login;