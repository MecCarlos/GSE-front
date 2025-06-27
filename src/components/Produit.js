import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/common/produit.css";

const products = [
  { id: 1, name: "Asus RX5", price: 12000, image: "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg?auto=webp&quality=75&crop=1.91:1&width=1200", description: "Puissant laptop pour les gamers exigeants, 16GB RAM, SSD 512Go.", },
  { id: 2, name: "Asus Zenbook", price: 15000, image: "https://media.cnn.com/api/v1/images/stellar/prod/asus-zenbook-duo-cnnu-001.jpg?c=16x9&q=h_833,w_1480,c_fill" },
  { id: 4, name: "hp core i9", price: 17000, image: "https://cdn.mos.cms.futurecdn.net/pyL3b8cis5dcmUvgbe9ygV.jpg" },
  { id: 6, name: "Clavier gameur", price: 13500, image: "https://img.20mn.fr/xfn5eCcLQMey7Cxaz3gXBCk/1444x920_gaming-keyboard-with-rgb-light-white-mechanical-keyboard-with-backlight" },
  { id: 5, name: "Ipad 5", price: 11000, image: "https://cdn.thewirecutter.com/wp-content/media/2025/03/BEST-IPAD-2048px-m3-case-1.jpg?auto=webp&quality=75&width=1024" },
  { id: 3, name: "Samsung ZFold 5", price: 9000,  image: "https://crackberry.com/sites/crackberry.com/files/styles/large_wm_brw/public/article_images/2024/07/samsung-galaxy-z-fold-6-review-45.jpg" },
  { id: 7, name: "Produit 7", price: 8000,  image: "https://media.cnn.com/api/v1/images/stellar/prod/asus-zenbook-duo-cnnu-001.jpg?c=16x9&q=h_833,w_1480,c_fill" },
  { id: 8, name: "Produit 8", price: 16000, image: "https://helios-i.mashable.com/imagery/reviews/00QF4O4xLw2fQsBydDx1SQa/hero-image.fill.size_1248x702.v1729587520.jpg" },
  { id: 9, name: "Produit 9", price: 14000, image: "https://www.itaf.eu/wp-content/uploads/2021/01/Best-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg" },
  { id: 9, name: "Produit 9", price: 14000, image: "https://www.itaf.eu/wp-content/uploads/2021/01/Best-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg" },
  { id: 9, name: "Produit 9", price: 14000, image: "https://www.itaf.eu/wp-content/uploads/2021/01/Best-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg" },
  { id: 9, name: "Produit 9", price: 14000, image: "https://www.itaf.eu/wp-content/uploads/2021/01/Best-laptops-in-2021-7-things-to-consider-when-buying-a-laptop.jpg" },
];

const Produit = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    alert(`Ajouté au panier : ${product.name}`);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="container my-5 mt-6">
        <div className="text-center">
            <h3 className="mb-4">🛍️ Nos Produits</h3>
        </div>
        <div className="row">
            {products.map(product => (
            <div key={product.id} className="col-md-3 mb-4">
                <div className="card h-100 shadow-sm">
                <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ cursor: "pointer" }}
                    onClick={() => openModal(product)}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-success fw-bold">{product.price.toLocaleString()} FCFA</p>
                    <div className=" text-center" >
                        <button
                        className="btn mt-auto w-75 rounded-pill"
                        onClick={() => handleAddToCart(product)}
                        id="add_btn"
                        >
                        Ajouter au panier
                        </button>
                    </div>
                </div>
            </div>
          </div>
        ))}
        </div>

        <div className="text-center mt-3">
            <Link to="/produits" className="btn btn-outline-dark rounded-pill">
                Voir plus de produits
            </Link>
        </div>

      

        {/* Modal */}
        {selectedProduct && (
            <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            onClick={closeModal}
            >
                <div
                className="modal-dialog modal-dialog-centered"
                onClick={e => e.stopPropagation()} // empêcher la fermeture quand on clique à l’intérieur
                >
                <div className="modal-content">
                    {/* <div className="modal-header">
                        <h5 className="modal-title">{selectedProduct.name}</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div> */}
                    <div className="modal-body">
                        <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="img-fluid mb-3"
                        />
                        <h5>{selectedProduct.name}</h5>
                        <p>{selectedProduct.description}</p>
                        <p className="fw-bold text-success">{selectedProduct.price.toLocaleString()} FCFA</p>
                    </div>
                    <div className="modal-footer">
                        {/* <button className="btn btn-secondary" onClick={closeModal}>
                        Fermer
                        </button> */}
                        <button
                        className="btn btn-primary rounded-pill"
                        onClick={() => {
                            handleAddToCart(selectedProduct);
                            closeModal();
                        }}
                    >
                    Ajouter au panier
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Produit;
