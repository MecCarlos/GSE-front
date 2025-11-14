import "../Style/common/contact.css";
import { useState } from "react";
import Map from "./Map.js";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok, FaSnapchat, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { RiTimeFill } from "react-icons/ri";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";
import { API_URL } from '../../config';

export const ContactComp = () => {
  const [form, setForm] = useState({ nom: "", email: "", objet: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const BASE_API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://votre-domaine.com/api' 
    : "`${API_URL}'";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${BASE_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setModalMessage(data.message);
        setShowSuccessModal(true);
        setForm({ nom: "", email: "", objet: "", message: "" });
      } else {
        setModalMessage(data.message || 'Une erreur est survenue');
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setModalMessage('Erreur de connexion. Veuillez réessayer.');
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="contact_page">
      {/* En-tête Hero */}
      <header className="contact_header_simple">
        <div className="header_content">
          <h1>Contactez-Nous</h1>
          <p className="header_subtitle">Nous sommes là pour répondre à toutes vos questions</p>
        </div>
      </header>

      <div className="container contact_grid">
        <div className="row g-4">
          {/* Colonne de gauche - Formulaire et Map */}
          <div className="col-lg-8">
            <div className="card contact_form_card">
              <div className="card_header">
                <h2><BiSolidContact className="me-2" />Envoyez-nous un message</h2>
                <p>Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais</p>
              </div>
              <div className="card_body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form_group">
                        <label>Nom complet *</label>
                        <input 
                          type="text" 
                          name="nom"
                          value={form.nom}
                          onChange={handleChange}
                          placeholder="Votre nom complet" 
                          className="form-control" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form_group">
                        <label>Email *</label>
                        <input 
                          type="email" 
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Votre adresse email" 
                          className="form-control" 
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form_group">
                    <label>Objet *</label>
                    <input 
                      type="text" 
                      name="objet"
                      value={form.objet}
                      onChange={handleChange}
                      placeholder="Objet de votre message" 
                      className="form-control" 
                      required 
                    />
                  </div>

                  <div className="form_group">
                    <label>Message *</label>
                    <textarea 
                      className="form-control" 
                      rows="6" 
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Décrivez-nous votre demande en détail..."
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`btn rounded-pill text-white p-3 submit_btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Carte Localisation */}
            <div className="card localisation_card mt-4">
              <div className="card_header">
                <h2><FaMapMarkerAlt className="me-2" />Notre localisation</h2>
                <p>Venez nous rencontrer dans nos bureaux</p>
              </div>
              <div className="card_body map_container">
                <Map />
              </div>
            </div>
          </div>

          {/* Colonne de droite - Informations */}
          <div className="col-lg-4">
            {/* Carte Informations de contact */}
            <div className="card info_card contact_info">
              <div className="card_icon">
                <BiSolidContact />
              </div>
              <h5>Informations de contact</h5>
              <div className="contact_item">
                <span className="contact_icon">📍</span>
                <div>
                  <strong>Adresse</strong>
                  <p>Pahou, Bénin</p>
                </div>
              </div>
              <div className="contact_item">
                <span className="contact_icon"><FaPhone /></span>
                <div>
                  <strong>Téléphone</strong>
                  <p>+229 01 49 30 65 16</p>
                </div>
              </div>
              <div className="contact_item">
                <span className="contact_icon"><FaEnvelope /></span>
                <div>
                  <strong>Email</strong>
                  <p>olatechcorrporations@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Carte Horaires */}
            <div className="card info_card hours_info">
              <div className="card_icon">
                <FaClock />
              </div>
              <h5>Nos horaires d'ouverture</h5>
              <div className="hours_list">
                <div className="hour_item">
                  <span>Lundi - Vendredi</span>
                  <span>08:00 - 18:00</span>
                </div>
                <div className="hour_item">
                  <span>Samedi</span>
                  <span>09:00 - 16:00</span>
                </div>
                <div className="hour_item">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>

            {/* Carte Réseaux sociaux */}
            <div className="card info_card social_info">
              <div className="card_icon">
                <FaUserGroup />
              </div>
              <h5>Réseaux sociaux</h5>
              <p className="social_text">Rejoignez notre communauté</p>
              <div className="social_links">
                <a href="#" className="facebook" title="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" className="instagram" title="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://www.snapchat.com/add/g-ldas29?share_id=I8njbTHM_Mc&locale=fr-BJ" className="snapchat" title="Snapchat">
                  <FaSnapchat />
                </a>
                <a href="#" className="linkedin" title="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="https://www.tiktok.com/@olatechcorporations20" className="tiktok" title="TikTok">
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de succès */}
      {showSuccessModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content success-modal">
              <div className="modal-header border-0">
                <button type="button" className="btn-close" onClick={closeSuccessModal}></button>
              </div>
              <div className="modal-body text-center">
                <FaCheckCircle className="text-success mb-3" style={{ fontSize: '3rem' }} />
                <h4 className="text-success mb-3">Succès !</h4>
                <p className="mb-0">{modalMessage}</p>
              </div>
              <div className="modal-footer border-0 justify-content-center">
                <button type="button" className="btn btn-success" onClick={closeSuccessModal}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'erreur */}
      {showErrorModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content error-modal">
              <div className="modal-header border-0">
                <button type="button" className="btn-close" onClick={closeErrorModal}></button>
              </div>
              <div className="modal-body text-center">
                <FaExclamationTriangle className="text-danger mb-3" style={{ fontSize: '3rem' }} />
                <h4 className="text-danger mb-3">Oups !</h4>
                <p className="mb-0">{modalMessage}</p>
              </div>
              <div className="modal-footer border-0 justify-content-center">
                <button type="button" className="btn btn-danger" onClick={closeErrorModal}>
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};