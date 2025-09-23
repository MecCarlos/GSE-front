import React, { useState } from "react";
import { Link } from "react-router-dom";
import pixelw3 from "../assets/images/pixelw3.png";
import ipad from "../assets/images/ipad.png";
import awatch from "../assets/images/watch.png";
import macbook1 from "../assets/images/macbook1.png";
import airpod4 from "../assets/images/AirPods_4.png";
import airpodmax5 from "../assets/images/AirPodsMax5.png";
import "../Style/common/produit_img.css";

const Produits = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { name: "Google Pixelwatch", price: 210000, image: pixelw3, color: "gray", reduc: "15%" },
    { name: "iPad 128Go", price: 210000, image: ipad, color: "pink", reduc: "15%" },
    { name: "Apple Watch Serie X", price: 210000, image: awatch, color: "blue", reduc: "15%" },
    { name: "Macbook Air M4", price: 210000, image: macbook1, color: "purple", reduc: "15%" },
    { name: "Apple Airpod 4", price: 210000, image: airpod4, color: "gray", reduc: "15%" },
    { name: "Apple Airpod Max", price: 210000, image: airpodmax5, color: "gold", reduc: "15%" }
  ];

  return (
    <section className="container my-5 mt-6">
      <div className="text-center">
        <h3 className="mb-4">Nos Produits</h3>
      </div>

      {/* Liste produits */}
      <div className="pdt_box">
        {products.map((p, i) => (
          <div key={i} className={`element ${p.color}`} onClick={() => setSelectedProduct(p)}>
            <div className="left">
              <h6 className="reduc">{p.reduc}</h6>
              <h4 className="nom">{p.name}</h4>
              <p className="nom">{p.price.toLocaleString()}<span>F</span></p>
              <button className="rounded-pill">Ajouter au panier</button>
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
