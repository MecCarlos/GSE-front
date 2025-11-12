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
    <div className="bande-component">
      {items.map((p, i) => {
        const Icon = p.icon;
        return (
          <div className="bande-item" key={i}>
            <Icon className="bande-item-icon" />
            <div className="bande-item-text">
              <h6 className="bande-item-title">{p.title}</h6>
              <p className="bande-item-description">{p.text}</p>
            </div> 
          </div>
        );
      })}
    </div>
  );
};

export default Bande;