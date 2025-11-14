import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import ImageSelector from "./ImageSelector"; // ton composant ImageSelector
import logo from "../assets/images/logo.png";
import "../Style/admin/edition.css";
import { API_URL } from '../../../config';

const Edition = ({ show, handleClose, product, refresh }) => {
  const [formData, setFormData] = useState({
    nom: "",
    categorie: "",
    description: "",
  });

  const [variantes, setVariantes] = useState([]);
  const [selectedVarIndex, setSelectedVarIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Initialiser le formulaire quand le produit change
  useEffect(() => {
    if (product) {
      setFormData({
        nom: product.nom,
        categorie: product.categorie,
        description: product.description,
      });

      setVariantes(
        product.variantes?.map((v) => ({
          ...v,
          images: {
            principale: v.image_principale || null,
            image_1: v.image_1 || null,
            image_2: v.image_2 || null,
          },
        })) || []
      );

      setSelectedVarIndex(0);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVarChange = (key, value) => {
    setVariantes((prev) =>
      prev.map((v, i) => (i === selectedVarIndex ? { ...v, [key]: value } : v))
    );
  };

  const handleOptionChange = (optionKey, value) => {
    setVariantes((prev) =>
      prev.map((v, i) =>
        i === selectedVarIndex
          ? { ...v, options: { ...v.options, [optionKey]: value } }
          : v
      )
    );
  };

  const handleImageChange = (imageKey, file) => {
    setVariantes((prev) =>
      prev.map((v, i) =>
        i === selectedVarIndex
          ? { ...v, images: { ...v.images, [imageKey]: file } }
          : v
      )
    );
  };

  const handleSave = async () => {
    if (!product) return;
    setIsSaving(true);
    try {
      const data = new FormData();
      data.append("nom", formData.nom);
      data.append("categorie", formData.categorie);
      data.append("description", formData.description);

      variantes.forEach((v, i) => {
        data.append(`variantes[${i}][id]`, v.id || "");
        data.append(`variantes[${i}][quantite]`, v.quantite || 0);
        data.append(`variantes[${i}][prix]`, v.prix || 0);
        data.append(`variantes[${i}][prix_promo]`, v.prix_promo || 0);
        data.append(
          `variantes[${i}][options]`,
          JSON.stringify(v.options || {})
        );

        Object.entries(v.images).forEach(([key, file]) => {
          if (file instanceof File) {
            data.append(`variantes[${i}][images][${key}]`, file);
          }
        });
      });

      await axios.put(
        `${API_URL}/adm/update-produit/${product.id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      refresh?.();
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      alert("Erreur lors de la modification du produit.");
    }
    setIsSaving(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <img src={logo} alt="Logo" style={{ width: "15%" }} />
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <Form>
          <Form.Group>
            <Form.Label>Nom du produit</Form.Label>
            <Form.Control
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control
              as="select"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
            >
              <option value="PC">PC</option>
              <option value="Telephone">Téléphone</option>
              <option value="Tablette">Tablette</option>
              <option value="Ecouteur">Ecouteur</option>
              <option value="Ecran">Ecran</option>
              <option value="Casque_audio">Casque audio</option>
              <option value="Webcam">Webcam</option>
              <option value="Imprimante">Imprimante</option>
              <option value="souris">Souris</option>
              <option value="clavier">Clavier</option>
              <option value="baie">Baie</option>
              <option value="cable">Câble</option>
              <option value="Routeur">Routeur</option>
              <option value="switch">Switch</option>
              <option value="Camera">Caméra</option>
              <option value="Panneau_solaire">Panneau solaire</option>
              <option value="Onduleur">Onduleur</option>
              <option value="Regulateur">Régulateur</option>
              <option value="Batterie_solaire">Batterie solaire</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Sélecteur de variante */}
          {variantes.length > 0 && (
            <Form.Group className="mt-3">
              <Form.Label>Variante</Form.Label>
              <Form.Control
                as="select"
                value={selectedVarIndex}
                onChange={(e) => setSelectedVarIndex(parseInt(e.target.value))}
              >
                {variantes.map((v, i) => {
                  const desc = Object.entries(v.options)
                    .map(([k, val]) => `${k}: ${val}`)
                    .join(", ");
                  return (
                    <option key={v.id || i} value={i}>
                      {desc || `Variante ${i + 1}`}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          )}

          {variantes[selectedVarIndex] && (
            <>
              <Form.Group className="mt-2">
                <Form.Label>Quantité</Form.Label>
                <Form.Control
                  type="number"
                  value={variantes[selectedVarIndex].quantite || 0}
                  onChange={(e) =>
                    handleVarChange("quantite", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Prix</Form.Label>
                <Form.Control
                  type="number"
                  value={variantes[selectedVarIndex].prix || 0}
                  onChange={(e) => handleVarChange("prix", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mt-2">
                <Form.Label>Prix promo</Form.Label>
                <Form.Control
                  type="number"
                  value={variantes[selectedVarIndex].prix_promo || 0}
                  onChange={(e) =>
                    handleVarChange("prix_promo", e.target.value)
                  }
                />
              </Form.Group>

              {/* Images */}
              <div className="d-flex justify-content-between mt-2">
                {["principale", "image_1", "image_2"].map((key) => (
                  <div key={key} className="text-center me-3">
                    <Form.Label>{key}</Form.Label>
                    <ImageSelector
                      currentImage={
                        variantes[selectedVarIndex].images[key]
                          ? variantes[selectedVarIndex].images[key] instanceof File
                            ? URL.createObjectURL(
                                variantes[selectedVarIndex].images[key]
                              )
                            : `http://localhost:3001/uploads/${variantes[selectedVarIndex].images[key]}`
                          : null
                      }
                      onChange={(file) => handleImageChange(key, file)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer-custom">
        <Button  className=" btn ann" onClick={handleClose}>
          Annuler
        </Button>
        <Button  className=" btn modifier" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Modifier..." : "Modifier"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Edition;
