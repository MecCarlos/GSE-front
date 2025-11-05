import React, { useState } from "react";
import { useCart } from "../../Context/CartContext.js";
import { useAuth } from "../../AuthContext";
import "../../Style/user/commande.css";
import pvide from "../../assets/gifs/pvide.gif";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";

const Commande = () => {
  const { cart, total, clearCart } = useCart();
  const { auth } = useAuth(); // contient token, role, user

  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [paiement, setPaiement] = useState("paypal");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false); 

  // Données carte bancaire
  const [cardData, setCardData] = useState({
    numero: "",
    date: "",
    cvc: "",
  });

  const handleCardChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user) {
      setMessage("Vous devez être connecté pour passer une commande.");
      return;
    }

    if (!adresse || !ville || !codePostal) {
      setMessage("Veuillez compléter tous les champs de livraison.");
      return;
    }

    if (paiement === "carte" && (!cardData.numero || !cardData.date || !cardData.cvc)) {
      setMessage("Veuillez remplir toutes les informations de carte.");
      return;
    }

    const commande = {
      userId: auth.user.id,
      adresseLivraison: { adresse, ville, codePostal },
      paiement,
      cardData: paiement === "carte" ? cardData : null,
      items: cart.map((it) => ({
        productId: it.productId,
        nom: it.nom,
        options: JSON.parse(it.variantKey || "{}"),
        quantite: it.quantite,
        prix: it.prix,
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
        setAdresse("");
        setVille("");
        setCodePostal("");
        setPaiement("paypal");
        setCardData({ numero: "", date: "", cvc: "" });
        setSuccess(true);
        setMessage("");
      } else {
        setMessage(data.message || "Erreur lors de la commande");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur de communication avec le serveur");
    }
  };

  if (!auth.user) return <p>Chargement de l'utilisateur...</p>;

  return (
    <div className="home_page">
      <div className="home_content commande_page">
        <header >
          <h1>Commande</h1>
        </header>

        <div className="commande-container">
          {cart.length === 0 ? (
            <div className="img_box">
              <img className="panier_vide" src={pvide}/>
            </div>
            ) : (
            <div className="commande-part">
              {/* Récapitulatif du panier */}
              <div className="commande-cart">
                <h4>Récapitulatif du panier</h4>
                {cart.map((it, idx) => (
                  <div key={idx} className="cart-item">
                    <img
                      src={`http://localhost:3001/uploads/${it.image || "default.png"}`}
                      alt={it.nom}
                      className="cart-img"
                    />
                    <div className="cart-info">
                      <strong>{it.nom}</strong>
                      <div className="variant">
                        {Object.values(JSON.parse(it.variantKey || "{}") || {}).join(" / ")}
                      </div>
                      <div className="price">
                        {it.quantite} × {it.prix} FCFA
                      </div>
                    </div>
                  </div>
                ))}
                <h3>Total : <span className="text-primary">{total}</span> FCFA</h3>
              </div>

              {/* Formulaire commande */}
              <div className="commande-form">
                <h3>Adresse de livraison</h3>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Adresse</label>
                    <input
                      type="text"
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Ville</label>
                    <input
                      type="text"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Code postal</label>
                    <input
                      type="text"
                      value={codePostal}
                      onChange={(e) => setCodePostal(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Paiement</label>
                    <select value={paiement} onChange={(e) => setPaiement(e.target.value)}>
                      <option value="paypal">PayPal</option>
                      <option value="espece">Espèce à la livraison</option>
                      <option value="carte">Carte bancaire</option>
                    </select>
                  </div>

                  {paiement === "carte" && (
                    <div className="card-info">
                      <div>
                        <label>Numéro de carte</label>
                        <input
                          type="text"
                          name="numero"
                          value={cardData.numero}
                          onChange={handleCardChange}
                          required
                        />
                      </div>
                      <div>
                        <label>Date d'expiration</label>
                        <input
                          type="text"
                          name="date"
                          placeholder="MM/AA"
                          value={cardData.date}
                          onChange={handleCardChange}
                          required
                        />
                      </div>
                      <div>
                        <label>CVC</label>
                        <input
                          type="text"
                          name="cvc"
                          value={cardData.cvc}
                          onChange={handleCardChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <button type="submit" className="btn-commande">
                    Valider la commande
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Overlay succès */}
      {success && (
        <div className="commande-success-overlay">
          <div className="commande-success-message">
            <p>Votre commande a été passée avec succès !</p>
            <p>Elle sera bientôt livrée. Vous pouvez consulter son état dans le menu "Commandes".</p>
            <NavLink onClick={() => setSuccess(false)} to="/MyCommande">OK</NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Commande;
