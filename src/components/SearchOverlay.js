import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext.js";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const SearchOverlay = ({ isOpen, onClose, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { addToCart } = useCart();

  // Filtrer les produits en temps réel
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const filtered = products.filter((p) =>
        p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.categorie?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchTerm, products]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart({ product, variantIndex: 0, quantity: 1 });
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-overlay-backdrop" onClick={onClose}></div>
      
      <div className="search-overlay-content">
        <div className="search-overlay-header">
          <div className="search-overlay-box">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-overlay-input"
              autoFocus
            />
            <button 
              className="search-overlay-close"
              onClick={onClose}
            >
              <IoClose />
            </button>
          </div>
        </div>

        {/* Résultats en temps réel */}
        <div className="search-overlay-results">
          {searchTerm && (
            <div className="search-results-container">
              <div className="search-results-header">
                <p className="search-results-count">
                  {searchResults.length} produit(s) trouvé(s) pour "{searchTerm}"
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="search-results-grid">
                  {searchResults.map((product, index) => {
                    const firstVariant = product.variantes?.[0];
                    const mainImage = firstVariant?.images?.principale || "default.png";
                    
                    return (
                      <div
                        key={index}
                        className="search-result-card"
                      >
                        <div className="search-result-image">
                          <img
                            src={`http://localhost:3001/uploads/${mainImage}`}
                            alt={product.nom}
                          />
                        </div>
                        <div className="search-result-info">
                          <h6>{product.nom}</h6>
                          <div className="search-result-price">
                            <p className="promo">
                              {firstVariant?.prix_promo || firstVariant?.prix} F
                            </p>
                            {firstVariant?.prix_promo && (
                              <p className="prix">{firstVariant.prix} F</p>
                            )}
                          </div>
                          <button 
                            className="search-result-add-btn"
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            <FaShoppingCart className="me-1" />
                            Panier
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : searchTerm && (
                <div className="no-search-results">
                  <p>Aucun produit trouvé pour "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;