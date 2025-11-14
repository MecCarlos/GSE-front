import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './auth.css';
import logo from '../../assets/images/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import { FaArrowLeftLong } from "react-icons/fa6";

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('root@gmail.com');
    const [password, setPassword] = useState('Mac-os02');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');

    const params = new URLSearchParams(location.search);
    const redirectPath = params.get("redirect") || "/accueil";

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (res.ok) {
                login(data.token, data.role, data.user);
                
                if (data.role === "admin") {
                    navigate("/admin-accueil", { replace: true });
                } else {
                    navigate(redirectPath, { replace: true });
                }

                setMessage('Connexion réussie !');
                setMessageType('success');
            }

        } catch (err) {
            console.error(err);
            setMessage('Une erreur est survenue.');
            setMessageType('danger');
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="log_page">
            <img src={logo} alt="Logo" className="logo" />
            
            <div className="auth-container">
                <h3 className='mb-3'>Connexion</h3>
                {message && (
                    <div className={`alert alert-${messageType}`} role="alert">
                        {message}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <label htmlFor="name">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="password-input">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className="register-link mt-1 text-end">
                        <p>
                            <Link to="/register" className="text-link">
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
                <p className='noaccount'>
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