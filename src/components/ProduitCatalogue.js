import React, { useEffect, useState } from "react";
import { Modal, Button, Toast, ToastContainer, Form } from "react-bootstrap";
import { useCart } from "../Context/CartContext.js";
import { FaFilter, FaSearch } from "react-icons/fa";
import { API_URL } from "../config";
import "../Style/common/header.css";

const ProduitCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/adm/rec/produits`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const cats = ["Tous", ...new Set(data.map((p) => p.categorie))];
        setCategories(cats);
      })
      .catch((err) => console.error("Erreur chargement produits:", err));
  }, []);

  const handleFilter = (cat) => {
    setSelectedCategory(cat);
    if (cat === "Tous") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.categorie === cat));
    }
    setSearchTerm("");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      if (selectedCategory === "Tous") {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(
          products.filter((p) => p.categorie === selectedCategory)
        );
      }
    } else {
      const filtered = products.filter(
        (p) =>
          p.nom.toLowerCase().includes(term.toLowerCase()) ||
          p.description?.toLowerCase().includes(term.toLowerCase()) ||
          p.categorie?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setSelectedVariantIndex(0);
    setSelectedImage(
      product.variantes?.[0]?.images?.principale || "default.png"
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedVariantIndex(0);
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleAddToCart = (product, variantIndex = 0) => {
    addToCart({ product, variantIndex, quantity: 1 });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="home_page">
      <div className="home_content _page">
        {/* En-tête avec les mêmes dimensions que PageHeader */}
        <header className="catalogue-header-pageheader">
          <div className="header-background"></div>
          <div className="header-content-pageheader">
            <div className="header-text-content">
              <h1>Catalogue</h1>
              <p className="header-subtitle-pageheader">
                Découvrez nos produits exclusifs aux meilleurs prix
              </p>
            </div>
            
            {/* Barre de recherche intégrée */}
            <div className="search-container-pageheader">
              <div className="search-box-pageheader">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="search-input-pageheader"
                />
                <div className="search-icon-pageheader">
                  <FaSearch />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="produit_box">
          {/* Filtres Desktop */}
          <div className="categorie-filters-desktop">
            <div className="filters-header">
              <FaFilter className="me-2" />
              <span>Filtrer par catégorie</span>
            </div>
            <div className="categorie-buttons">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`categorie-btn ${
                    selectedCategory === cat ? "active" : ""
                  }`}
                  onClick={() => handleFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtres Mobile */}
          <div className="categorie-filters-mobile">
            <Form.Select
              value={selectedCategory}
              onChange={(e) => handleFilter(e.target.value)}
              className="categorie-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </div>

          <div className="produit">
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((p, i) => {
                const firstVariant = p.variantes?.[0];
                const mainImage =
                  firstVariant?.images?.principale || "default.png";
                return (
                  <div
                    key={i}
                    className="pdt"
                    onClick={() => handleOpenModal(p)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty("--x", `${x}px`);
                      e.currentTarget.style.setProperty("--y", `${y}px`);
                    }}
                  >
                    <img
                      className="pdt_img"
                      src={`http://localhost:3001/uploads/${mainImage}`}
                      alt={p.nom}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="zone_info">
                      <h6>{p.nom}</h6>
                      <div className="d-flex">
                        <p className="promo">
                          {firstVariant?.prix_promo || firstVariant?.prix} F
                        </p>
                        {firstVariant?.prix_promo && (
                          <p className="prix">{firstVariant.prix} F</p>
                        )}
                      </div>
                      <Button
                        className="panier"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(p, 0);
                        }}
                      >
                        Panier
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no-products">
                <p>Aucun produit trouvé.</p>
              </div>
            )}
          </div>

          {/* Modal produit */}
          {selectedProduct && (
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              dialogClassName="modal-lg-custom"
            >
              <Modal.Body>
                <div className="row align-items-center p-2">
                  <div className="col-md-6 text-center">
                    <img
                      src={`http://localhost:3001/uploads/${selectedImage}`}
                      alt={selectedProduct.nom}
                      style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <div className="mt-2 d-flex justify-content-center gap-2">
                      {["principale", "image_1", "image_2"].map((key) => {
                        const img =
                          selectedProduct.variantes?.[selectedVariantIndex]
                            ?.images?.[key];
                        if (!img) return null;
                        return (
                          <img
                            key={key}
                            src={`http://localhost:3001/uploads/${img}`}
                            alt={key}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              cursor: "pointer",
                              border:
                                selectedImage === img
                                  ? "2px solid navy"
                                  : "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                            onClick={() => setSelectedImage(img)}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-md-6 text-center">
                    <h5>
                      {selectedProduct.nom} {selectedProduct.model}
                    </h5>
                    <p>
                      <span
                        className="text-danger product-prix"
                        style={{ textDecoration: "line-through" }}
                      >
                        {selectedProduct.variantes?.[selectedVariantIndex]?.prix}{" "}
                        FCFA
                      </span>
                      <br />
                      <span className="text-primary product-prix">
                        {selectedProduct.variantes?.[selectedVariantIndex]
                          ?.prix_promo ||
                          selectedProduct.variantes?.[selectedVariantIndex]
                            ?.prix}{" "}
                        FCFA
                      </span>
                    </p>
                    <p>
                      {selectedProduct.variantes?.[selectedVariantIndex]
                        ?.quantite > 0
                        ? "En stock"
                        : "Rupture"}
                    </p>

                    {selectedProduct.variantes &&
                      selectedProduct.variantes.length > 1 && (
                        <select
                          className="form-control"
                          value={selectedVariantIndex}
                          onChange={(e) => {
                            const idx = Number(e.target.value);
                            setSelectedVariantIndex(idx);
                            setSelectedImage(
                              selectedProduct.variantes?.[idx]?.images
                                ?.principale || "default.png"
                            );
                          }}
                        >
                          {selectedProduct.variantes.map((v, idx) => (
                            <option key={idx} value={idx}>
                              {Object.values(v.options).join(" / ")}
                            </option>
                          ))}
                        </select>
                      )}

                    <p className="product-description">
                      {selectedProduct.description}
                    </p>

                    <Button
                      className="mt-2 panier"
                      style={{
                        backgroundColor: "lavender",
                        color: "navy",
                        padding: "3%",
                        fontWeight: "normal",
                        borderRadius: "10px",
                        border: "none",
                      }}
                      onClick={() =>
                        handleAddToCart(selectedProduct, selectedVariantIndex)
                      }
                    >
                      Panier
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}

          {/* Toast */}
          <ToastContainer position="top-end" className="p-3">
            <Toast
              show={showToast}
              bg="success"
              onClose={() => setShowToast(false)}
              delay={2000}
              autohide
            >
              <Toast.Body style={{ color: "white" }}>
                Produit ajouté au panier !
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </section>
      </div>

      {/* CSS intégré avec les mêmes dimensions que PageHeader */}
      <style jsx>{`
        .home_page {
          background: #f8f9fa;
          min-height: 100vh;
        }

        /* En-tête avec EXACTEMENT les mêmes dimensions que PageHeader */
        .catalogue-header-pageheader {
          position: relative;
          padding: 4rem 1rem;
          text-align: center;
          color: white;
          overflow: hidden;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .header-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .header-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,0 1000,1000"/></svg>');
          background-size: cover;
        }

        .header-content-pageheader {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          width: 100%;
        }

        .header-text-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          line-height: 1.2;
        }

        .header-subtitle-pageheader {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0 auto;
          line-height: 1.6;
          max-width: 600px;
          margin-bottom: 2rem;
        }

        /* Barre de recherche intégrée dans le header */
        .search-container-pageheader {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }

        .search-box-pageheader {
          position: relative;
          width: 100%;
          max-width: 500px;
        }

        .search-input-pageheader {
          width: 100%;
          padding: 0.75rem 1.5rem;
          padding-right: 50px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          font-size: 1rem;
          color: white;
          transition: all 0.3s ease;
        }

        .search-input-pageheader::placeholder {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 400;
        }

        .search-input-pageheader:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }

        .search-icon-pageheader {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.2);
        }

        .search-icon-pageheader:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.05);
        }

        /* Filtres Desktop */
        .categorie-filters-desktop {
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        .filters-header {
          display: flex;
          align-items: center;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .categorie-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .categorie-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 50px;
          background: white;
          color: #4a5568;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          text-transform: capitalize;
        }

        .categorie-btn:hover {
          border-color: #667eea;
          transform: translateY(-2px);
        }

        .categorie-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        /* Filtres Mobile */
        .categorie-filters-mobile {
          display: none;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        .categorie-select {
          border: 2px solid #e2e8f0;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          background: white;
          color: #4a5568;
          border-radius: 50px;
          width: 100%;
        }

        /* Produits */
        .produit_box {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem;
        }

        .produit {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          padding: 1rem 0;
        }

        .pdt {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .pdt:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .pdt_img {
          width: 150px !important;
          height: 150px !important;
          object-fit: cover;
          border-radius: 12px;
          margin: 0 auto 1rem;
        }

        .zone_info h6 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #2d3748;
        }

        .zone_info .d-flex {
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .promo {
          font-weight: 700;
          color: #2d3748;
          font-size: 1rem;
          margin: 0;
        }

        .prix {
          font-weight: 500;
          color: #a0aec0;
          text-decoration: line-through;
          font-size: 0.9rem;
          margin: 0;
        }

        .panier {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .panier:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .no-products {
          text-align: center;
          padding: 3rem;
          color: #718096;
          grid-column: 1 / -1;
        }

        /* Responsive - Mêmes breakpoints que PageHeader */
        @media (max-width: 768px) {
          .catalogue-header-pageheader {
            padding: 3rem 1rem;
            min-height: 250px;
          }
          
          .header-text-content h1 {
            font-size: 2rem;
          }
          
          .header-subtitle-pageheader {
            font-size: 1rem;
          }

          .search-input-pageheader {
            padding: 0.67rem 1.25rem;
            padding-right: 45px;
            font-size: 0.95rem;
          }

          .search-icon-pageheader {
            width: 32px;
            height: 32px;
          }

          .categorie-filters-desktop {
            display: none;
          }

          .categorie-filters-mobile {
            display: block;
          }

          .produit {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }

          .pdt_img {
            width: 120px !important;
            height: 120px !important;
          }
        }

        @media (max-width: 576px) {
          .catalogue-header-pageheader {
            padding: 2.5rem 1rem;
            min-height: 200px;
          }
          
          .header-text-content h1 {
            font-size: 1.75rem;
          }
          
          .header-subtitle-pageheader {
            font-size: 0.9rem;
          }

          .search-input-pageheader {
            padding: 0.6rem 1rem;
            padding-right: 40px;
            font-size: 0.9rem;
          }

          .search-icon-pageheader {
            width: 30px;
            height: 30px;
          }

          .produit_box {
            padding: 1rem;
          }

          .produit {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 0.75rem;
          }

          .pdt {
            padding: 1rem;
          }

          .pdt_img {
            width: 100px !important;
            height: 100px !important;
          }

          .zone_info h6 {
            font-size: 0.9rem;
          }

          .promo {
            font-size: 0.9rem;
          }

          .prix {
            font-size: 0.8rem;
          }

          .panier {
            padding: 0.4rem 1rem;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 375px) {
          .header-text-content h1 {
            font-size: 1.5rem;
          }
          
          .header-subtitle-pageheader {
            font-size: 0.85rem;
          }

          .produit {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .pdt {
            max-width: 280px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ProduitCatalogue;