import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';
import logo from '../../assets/images/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('lana@gmail.com');
    const [password, setPassword] = useState('Mac-os02');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('');

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
                login(data.token, data.role); // met à jour le contexte ET le localStorage
                navigate(data.role === 'admin' ? '/admin-accueil' : '/accueil');
                setMessage('Connexion réussie !');
                setMessageType('success');}
            else {
                setMessage(data.message || 'Erreur de connexion');
                setMessageType('danger');
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
                <button type="submit">Se connecter</button>
            </form>

        </div>

            <div className="register-link mt-3 text-center">
            <p>
                Pas de compte ?{" "}
                <Link to="/register" className="text-link">
                Créer un compte
                </Link>
            </p>
            </div>

        </div>
    );
};
export default Login;
