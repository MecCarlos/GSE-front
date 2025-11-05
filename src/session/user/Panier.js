import React from "react";
import { useCart } from "../../Context/CartContext.js";
import "../../Style/common/home.css";
// import "../../Style/common/catalogue.css";
import "../../Style/user/panier.css";
import Footer from "../../components/Footer";
import pvide from "../../assets/gifs/pvide.gif";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="home_page">
      <div className="home_content panier_page">
        <header className="">
          <h1>Panier</h1>
        </header>
      </div>

      <div className="cart-container">
        {cart.length === 0 ? (
          <div className="img_box">
            <img className="panier_vide" src={pvide} alt="Panier vide" />
          </div>
        ) : (
          <>
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
                    {it.quantite} × {it.prix_promo} FCFA
                  </div>
                </div>

                <div className="cart-actions">
                  <div className="qty-control">
                    <button
                      onClick={() =>
                        updateQuantity(it.productId, it.variantKey, Math.max(1, it.quantite - 1))
                      }
                    >
                      −
                    </button>
                    <span>{it.quantite}</span>
                    <button
                      onClick={() =>
                        updateQuantity(it.productId, it.variantKey, it.quantite + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(it.productId, it.variantKey)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}

            <h3>Total : {total} FCFA</h3>

            <div className="cart-actions-bottom">
              <button className="clear-btn" onClick={clearCart}>
                Vider le panier
              </button>
              <button className="cmd-btn" onClick={handleCommander}>
                Commander
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Panier;
