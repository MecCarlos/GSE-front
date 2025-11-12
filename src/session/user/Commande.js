import React, { useState } from "react";
import { useCart } from "../../Context/CartContext.js";
import { useAuth } from "../../AuthContext";
import "../../Style/user/commande.css";
import pvide from "../../assets/gifs/pvide.gif";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaTruck, FaCheckCircle, FaLock, FaMapMarkerAlt, FaCity, FaEnvelope } from "react-icons/fa";

const Commande = () => {
  const { cart, total, clearCart } = useCart();
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    adresse: "",
    ville: "",
    codePostal: "",
    telephone: "",
    notes: ""
  });

  const [paiement, setPaiement] = useState("paypal");
  const [cardData, setCardData] = useState({
    numero: "",
    date: "",
    cvc: "",
    nom: ""
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData({ ...cardData, numero: formatted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!auth.user) {
      setMessage("Vous devez être connecté pour passer une commande.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.adresse || !formData.ville || !formData.codePostal || !formData.telephone) {
      setMessage("Veuillez compléter tous les champs obligatoires.");
      setIsSubmitting(false);
      return;
    }

    if (paiement === "carte" && (!cardData.numero || !cardData.date || !cardData.cvc || !cardData.nom)) {
      setMessage("Veuillez remplir toutes les informations de carte.");
      setIsSubmitting(false);
      return;
    }

    const commande = {
      userId: auth.user.id,
      adresseLivraison: formData,
      paiement,
      cardData: paiement === "carte" ? cardData : null,
      items: cart.map((it) => ({
        productId: it.productId,
        nom: it.nom,
        options: JSON.parse(it.variantKey || "{}"),
        quantite: it.quantite,
        prix: it.prix,
        image: it.image
      })),
      total,
    };

    try {
      const res = await fetch("http://localhost:3001/api/commande/create", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify(commande),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        setFormData({
          adresse: "",
          ville: "",
          codePostal: "",
          telephone: "",
          notes: ""
        });
        setPaiement("paypal");
        setCardData({ numero: "", date: "", cvc: "", nom: "" });
        setSuccess(true);
        setMessage("");
      } else {
        setMessage(data.message || "Erreur lors de la commande");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur de communication avec le serveur");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantite, 0);
  };

  if (!auth.user) return <p>Chargement de l'utilisateur...</p>;

  return (
    <div className="home_page">
      <div className="home_content commande_page">
        <header className="commande_header">
          <div className="header_content">
            <h1>Finaliser votre commande</h1>
            <p>Dernière étape avant de recevoir vos articles</p>
          </div>
        </header>

        <div className="commande-container">
          {cart.length === 0 ? (
            <div className="empty-commande">
              <div className="empty-illustration">
                <img className="panier_vide" src={pvide} alt="Panier vide" />
              </div>
              <div className="empty-content">
                <h2>Votre panier est vide</h2>
                <p>Ajoutez des articles avant de passer commande</p>
                <NavLink to="/catalogue" className="btn btn-primary">
                  Découvrir nos produits
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="commande-layout">
              {/* Colonne de gauche - Formulaire */}
              <div className="commande-form-section">
                <div className="form-section">
                  <h3 className="section-title">
                    <FaMapMarkerAlt className="me-2" />
                    Adresse de livraison
                  </h3>
                  <form onSubmit={handleSubmit}>
                    {message && (
                      <div className="message error">
                        {message}
                      </div>
                    )}

                    <div className="form-grid">
                      <div className="form-group">
                        <label>Adresse complète *</label>
                        <div className="input-with-icon">
                          <FaMapMarkerAlt />
                          <input
                            type="text"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleInputChange}
                            placeholder="Numéro, rue, appartement..."
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Ville *</label>
                        <div className="input-with-icon">
                          <FaCity />
                          <input
                            type="text"
                            name="ville"
                            value={formData.ville}
                            onChange={handleInputChange}
                            placeholder="Votre ville"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Code postal *</label>
                        <input
                          type="text"
                          name="codePostal"
                          value={formData.codePostal}
                          onChange={handleInputChange}
                          placeholder="00000"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Téléphone *</label>
                        <input
                          type="tel"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleInputChange}
                          placeholder="+229 XX XX XX XX"
                          required
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Notes de livraison (optionnel)</label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Instructions spéciales pour le livreur..."
                          rows="3"
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <h3 className="section-title">
                        <FaLock className="me-2" />
                        Méthode de paiement
                      </h3>
                      
                      <div className="payment-methods">
                        <div className="payment-option">
                          <input
                            type="radio"
                            id="paypal"
                            name="paiement"
                            value="paypal"
                            checked={paiement === "paypal"}
                            onChange={(e) => setPaiement(e.target.value)}
                          />
                          <label htmlFor="paypal">
                            <FaPaypal className="payment-icon" />
                            <span>PayPal</span>
                            <small>Paiement sécurisé via PayPal</small>
                          </label>
                        </div>

                        <div className="payment-option">
                          <input
                            type="radio"
                            id="espece"
                            name="paiement"
                            value="espece"
                            checked={paiement === "espece"}
                            onChange={(e) => setPaiement(e.target.value)}
                          />
                          <label htmlFor="espece">
                            <FaMoneyBillWave className="payment-icon" />
                            <span>Espèces à la livraison</span>
                            <small>Payez lorsque vous recevez votre commande</small>
                          </label>
                        </div>

                        <div className="payment-option">
                          <input
                            type="radio"
                            id="carte"
                            name="paiement"
                            value="carte"
                            checked={paiement === "carte"}
                            onChange={(e) => setPaiement(e.target.value)}
                          />
                          <label htmlFor="carte">
                            <FaCreditCard className="payment-icon" />
                            <span>Carte bancaire</span>
                            <small>Paiement sécurisé en ligne</small>
                          </label>
                        </div>
                      </div>

                      {paiement === "carte" && (
                        <div className="card-form">
                          <div className="form-grid">
                            <div className="form-group full-width">
                              <label>Nom sur la carte *</label>
                              <input
                                type="text"
                                name="nom"
                                value={cardData.nom}
                                onChange={handleCardChange}
                                placeholder="JEAN DUPONT"
                                required
                              />
                            </div>

                            <div className="form-group full-width">
                              <label>Numéro de carte *</label>
                              <input
                                type="text"
                                name="numero"
                                value={cardData.numero}
                                onChange={handleCardNumberChange}
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label>Date d'expiration *</label>
                              <input
                                type="text"
                                name="date"
                                placeholder="MM/AA"
                                value={cardData.date}
                                onChange={handleCardChange}
                                maxLength="5"
                                required
                              />
                            </div>

                            <div className="form-group">
                              <label>CVC *</label>
                              <input
                                type="text"
                                name="cvc"
                                placeholder="123"
                                value={cardData.cvc}
                                onChange={handleCardChange}
                                maxLength="3"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="security-notice">
                            <FaLock className="me-2" />
                            <span>Paiement 100% sécurisé - Vos données sont cryptées</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      className={`btn-commande ${isSubmitting ? 'submitting' : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          Traitement en cours...
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="me-2" />
                          Confirmer la commande • {total} FCFA
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Colonne de droite - Récapitulatif */}
              <div className="commande-summary">
                <div className="summary-card">
                  <h3 className="summary-title">Récapitulatif</h3>
                  
                  <div className="order-items">
                    {cart.map((it, idx) => (
                      <div key={idx} className="order-item">
                        <div className="item-image">
                          <img
                            src={`http://localhost:3001/uploads/${it.image || "default.png"}`}
                            alt={it.nom}
                          />
                        </div>
                        <div className="item-details">
                          <h4>{it.nom}</h4>
                          <p className="item-variant">
                            {Object.values(JSON.parse(it.variantKey || "{}") || {}).join(" / ")}
                          </p>
                          <div className="item-meta">
                            <span className="item-quantity">{it.quantite} ×</span>
                            <span className="item-price">{it.prix} FCFA</span>
                          </div>
                        </div>
                        <div className="item-total">
                          {it.quantite * it.prix} FCFA
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="summary-totals">
                    <div className="total-row">
                      <span>Sous-total ({getTotalItems()} article{getTotalItems() > 1 ? 's' : ''})</span>
                      <span>{total} FCFA</span>
                    </div>
                    <div className="total-row">
                      <span>Livraison</span>
                      <span className="free">Gratuite</span>
                    </div>
                    <div className="total-divider"></div>
                    <div className="total-row final">
                      <span>Total</span>
                      <span className="total-amount">{total} FCFA</span>
                    </div>
                  </div>

                  <div className="delivery-info">
                    <FaTruck className="me-2" />
                    <span>Livraison estimée : 2-4 jours ouvrés</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Overlay succès */}
      {success && (
        <div className="commande-success-overlay">
          <div className="commande-success-modal">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h2>Commande confirmée !</h2>
            <p>Votre commande a été passée avec succès et sera traitée rapidement.</p>
            <p className="success-details">
              Numéro de commande: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <div className="success-actions">
              <NavLink to="/MyCommande" className="btn btn-primary">
                Voir mes commandes
              </NavLink>
              <NavLink to="/catalogue" className="btn btn-secondary">
                Continuer mes achats
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Commande;