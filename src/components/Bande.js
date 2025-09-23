import React from "react";
import "../Style/common/bande.css";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { LiaCertificateSolid } from "react-icons/lia";
import { TbHeadphones } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";

const Bande = () => { 
  const items = [
    { icon: MdOutlineDeliveryDining, title: "Livraison", text: "Livraison disponible" },
    { icon: LiaCertificateSolid, title: "Produit garanti", text: "Produit certifié et garanti" },
    { icon: TbHeadphones, title: "Support en ligne 24/7", text: "Support technique disponible" },
    { icon: IoWalletOutline, title: "Paiement sécurisé", text: "Paiement en ligne sécurisé" },
  ];

  return (
    <div className="bandex">
      {items.map((p, i) => {
        const Icon = p.icon;
        return (
          <div className="bandex-item" key={i}>
            <Icon className="bandex-icon" />
            <div className="bandex-text">
              <h6>{p.title}</h6>
              <p>{p.text}</p>
            </div> 
          </div>
        );
      })}
    </div>
  );
};

export default Bande;
