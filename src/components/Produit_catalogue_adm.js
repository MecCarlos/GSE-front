import React, { useEffect, useState } from "react";
import "../Style/common/produit_adm.css";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { CiEdit, CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import Edition from "./Edition";
import B_add from "../session/admin/B_add";
import { API_URL } from '../config';

const DeleteConfirmation = ({ show, handleClose, handleConfirm, productName }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Body className="text-center">
      <p>
        Voulez-vous vraiment supprimer le produit <strong>{productName}</strong> ?
      </p>
    </Modal.Body>
    <Modal.Footer className="border-0 p-1 text-center justify-content-center">
      <Button variant="secondary" className="p-1 rounded-pill" onClick={handleClose}>
        <CiCircleRemove size={30} />
      </Button>
      <Button variant="danger" className="p-1 rounded-pill" onClick={handleConfirm}>
        <CiCircleCheck size={30} />
      </Button>
    </Modal.Footer>
  </Modal>
);

const Produit_catalogue_adm = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [categories, setCategories] = useState([]);

  const refreshProducts = () => {
    axios
      .get(`${API_URL}/adm/rec/produits`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        
        // Extraire les catégories uniques
        const uniqueCategories = ["Tous", ...new Set(res.data.map(p => p.categorie).filter(Boolean))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Erreur lors du rechargement :", err));
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleFilter = (cat) => {
    setSelectedCategory(cat);
    if (cat === "Tous") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.categorie === cat));
    }
    // Réinitialiser la recherche quand on change de catégorie
    setSearchTerm("");
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      // Si la recherche est vide, afficher les produits de la catégorie sélectionnée
      if (selectedCategory === "Tous") {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter((p) => p.categorie === selectedCategory));
      }
    } else {
      // Filtrer par terme de recherche dans le nom et la description
      const filtered = products.filter((p) =>
        p.nom.toLowerCase().includes(term.toLowerCase()) ||
        p.description?.toLowerCase().includes(term.toLowerCase()) ||
        p.categorie?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEdit(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setShowEdit(false);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`${API_URL}/adm/supprimer-produit/${productToDelete.id}`);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setFilteredProducts(filteredProducts.filter((p) => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="home_page">
      <div className="home_content _page">
        {/* En-tête avec le même style que les autres pages */}
        <header className="catalogue-header-pageheader">
          <div className="header-background"></div>
          <div className="header-content-pageheader">
            <div className="header-text-content">
              <h1>Gestion du Catalogue</h1>
              <p className="header-subtitle-pageheader">
                Administrez et gérez tous vos produits
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

        <section className="produit_adm_box">
          {/* Filtres Desktop - Boutons arrondis */}
          <div className="categorie-filters-desktop">
            <div className="filters-header">
              <FaFilter className="me-2" />
              <span>Filtrer par catégorie</span>
            </div>
            <div className="categorie-buttons">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`categorie-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => handleFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtres Mobile - Select */}
          <div className="categorie-filters-mobile">
            <Form.Select 
              value={selectedCategory} 
              onChange={(e) => handleFilter(e.target.value)}
              className="categorie-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </div>

          {/* En-tête des produits avec compteur */}
          <div className="products-header">
            <h6>Produits ajoutés ({filteredProducts.length})</h6>
            {searchTerm && (
              <div className="search-results-info">
                <span>Résultats pour : "{searchTerm}"</span>
              </div>
            )}
          </div>

          {/* Grille des produits */}
          <div className="produit">
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>Aucun produit trouvé</p>
                {searchTerm && (
                  <button 
                    className="clear-search-btn"
                    onClick={() => {
                      setSearchTerm("");
                      handleFilter("Tous");
                    }}
                  >
                    Afficher tous les produits
                  </button>
                )}
              </div>
            ) : (
              filteredProducts.map((p, i) => (
                <div
                  key={i}
                  className="pdt"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty("--x", `${x}px`);
                    e.currentTarget.style.setProperty("--y", `${y}px`);
                  }}
                >
                  <img
                    src={
                      p.variantes?.[0]?.image_principale
                        ? `http://localhost:3001/uploads/${p.variantes[0].image_principale}`
                        : "https://via.placeholder.com/150"
                    }
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                    alt={p.nom}
                  />
                  <div className="zone_info">
                    <h6>{p.nom}</h6>
                    {p.categorie && (
                      <span className="product-category">{p.categorie}</span>
                    )}
                    {p.variantes?.[0] ? (
                      <div className="d-flex price-container">
                        {p.variantes[0].prix_promo && p.variantes[0].prix_promo < p.variantes[0].prix ? (
                          <>
                            <p className="promo">{p.variantes[0].prix_promo} F</p>
                            <p className="prix original">{p.variantes[0].prix} F</p>
                          </>
                        ) : (
                          <p className="prix">{p.variantes[0].prix} F</p>
                        )}
                      </div>
                    ) : (
                      <p className="no-variant">Aucune variante</p>
                    )}
                    <div className="btn_box">
                      <button className="edit" onClick={() => openEditModal(p)}>
                        <CiEdit />
                      </button>
                      <button className="delete" onClick={() => handleDeleteClick(p)}>
                        <GoTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {showEdit && selectedProduct && (
            <Edition
              show={showEdit}
              product={selectedProduct}
              handleClose={closeEditModal}
              refresh={refreshProducts}
            />
          )}

          <DeleteConfirmation
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            handleConfirm={handleConfirmDelete}
            productName={productToDelete?.nom}
          />

          <B_add refresh={refreshProducts} />
        </section>
      </div>

      {/* CSS intégré avec les mêmes dimensions que les autres pages */}
      <style jsx>{`
        .home_page {
          background: #f8f9fa;
          min-height: 100vh;
        }

        /* En-tête avec EXACTEMENT les mêmes dimensions que les autres pages */
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

        /* Section des produits */
        .produit_adm_box {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem;
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

        /* En-tête des produits */
        .products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 0 1rem;
        }

        .products-header h6 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .search-results-info {
          background: #e2e8f0;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          color: #4a5568;
        }

        /* Grille des produits */
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
          position: relative;
          overflow: hidden;
        }

        .pdt:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .pdt img {
          width: 150px !important;
          height: 150px !important;
          object-fit: cover;
          border-radius: 12px;
          margin: 0 auto 1rem;
        }

        .zone_info h6 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #2d3748;
        }

        .product-category {
          display: inline-block;
          background: #e2e8f0;
          color: #4a5568;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          margin-bottom: 0.75rem;
        }

        .price-container {
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
          font-size: 0.9rem;
          margin: 0;
        }

        .prix.original {
          text-decoration: line-through;
        }

        .no-variant {
          color: #a0aec0;
          font-style: italic;
          margin: 0 0 1rem 0;
        }

        .btn_box {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .edit, .delete {
          padding: 0.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .edit {
          background: #3b82f6;
          color: white;
        }

        .edit:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        .delete {
          background: #ef4444;
          color: white;
        }

        .delete:hover {
          background: #dc2626;
          transform: scale(1.05);
        }

        .no-products {
          text-align: center;
          padding: 3rem;
          color: #718096;
          grid-column: 1 / -1;
        }

        .clear-search-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }

        .clear-search-btn:hover {
          background: #5a6fd8;
          transform: translateY(-2px);
        }

        /* Responsive - Mêmes breakpoints que les autres pages */
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

          .products-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .produit {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }

          .pdt img {
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

          .produit_adm_box {
            padding: 1rem;
          }

          .produit {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 0.75rem;
          }

          .pdt {
            padding: 1rem;
          }

          .pdt img {
            width: 100px !important;
            height: 100px !important;
          }

          .zone_info h6 {
            font-size: 0.9rem;
          }

          .btn_box {
            gap: 0.5rem;
          }

          .edit, .delete {
            padding: 0.4rem;
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

export default Produit_catalogue_adm;