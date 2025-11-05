import React, { useEffect, useState } from "react";
import { Modal, Button, Toast, ToastContainer } from "react-bootstrap";
import { useCart } from "../Context/CartContext.js";

const ProduitCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:3001/api/adm/rec/produits")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const cats = ["Tous", ...new Set(data.map((p) => p.categorie))];
        setCategories(cats);
      })
      .catch((err) => console.error("Erreur chargement produits:", err));
  }, []);

  const handleFilter = (cat) => {
    setSelectedCategory(cat);
    if (cat === "Tous") setFilteredProducts(products);
    else setFilteredProducts(products.filter((p) => p.categorie === cat));
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setSelectedVariantIndex(0);
    setSelectedImage(product.variantes?.[0]?.images?.principale || "default.png");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setSelectedVariantIndex(0);
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleAddToCart = (product, variantIndex = 0) => {
    addToCart({ product, variantIndex, quantity: 1 });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <section className="produit_box">
      <h6>Découvrez nos produits</h6>

      <div className="categorie-bar d-flex flex-wrap gap-2 mb-3" style={{ alignItems: "center" }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={selectedCategory === cat ? "primary" : "outline-primary"}
            onClick={() => handleFilter(cat)}
            style={{ textTransform: "capitalize" }}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="produit">
        {Array.isArray(filteredProducts) &&
          filteredProducts.map((p, i) => {
            const firstVariant = p.variantes?.[0];
            const mainImage = firstVariant?.images?.principale || "default.png";
            return (
              <div
                key={i}
                className="pdt"
                onClick={() => handleOpenModal(p)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty("--x", `${x}px`);
                  e.currentTarget.style.setProperty("--y", `${y}px`);
                }}
              >
                <img
                  className="pdt_img"
                  src={`http://localhost:3001/uploads/${mainImage}`}
                  alt={p.nom}
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
                <div className="zone_info">
                  <h6>{p.nom}</h6>
                  <div className="d-flex">
                    <p className="promo">{firstVariant?.prix_promo || firstVariant?.prix} F</p>
                    {firstVariant?.prix_promo && <p className="prix">{firstVariant.prix} F</p>}
                  </div>
                  <Button
                    className="panier"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(p, 0);
                    }}
                  >
                    Panier
                  </Button>
                </div>
              </div>
            );
          })}
      </div>

      {/* Modal produit */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} centered dialogClassName="modal-lg-custom">
          <Modal.Body>
            <div className="row align-items-center p-2">
              <div className="col-md-6 text-center">
                <img
                  src={`http://localhost:3001/uploads/${selectedImage}`}
                  alt={selectedProduct.nom}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <div className="mt-2 d-flex justify-content-center gap-2">
                  {["principale", "image_1", "image_2"].map((key) => {
                    const img = selectedProduct.variantes?.[selectedVariantIndex]?.images?.[key];
                    if (!img) return null;
                    return (
                      <img
                        key={key}
                        src={`http://localhost:3001/uploads/${img}`}
                        alt={key}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          cursor: "pointer",
                          border: selectedImage === img ? "2px solid navy" : "1px solid #ccc",
                          borderRadius: "5px",
                        }}
                        onClick={() => setSelectedImage(img)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="col-md-6 text-center">
                <h5>{selectedProduct.nom} {selectedProduct.model}</h5>
                <p>
                  <span className="text-danger product-prix" style={{ textDecoration: "line-through" }}>
                    {selectedProduct.variantes?.[selectedVariantIndex]?.prix} FCFA
                  </span>
                  <br />
                  <span className="text-primary product-prix">
                    {selectedProduct.variantes?.[selectedVariantIndex]?.prix_promo ||
                      selectedProduct.variantes?.[selectedVariantIndex]?.prix} FCFA
                  </span>
                </p>
                <p>{selectedProduct.variantes?.[selectedVariantIndex]?.quantite > 0 ? "En stock" : "Rupture"}</p>

                {selectedProduct.variantes && selectedProduct.variantes.length > 1 && (
                  <select
                    className="form-control"
                    value={selectedVariantIndex}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      setSelectedVariantIndex(idx);
                      setSelectedImage(
                        selectedProduct.variantes?.[idx]?.images?.principale || "default.png"
                      );
                    }}
                  >
                    {selectedProduct.variantes.map((v, idx) => (
                      <option key={idx} value={idx}>
                        {Object.values(v.options).join(" / ")}
                      </option>
                    ))}
                  </select>
                )}

                <p className="product-description">{selectedProduct.description}</p>

                <Button
                  className="mt-2 panier"
                  style={{
                    backgroundColor: "lavender",
                    color: "navy",
                    padding: "3%",
                    fontWeight: "normal",
                    borderRadius: "10px",
                    border: "none",
                  }}
                  onClick={() => handleAddToCart(selectedProduct, selectedVariantIndex)}
                >
                  Panier
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} bg="success" onClose={() => setShowToast(false)} delay={2000} autohide>
          <Toast.Body style={{ color: "white" }}>✅ Produit ajouté au panier !</Toast.Body>
        </Toast>
      </ToastContainer>
    </section>
  );
};

export default ProduitCatalogue;
