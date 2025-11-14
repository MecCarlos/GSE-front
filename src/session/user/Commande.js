import React, { useState, useEffect } from "react";
import { useCart } from "../../Context/CartContext.js";
import { useAuth } from "../../AuthContext";
import "../../Style/user/commande.css";
import pvide from "../../assets/gifs/pvide.gif";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaTruck,
  FaCheckCircle,
  FaLock,
  FaMapMarkerAlt,
  FaCity,
  FaUpload,
  FaTimes,
} from "react-icons/fa";
import mtn from "../../assets/images/mtn.png";
import moov from "../../assets/images/moov.jpeg";
import celtiis from "../../assets/images/celtis.jpeg";

const Commande = () => {
  const { cart, total, clearCart } = useCart();
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    adresse: "",
    ville: "",
    codePostal: "",
    telephone: "",
    notes: "",
  });

  const [paiement, setPaiement] = useState("livraison");
  const [mobileMoneyData, setMobileMoneyData] = useState({
    operator: "",
    clientNumber: "",
    proofImage: null,
    proofPreview: null,
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Vérifier la validité du formulaire
  useEffect(() => {
    const validateForm = () => {
      // Champs obligatoires de base
      const baseFieldsValid =
        formData.adresse.trim() !== "" &&
        formData.ville.trim() !== "" &&
        formData.codePostal.trim() !== "" &&
        formData.telephone.trim() !== "";

      // Si paiement à la livraison, seulement les champs de base sont requis
      if (paiement === "livraison") {
        return baseFieldsValid;
      }

      // Si paiement mobile money, vérifier les champs supplémentaires
      if (paiement === "mobile_money") {
        return (
          baseFieldsValid &&
          mobileMoneyData.operator.trim() !== "" &&
          mobileMoneyData.clientNumber.trim() !== "" &&
          mobileMoneyData.proofImage !== null
        );
      }

      return false;
    };

    setIsFormValid(validateForm());
  }, [formData, paiement, mobileMoneyData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMobileMoneyChange = (e) => {
    setMobileMoneyData({
      ...mobileMoneyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOperatorSelect = (operator) => {
    setMobileMoneyData({
      ...mobileMoneyData,
      operator,
    });
  };

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith("image/")) {
        setMessage("Veuillez sélectionner une image valide");
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage("L'image ne doit pas dépasser 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setMobileMoneyData({
          ...mobileMoneyData,
          proofImage: file,
          proofPreview: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProofImage = () => {
    setMobileMoneyData({
      ...mobileMoneyData,
      proofImage: null,
      proofPreview: null,
    });
  };

  const getSellerNumber = () => {
    switch (mobileMoneyData.operator) {
      case "mtn":
        return "+229 01 49 30 65 16";
      case "moov":
        return "Non pris en charge";
      case "celtiis":
        return "+229 01 49 30 65 16";
      default:
        return "";
    }
  };

  const getOperatorName = () => {
    switch (mobileMoneyData.operator) {
      case "mtn":
        return "MTN";
      case "moov":
        return "Moov";
      case "celtiis":
        return "Celtiis";
      default:
        return "";
    }
  };

  // Réinitialiser les données mobile money quand on change de méthode de paiement
  const handlePaiementChange = (method) => {
    setPaiement(method);
    if (method !== "mobile_money") {
      setMobileMoneyData({
        operator: "",
        clientNumber: "",
        proofImage: null,
        proofPreview: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);

    if (!auth.user) {
      setMessage("Vous devez être connecté pour passer une commande.");
      setIsSubmitting(false);
      return;
    }

    const commande = {
      userId: auth.user.id,
      adresseLivraison: formData,
      paiement:
        paiement === "mobile_money"
          ? `mobile_money_${mobileMoneyData.operator}`
          : paiement,
      mobileMoneyData:
        paiement === "mobile_money"
          ? {
              ...mobileMoneyData,
              operator: mobileMoneyData.operator, // Type de réseau
              operatorName: getOperatorName(), // Nom affichable du réseau
              sellerNumber: getSellerNumber(),
              timestamp: new Date().toISOString(),
              clientName: `${auth.user.nom} ${auth.user.prenom || ""}`,
            }
          : null,
      items: cart.map((it) => ({
        productId: it.productId,
        nom: it.nom,
        options: JSON.parse(it.variantKey || "{}"),
        quantite: it.quantite,
        prix: it.prix,
        image: it.image,
      })),
      total,
    };

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("commande", JSON.stringify(commande));

      if (mobileMoneyData.proofImage) {
        formDataToSend.append("proofImage", mobileMoneyData.proofImage);
      }

      const res = await fetch("http://localhost:3001/api/commande/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        setFormData({
          adresse: "",
          ville: "",
          codePostal: "",
          telephone: "",
          notes: "",
        });
        setPaiement("livraison");
        setMobileMoneyData({
          operator: "",
          clientNumber: "",
          proofImage: null,
          proofPreview: null,
        });
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
                    {message && <div className="message error">{message}</div>}

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
                          placeholder="01 XX XX XX XX"
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
                            id="livraison"
                            name="paiement"
                            value="livraison"
                            checked={paiement === "livraison"}
                            onChange={(e) => handlePaiementChange(e.target.value)}
                          />
                          <label htmlFor="livraison" className="g-2 d-flex">
                            <FaMoneyBillWave className="payment-icon" />
                            <br/>
                            <span>Paiement à la livraison</span>
                            <small>
                              {/* Payez lorsque vous recevez votre commande */}
                            </small>
                          </label>
                        </div>

                        <div className="payment-option">
                          <input
                            type="radio"
                            id="mobile_money"
                            name="paiement"
                            value="mobile_money"
                            checked={paiement === "mobile_money"}
                            onChange={(e) => handlePaiementChange(e.target.value)}
                          />
                          <label htmlFor="mobile_money">
                            <div className="operator-logo d-flex p-1 gap-2">
                              <img
                                src={mtn}
                                style={{ borderRadius: "7px" }}
                                alt="MTN Money"
                              />
                              <img
                                src={moov}
                                style={{ borderRadius: "7px" }}
                                alt="Moov Money"
                              />
                              <img
                                src={celtiis}
                                style={{ borderRadius: "7px" }}
                                alt="Celtiis Money"
                              />
                            </div>
                            <br/>
                            <span>Paiement sécurisé par Mobile Money</span>
                            {/* <small>Paiement sécurisé via MTN - MOOV - CELTIIS</small> */}
                          </label>
                        </div>
                      </div>

                      {paiement === "mobile_money" && (
                        <div className="mobile-money-form">
                          <div className="operator-selection">
                            <h4>Sélectionnez votre opérateur</h4>
                            <div className="operator-buttons">
                              <button
                                type="button"
                                className={`operator-btn ${
                                  mobileMoneyData.operator === "mtn"
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() => handleOperatorSelect("mtn")}
                              >
                                <img
                                  src={mtn}
                                  style={{ borderRadius: "7px" }}
                                  alt="MTN"
                                />
                                <span>MTN Money</span>
                              </button>
                              <button
                                type="button"
                                className={`operator-btn ${
                                  mobileMoneyData.operator === "moov"
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() => handleOperatorSelect("moov")}
                              >
                                <img
                                  src={moov}
                                  style={{ borderRadius: "7px" }}
                                  alt="Moov"
                                />
                                <span>Moov Money</span>
                              </button>
                              <button
                                type="button"
                                className={`operator-btn ${
                                  mobileMoneyData.operator === "celtiis"
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() => handleOperatorSelect("celtiis")}
                              >
                                <img
                                  src={celtiis}
                                  style={{ borderRadius: "7px" }}
                                  alt="Celtiis"
                                />
                                <span>Celtiis Money</span>
                              </button>
                            </div>
                          </div>

                          {mobileMoneyData.operator && (
                            <div className="payment-details">
                              <div className="seller-info">
                                <h5>Informations de transfert</h5>
                                <div className="info-card">
                                  <div className="info-row">
                                    <span>Numéro du vendeur :</span>
                                    <strong>{getSellerNumber()}</strong>
                                  </div>
                                  <div className="info-row">
                                    <span>Montant à transférer :</span>
                                    <strong className="amount">
                                      {total} FCFA
                                    </strong>
                                  </div>
                                  <div className="info-row">
                                    <span>Nom du client :</span>
                                    <strong>
                                      {auth.user.nom} {auth.user.prenom || ""}
                                    </strong>
                                  </div>
                                  <div className="info-row">
                                    <span>Réseau :</span>
                                    <strong>{getOperatorName()}</strong>
                                  </div>
                                </div>
                              </div>

                              <div className="form-grid">
                                <div className="form-group full-width">
                                  <label>
                                    Votre numéro {getOperatorName()} *
                                  </label>
                                  <input
                                    type="tel"
                                    name="clientNumber"
                                    value={mobileMoneyData.clientNumber}
                                    onChange={handleMobileMoneyChange}
                                    placeholder="01 XX XX XX XX"
                                    required
                                  />
                                </div>

                                <div className="form-group full-width">
                                  <label>Preuve de transfert *</label>
                                  <div className="file-upload-container">
                                    {!mobileMoneyData.proofPreview ? (
                                      <div className="file-upload-box">
                                        <input
                                          type="file"
                                          id="proofUpload"
                                          accept="image/*"
                                          onChange={handleProofUpload}
                                          className="file-input"
                                        />
                                        <label
                                          htmlFor="proofUpload"
                                          className="file-upload-label"
                                        >
                                          <FaUpload className="upload-icon" />
                                          <span>
                                            Cliquez pour télécharger la preuve
                                          </span>
                                          <small>
                                            Format: JPG, PNG (max 5MB)
                                          </small>
                                        </label>
                                      </div>
                                    ) : (
                                      <div className="proof-preview">
                                        <img
                                          src={mobileMoneyData.proofPreview}
                                          alt="Preuve de transfert"
                                        />
                                        <button
                                          type="button"
                                          className="remove-proof"
                                          onClick={removeProofImage}
                                        >
                                          <FaTimes />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="payment-instructions">
                                <h5>Instructions de paiement :</h5>
                                <ol>
                                  <li>
                                    Effectuez le transfert de{" "}
                                    <strong>{total} FCFA</strong> vers le numéro{" "}
                                    <strong>{getSellerNumber()}</strong>
                                  </li>
                                  <li>
                                    Prenez une capture d'écran de la
                                    confirmation de transfert
                                  </li>
                                  <li>
                                    Téléchargez la preuve dans le champ
                                    ci-dessus
                                  </li>
                                  <li>
                                    Votre commande sera traitée après
                                    vérification
                                  </li>
                                </ol>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className={`btn-commande ${
                        !isFormValid ? "disabled" : ""
                      } ${isSubmitting ? "submitting" : ""}`}
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner"></div>
                          Traitement en cours...
                        </>
                      ) : !isFormValid ? (
                        <>
                          <FaCheckCircle className="me-2" />
                          Remplissez tous les champs obligatoires
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
                            src={`http://localhost:3001/uploads/${
                              it.image || "default.png"
                            }`}
                            alt={it.nom}
                          />
                        </div>
                        <div className="item-details">
                          <h4>{it.nom}</h4>
                          <p className="item-variant">
                            {Object.values(
                              JSON.parse(it.variantKey || "{}") || {}
                            ).join(" / ")}
                          </p>
                          <div className="item-meta">
                            <span className="item-quantity">
                              {it.quantite} ×
                            </span>
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
                      <span>
                        Sous-total ({getTotalItems()} article
                        {getTotalItems() > 1 ? "s" : ""})
                      </span>
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
                    <span>Livraison estimée : 1-3 jours ouvrés</span>
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
            <p>
              Votre commande a été passée avec succès et sera traitée
              rapidement.
            </p>
            <p className="success-details">
              Numéro de commande: #
              {Math.random().toString(36).substr(2, 9).toUpperCase()}
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