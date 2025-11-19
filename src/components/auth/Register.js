import React, { useState, useEffect } from "react";
import "./auth.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import { API_URL } from '../../config';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Fonction améliorée de force du mot de passe
  const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    // Longueur minimale
    if (password.length >= 8) score += 1;
    
    // Contient des minuscules
    if (/[a-z]/.test(password)) score += 1;
    
    // Contient des majuscules
    if (/[A-Z]/.test(password)) score += 1;
    
    // Contient des chiffres
    if (/[0-9]/.test(password)) score += 1;
    
    // Contient des caractères spéciaux
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
    
    // Bonus pour longueur supérieure
    if (password.length >= 12) score += 1;

    setPasswordScore(score);

    // Détermination du niveau de force
    if (score >= 5) return { strength: "Très fort", color: "#10b981" };
    if (score >= 4) return { strength: "Fort", color: "#3b82f6" };
    if (score >= 3) return { strength: "Moyen", color: "#f59e0b" };
    if (score >= 2) return { strength: "Faible", color: "#ef4444" };
    return { strength: "Très faible", color: "#dc2626" };
  };

  // Fonction pour obtenir les conseils de mot de passe
  const getPasswordTips = (password) => {
    const tips = [];
    
    if (password.length < 8) {
      tips.push("Au moins 8 caractères");
    }
    if (!/[A-Z]/.test(password)) {
      tips.push("Une majuscule");
    }
    if (!/[a-z]/.test(password)) {
      tips.push("Une minuscule");
    }
    if (!/[0-9]/.test(password)) {
      tips.push("Un chiffre");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      tips.push("Un caractère spécial");
    }
    
    return tips;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (name === "password") {
      const strengthInfo = checkPasswordStrength(value);
      setPasswordStrength(strengthInfo);
    }
    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
    if (name === "password") {
      setPasswordMatch(formData.confirmPassword === value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      setMessage("Les mots de passe ne correspondent pas.");
      setMessageType("danger");
      return;
    }

    // Vérification de la force du mot de passe
    if (passwordScore < 3) {
      setMessage("Le mot de passe est trop faible. Veuillez renforcer votre mot de passe.");
      setMessageType("danger");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Inscription réussie ! Redirection...");
        setMessageType("success");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Erreur lors de l'inscription.");
        setMessageType("danger");
      }
    } catch (err) {
      console.error(err);
      setMessage("Une erreur est survenue.");
      setMessageType("danger");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const passwordTips = getPasswordTips(formData.password);

  return (
    <div className="log_page">
      <img src={logo} alt="Logo" className="logo" />
      <div className="auth-container">
        <h3 className="mb-3">Inscription</h3>

        {message && (
          <div className={`alert alert-${messageType}`} role="alert">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <label htmlFor="name">Nom complet</label>
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
          />

          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-input">
            <label htmlFor="password">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          {formData.password && (
            <div className="password-strength-container">
              <div className="password-strength-info">
                <span>Force : </span>
                <span style={{ color: passwordStrength.color, fontWeight: "bold" }}>
                  {passwordStrength.strength}
                </span>
              </div>
              <div className="password-strength-bar">
                <div 
                  className="password-strength-progress"
                  style={{
                    width: `${(passwordScore / 6) * 100}%`,
                    backgroundColor: passwordStrength.color
                  }}
                ></div>
              </div>
              
              {passwordTips.length > 0 && (
                <div className="password-tips">
                  <small>Conseils pour renforcer votre mot de passe :</small>
                  <ul>
                    {passwordTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="password-input">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Répéter le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          {!passwordMatch && formData.confirmPassword && (
            <div className="password-match-error">
              <small style={{ color: "red" }}>
                ❌ Les mots de passe ne correspondent pas.
              </small>
            </div>
          )}
          
          {passwordMatch && formData.confirmPassword && formData.password && (
            <div className="password-match-success">
              <small style={{ color: "green" }}>
                ✅ Les mots de passe correspondent.
              </small>
            </div>
          )}

          <button 
            type="submit" 
            className={passwordScore < 3 ? "submit-btn-disabled" : ""}
            disabled={passwordScore < 3}
          >
            S'inscrire
          </button>
        </form>
      </div>
      <div className="register-link mt-3 text-center">
        <p className="noaccount">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-link">
            Connectez-vous
          </Link>
        </p>

        <Link to="/">
          <FaArrowLeftLong className="login-back-icon" />
        </Link>
      </div>

      {/* CSS intégré pour les nouveaux styles */}
      <style jsx>{`
        .password-strength-container {
          margin-top: 8px;
          margin-bottom: 16px;
        }

        .password-strength-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
          font-size: 0.85rem;
        }

        .password-strength-bar {
          width: 100%;
          height: 6px;
          background-color: #e0e0e0;
          border-radius: 3px;
          overflow: hidden;
        }

        .password-strength-progress {
          height: 100%;
          transition: all 0.3s ease;
          border-radius: 3px;
        }

        .password-tips {
          margin-top: 8px;
          padding: 8px;
          background: #f8f9fa;
          border-radius: 4px;
          border-left: 3px solid #6c757d;
        }

        .password-tips small {
          color: #6c757d;
          font-weight: 500;
        }

        .password-tips ul {
          margin: 5px 0 0 0;
          padding-left: 20px;
          color: #6c757d;
        }

        .password-tips li {
          font-size: 0.8rem;
          margin-bottom: 2px;
        }

        .password-match-error,
        .password-match-success {
          margin-top: 5px;
          margin-bottom: 15px;
        }

        .submit-btn-disabled {
          opacity: 0.6;
          cursor: not-allowed !important;
        }

        .submit-btn-disabled:hover {
          transform: none !important;
          background-color: navy !important;
        }
      `}</style>
    </div>
  );
};

export default Register;