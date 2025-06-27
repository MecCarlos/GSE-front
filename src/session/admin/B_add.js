import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAddShoppingCart } from "react-icons/md";
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Style/common/boutton.css';

const B_add = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    description: '',
    prix_promo: '',
    quantite: '',
    image_principale: null,
    image_1: null,
    image_2: null
  });

  const [previews, setPreviews] = useState({
    image_principale: null,
    image_1: null,
    image_2: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (file) {
        setFormData(prev => ({ ...prev, [name]: file }));

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => ({ ...prev, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const removeImage = (key) => {
    setFormData(prev => ({ ...prev, [key]: null }));
    setPreviews(prev => ({ ...prev, [key]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('nom', formData.nom);
      data.append('description', formData.description || ''); 
      data.append('prix', formData.prix);
      data.append('prix_promo', formData.prix_promo);
      data.append('quantite', formData.quantite || 0); 
      if (formData.image_principale) data.append('image_principale', formData.image_principale);
      if (formData.image_1) data.append('image_1', formData.image_1);
      if (formData.image_2) data.append('image_2', formData.image_2);

      await axios.post('http://localhost:3001/api/add/produits', data);

      toast.success("Produit ajouté avec succès !");
      setFormData({ nom: '', prix: '', prix_promo: '', description: '', quantite: '', image_principale: null, image_1: null, image_2: null });
      setPreviews({ image_principale: null, image_1: null, image_2: null });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'enregistrement.");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <ToastContainer />
      <motion.button
        className="floating-button"
        onClick={() => setIsModalOpen(true)}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 0px rgba(0, 123, 255, 0.7)',
            '0 0 10px rgba(0, 123, 255, 0.7)',
            '0 0 0px rgba(0, 123, 255, 0.7)',
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      >
        <MdAddShoppingCart size={20} />
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="modal-overlay"
            onClick={() => setIsModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
            >
              <div className="contentz">
                <button className="btn-close float-end" onClick={() => setIsModalOpen(false)}></button>
                <img src={logo} alt="Logo" className="mb-3" />

                <form onSubmit={handleSubmit}>
                  <div className="row m-0 w-100" style={{ margin: '0'}}>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label">Nom du produit</label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label">Prix</label>
                      <input
                        type="number"
                        name="prix"
                        value={formData.prix}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label">Prix promotionnel </label>
                      <input
                        type="number"
                        name="prix_promo"
                        value={formData.prix_promo}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label className="form-label">Quantité</label>
                      <input
                        type="number"
                        value={formData.quantite}
                        onChange={handleChange}
                        name="quantite"
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                      <label className="form-label">Principale</label>
                      <input
                        type="file"
                        name="image_principale"
                        accept="image/*"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                      <label className="form-label">Aperçu 1</label>
                      <input
                        type="file"
                        name="image_1"
                        accept="image/*"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-12 col-md-4 mb-3">
                      <label className="form-label">Aperçu 2</label>
                      <input
                        type="file"
                        name="image_2"
                        accept="image/*"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-12 d-flex gap-3 justify-content-center flex-wrap">
                      {Object.entries(previews).map(([key, src]) =>
                        src ? (
                          <div key={key} className="position-relative">
                            <img
                              src={src}
                              alt={key}
                              className="img-thumbnail"
                              style={{ width: 100, height: 100, objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-danger position-absolute top-0 end-0"
                              onClick={() => removeImage(key)}
                              style={{ transform: 'translate(30%, -30%)' }}
                            >
                              &times;
                            </button>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success mt-4 w-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default B_add;
