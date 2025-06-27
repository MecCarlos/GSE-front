import React from "react";

const Avis = () => {
  const testimonials = [
    {
      name: "Sarah A.",
      location: "Calavi",
      text: "Commande reçue rapidement. Produits de qualité. Je recommande vivement !",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Jérôme K.",
      location: "Parakou",
      text: "Super service client. Livraison rapide et efficace.",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Aïcha D.",
      location: "Porto-Novo",
      text: "Site fiable. C’est ma 3e commande et toujours satisfaite.",
      photo: "https://randomuser.me/api/portraits/women/45.jpg",
    },
  ];

  return (
    <section className="container my-5">
      <h4 className="text-center mb-4">💬 Ce que disent nos clients</h4>
      <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
          {testimonials.map((item, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div className="d-flex justify-content-center">
                <div className="card p-4 text-center shadow-sm w-75">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="rounded-circle mx-auto mb-3"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <p className="fst-italic">“{item.text}”</p>
                  <strong>{item.name}, {item.location}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" />
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" />
        </button>
      </div>
    </section>
  );
};

export default Avis;
