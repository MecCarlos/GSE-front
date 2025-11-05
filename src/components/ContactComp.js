import "../Style/common/contact.css";
import { useState } from "react";
import Map from "./Map.js";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';


export const ContactComp = () => {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message envoyé :", form);
    // Appel API ici si besoin
    alert("Votre message a bien été envoyé !"); 
    setForm({ nom: "", email: "", message: "" });
  };

  return (
      <div className="home_page">
      <div className="container my-5 bg-image-fixed contact">
        {/* <div className="hebox">
            <div className="home_text text-white">
            <p>Nous sommes là pour répondre à toutes vos questions.</p>
            </div>
            </div> */}
        <div className="row g-4">
            <h4 className="h3">Contactez-nous</h4>
          {/* Formulaire */}
          <div className="col-md-6 ">
            <div className="card p-4 shadow c_element">
              <h4>Formulaire de contact</h4>
              <form>
                <label className="mt-3">Nom</label>
                <input type="text" placeholder="Votre nom" className="form-control" />

                <label className="mt-3">Email</label>
                <input type="email" placeholder="Votre email" className="form-control" />

                <label className="mt-3">Objet</label>
                <input type="text" placeholder="Objet" className="form-control" />

                <label className="mt-3">Message</label>
                <textarea className="form-control" rows="2.5" placeholder="Votre message..."></textarea>

                <button className="btn mt-4">Envoyer</button>
              </form>
            </div>
          </div>

          {/* Horaires */}
          <div className="col-md-6">
            <div className="card p-4 shadow c_element">
              <h4>Nos horaires</h4>
              <ul className="list-unstyled mt-3">
                <li><strong>Lundi - Vendredi :</strong> 08h - 18h</li>
                <li><strong>Samedi :</strong> 09h - 14h</li>
                <li><strong>Dimanche :</strong> Fermé</li>
              </ul>
              <hr />
              <p className="mb-0">Adresse : Cotonou, Bénin</p>
              <p>Email : contact@votresite.com</p>
              <p>Téléphone : +229 XX XX XX XX</p>
            </div>
            {/* Liens sociaux */}
            <div className="card mt-5 p-4 text-center shadow c_element">
            <h5>Suivez-nous sur les réseaux sociaux</h5>
            <div className="d-flex justify-content-center gap-4 mt-3">
                <a href="#" className="text-primary fs-4"><FaFacebook /></a>
                <a href="#" className="text-danger fs-4"><FaInstagram /></a>
                <a href="#" className="text-info fs-4"><FaTwitter /></a>
                <a href="#" className="text-primary fs-4"><FaLinkedin /></a>
            </div>
            </div>
        </div>

          </div>
        </div>


        <Map />
    </div>
  );
};
