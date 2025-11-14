import React, { useEffect, useState } from "react";
import "../Style/common/produit_adm.css";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { CiEdit, CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import Edition from "./Edition";
import B_add from "../session/admin/B_add";

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
      .get("http://localhost:3001/api/adm/rec/produits")
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
      await axios.delete(`http://localhost:3001/api/adm/supprimer-produit/${productToDelete.id}`);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setFilteredProducts(filteredProducts.filter((p) => p.id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <section className="produit_adm_box">
      {/* En-tête Hero */}
      <header className="catalogue-header"> 
        <div className="header-content">
          <h1>Gestion du Catalogue</h1>
          <p className="header-subtitle">Administrez et gérez tous vos produits</p>
        </div>
        
        {/* Barre de recherche */}
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">
              <FaSearch />
            </div>
          </div>
        </div>
      </header>

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
  );
};

export default Produit_catalogue_adm;