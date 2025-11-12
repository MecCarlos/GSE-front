import React, { useState } from "react";
import routeur from "../assets/images/router.png";
import ipad from "../assets/images/ipad.png";
import camera from "../assets/images/cam2.png";
import asus from "../assets/images/asus2.png";
import airpod4 from "../assets/images/AirPods_4.png";
import iph3 from "../assets/images/iph3.png";
import "../Style/common/produit_img.css";

const Produits = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { name: "Routeur", price: 2100000, image: routeur, color: "gray", reduc: "5%" },
    { name: "Apple iphone", price: 75000, image: iph3, color: "gold", reduc: "10%" },
    { name: "iPad 128Go", price: 210000, image: ipad, color: "pink", reduc: "5%" },
    { name: "Caméra surveillance", price: 51000, image: camera, color: "blue", reduc: "5%" },
    { name: "Apple Airpod 4", price: 9000, image: airpod4, color: "gray", reduc: "5%" },
    { name: "Asus Gaming", price: 3105000, image: asus, color: "purple", reduc: "5%" },
  ];

  // Fonction pour obtenir la couleur du texte basée sur la couleur du produit
  const getPriceColor = (color) => {
    const colorMap = {
      gray: "rgba(209, 208, 208, 1)",
      gold: "rgb(214, 162, 28)",
      pink: "rgb(245, 68, 97)",
      blue: "rgb(33, 180, 238)",
      purple: "rgba(128, 0, 128, 0.8)"
    };
    return colorMap[color] || "#000000";
  };

  return (
    <section className="container my-4 mt-5">
      <div className="text-center">
        <h3 className="mb-3 h3">Nos Produits</h3>
      </div>

      {/* Liste produits */}
      <div className="pdt_box">
        {products.map((p, i) => (
          <div key={i} className={`element ${p.color}`} onClick={() => setSelectedProduct(p)}>
            <div className="left">
              <h6 className="reduc">{p.reduc}</h6>
              <h4 className="nom">{p.name}</h4>
              <p 
                className="prix" 
                style={{ color: getPriceColor(p.color) }}
              >
                {p.price.toLocaleString()}<span>F</span>
              </p>
              <button className="rounded-pill">Explorer</button>
            </div>
            <div className="right">
              <img src={p.image} alt={p.name} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal Produit */}
      {selectedProduct && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setSelectedProduct(null)}>
          <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content p-3 text-center">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="img-fluid mb-3" />
              <h5>{selectedProduct.name}</h5>
              <p className="fw-bold text-success">{selectedProduct.price.toLocaleString()} FCFA</p>
              <button className="btn btn-primary rounded-pill" onClick={() => setSelectedProduct(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Produits;