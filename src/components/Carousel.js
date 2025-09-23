import React from "react";
import "../Style/common/carousel.css"; 
import { NavLink } from "react-router-dom";

import ipad from "../../src/assets/images/ipad.png";
import iph13 from "../../src/assets/images/iph13.png";
import macbook1 from "../../src/assets/images/macbook1.png";
import macbook2 from "../../src/assets/images/macbook2.png";
import airpodpro from "../../src/assets/images/airpod.png";
import souris from "../../src/assets/images/sourisstyle.png";

const Carousel = () => {
  const products = [
    { img: ipad, name: "iPad", url: "/produit/ipad" },
    { img: iph13, name: "iPhone 13", url: "/login" },
    { img: macbook1, name: "MacBook Pro", url: "/login" },
    { img: macbook2, name: "MacBook Air", url: "/login" },
    { img: airpodpro, name: "AirPods Pro 3", url: "/login" },
    { img: souris, name: "Souris", url: "/login" }
  ];

  return (
    <div className="carousel">
      {/* <h6>Nos catégories</h6> */}
      <div className="bande">
        {products.concat(products).map((p, i) => (
          <NavLink key={i} to={p.url} className="elem">
            <img className="c_img" src={p.img} alt={p.name} />
            <h6>{p.name}</h6>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
