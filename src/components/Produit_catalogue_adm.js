import React, { useEffect, useState } from "react";
import "../Style/common/produit_adm.css";
import axios from "axios";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { Modal, Button } from "react-bootstrap";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
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
  const [showEdit, setShowEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const refreshProducts = () => {
    axios
      .get("http://localhost:3001/api/adm/rec/produits")
      .then((res) => {
        // ton API doit renvoyer un produit avec un champ `variantes: []`
        setProducts(res.data);
      })
      .catch((err) => console.error("Erreur lors du rechargement :", err));
  };

  useEffect(() => {
    refreshProducts();
  }, []);

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
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <section className="produit_adm_box">
      <h6>Produits ajoutés</h6>
      <div className="produit">
        {products.map((p, i) => (
          <div key={i} className="pdt">
            {/* On affiche l’image principale de la première variante */}
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

              {/* On affiche les prix de la 1ère variante */}
              {p.variantes?.[0] ? (
                <div className="d-flex">
                  <p className="promo">{p.variantes[0].prix_promo} F</p>
                  <p className="prix">{p.variantes[0].prix} F</p>
                </div>
              ) : (
                <p>Aucune variante</p>
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
        ))}
      </div>

      {/* Modal d'édition */}
      {showEdit && selectedProduct && (
        <Edition
          show={showEdit}
          product={selectedProduct}
          handleClose={closeEditModal}
          refresh={refreshProducts}
        />
      )}

      {/* Modal de confirmation suppression */}
      <DeleteConfirmation
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
        productName={productToDelete?.nom}
      />

      {/* Bouton / Modal ajout */}
      <B_add refresh={refreshProducts} />
    </section>
  );
};

export default Produit_catalogue_adm;
