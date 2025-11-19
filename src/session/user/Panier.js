import React from "react";
import { useCart } from "../../Context/CartContext.js";
import "../../Style/user/panier.css";
import PageHeader from "../../components/Header";

import Footer from "../../components/Footer";
import pvide from "../../assets/gifs/pvide.gif";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowLeft,
  FaCreditCard,
} from "react-icons/fa";

const Panier = () => {
  const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleCommander = () => {
    if (auth.token) {
      navigate("/Commande");
    } else {
      navigate("/login?redirect=/Commande");
    }
  };

  const handleContinueShopping = () => {
    navigate("/catalogue");
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantite, 0);
  };

  return (
    <div className="home_page">
      <div className="home_content _page">
        {/* <header className="_header">
          <div className="_content">
            <h1>Mon Panier</h1>
            <p>{getTotalItems()} article{getTotalItems() > 1 ? 's' : ''} dans votre panier</p>
          </div>
          </header> */}

        <PageHeader
          title="Mon Panier"
          description="Découvrer le contenu de votre panier"
          background="primary pattern"
        />
      </div>

      <div className="cart-container">
        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart_illustration">
              <img className="panier_vide" src={pvide} alt="Panier vide" />
            </div>
            <div className="empty-cart_content">
              <h2>Votre panier est vide</h2>
              <p>Découvrez nos produits et ajoutez vos articles préférés</p>
              <button
                className="btn btn-primary"
                onClick={handleContinueShopping}
              >
                <FaShoppingBag className="me-2" />
                Découvrir nos produits
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((it, idx) => (
                <div key={idx} className="cart-item">
                  <div className="cart-item_image">
                    <img
                      src={`http://localhost:3001/uploads/${
                        it.image || "default.png"
                      }`}
                      alt={it.nom}
                      className="cart-img"
                    />
                  </div>

                  <div className="cart-item_info">
                    <div className="cart-item_header">
                      <h3 className="cart-item_title">{it.nom}</h3>
                      <button
                        className="cart-item_remove"
                        onClick={() =>
                          removeFromCart(it.productId, it.variantKey)
                        }
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="cart-item_variant">
                      {Object.values(
                        JSON.parse(it.variantKey || "{}") || {}
                      ).join(" / ")}
                    </div>

                    <div className="cart-item_price">
                      <span className="price-unit">{it.prix_promo} FCFA</span>
                      <span className="price-total">
                        {it.quantite + " × " + it.prix} FCFA
                      </span>
                    </div>

                    <div className="cart-item_actions">
                      <div className="qty-control">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(
                              it.productId,
                              it.variantKey,
                              Math.max(1, it.quantite - 1)
                            )
                          }
                        >
                          <FaMinus />
                        </button>
                        <span className="qty-value">{it.quantite}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(
                              it.productId,
                              it.variantKey,
                              it.quantite + 1
                            )
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3 className="summary-title">Récapitulatif</h3>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>
                      Sous-total ({getTotalItems()} article
                      {getTotalItems() > 1 ? "s" : ""})
                    </span>
                    <span>{total} FCFA</span>
                  </div>
                  <div className="summary-row">
                    <span>Livraison</span>
                    <span className="free-shipping">Gratuite</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span className="total-price">{total} FCFA</span>
                  </div>
                </div>

                <div className="summary-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={handleContinueShopping}
                  >
                    <FaArrowLeft className="me-2" />
                    Continuer mes achats
                  </button>
                  <button className="btn btn-primary" onClick={handleCommander}>
                    <FaCreditCard className="me-2" />
                    Commander maintenant
                  </button>
                </div>

                <div className="security-notice">
                  <div className="security-icon">🔒</div>
                  <span>
                    Paiement sécurisé • Livraison gratuite • Retour facile
                  </span>
                </div>
              </div>

              <button className="btn btn-clear btn-danger" onClick={clearCart}>
                <FaTrash className="me-2" />
                Vider le panier
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Panier;
