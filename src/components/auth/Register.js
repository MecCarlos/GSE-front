import React, { useState, useEffect } from "react";
import "./auth.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FaArrowLeftLong } from "react-icons/fa6";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Fonction de force du mot de passe
  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Faible";
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/))
      return "Fort";
    return "Moyen";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
    if (name === "confirmPassword") {
      setPasswordMatch(value === formData.password);
    }
    if (name === "password") {
      setPasswordMatch(formData.confirmPassword === value);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      setMessage("Les mots de passe ne correspondent pas.");
      setMessageType("danger");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/register", {
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
        setMessage("Inscription réussie !");
        setMessageType("success");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Erreur lors de l’inscription.");
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
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formData.password && (
            <small>
              Force du mot de passe :{" "}
              <span
                style={{
                  color:
                    passwordStrength === "Fort"
                      ? "green"
                      : passwordStrength === "Moyen"
                      ? "orange"
                      : "red",
                }}
              >
                {passwordStrength}
              </span>
            </small>
          )}

          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Répéter le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <small style={{ color: "red" }}>
              Les mots de passe ne correspondent pas.
            </small>
          )}

          <button type="submit">S'inscrire</button>
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
    </div>
  );
};
export default Register;
