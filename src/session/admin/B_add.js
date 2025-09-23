import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAddShoppingCart } from "react-icons/md";
import axios from 'axios';
import logo from '../../assets/images/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Style/common/boutton.css';

/* ---------- ImageUploader ---------- */
const ImageUploader = ({ currentImage, onChange }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const fileInputRef = useRef();

  const handleFileSelect = (file) => {
    if (file && file.type && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleClick = () => fileInputRef.current.click();
  const handleFileChange = (e) => handleFileSelect(e.target.files[0]);
  const handleDrop = (e) => { e.preventDefault(); handleFileSelect(e.dataTransfer.files[0]); };
  const handleRemove = () => { setPreview(null); onChange(null); };

  return (
    <div onClick={handleClick} onDrop={handleDrop} onDragOver={e => e.preventDefault()}
      style={{
        width: 120, height: 120, border: "2px dashed #ccc", borderRadius: 8,
        display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer",
        position: "relative", background: "#f9f9f9", marginRight: 10
      }}>
      <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
      {preview ? (
        <>
          <img src={preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
          <button onClick={e => { e.stopPropagation(); handleRemove(); }}
            style={{
              position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)",
              color: "white", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer"
            }}>×</button>
        </>
      ) : <p style={{ fontSize: 12, color: "#999", textAlign: "center" }}>Glissez / Cliquez</p>}
    </div>
  );
};

/* ---------- mapping catégorie -> options disponibles ---------- */
const optionsParType = {
  PC: ['Couleur', 'Type', 'RAM', 'Stockage'],
  Telephone: ['Model','Couleur', 'Stockage'],
  Tablette: ['Model','Couleur', 'Stockage'],
  Ecouteur: ['Couleur','Connexion','ANC'],
  Casque_audio: ['Couleur','Type','Connexion','ANC'],
  Webcam: ['Résolution','Connexion'],
  Microphone: ['Type','Connexion'],
  Disque_dur: ['Type', 'Connectique', 'Capacité'],
  clavier: ['Type', 'Connectique'],
  souris: ['Type', 'Connectique'],
  Ecran: ['Type','Taille', 'Résolution'],
  Imprimante: ['Type', 'Couleur'],
  cable: ['Connectivité', 'Longueur','section'],
  baie: ['Type', 'Taille'],
  Routeur: ['Type', 'Vitesse'],
  switch: ['Type', 'Ports'],
  Camera: ['Type', 'Résolution'],
  Panneau_solaire: ['Puissance', 'Tension', 'Type', 'Dimensions','Capacité'],
  Onduleur: ['Puissance', 'Autonomie'],
  Regulateur: ['Type', 'Tension_entree', 'Tension_sortie'],
  Batterie_solaire: ['Capacité', 'Tension'],
  Lampe: ['Type', 'Puissance', 'Couleur','Tension'],
  Parabole: ['Type', 'Taille'],
  Décodeur: ['Type'],
};

/* ---------- valeurs prédéfinies (par option) ---------- */
const optionValues = {
  Marque: ["Apple", "Samsung", "Dell", "HP", "Lenovo", "Asus", "Acer", "Microsoft", "Sony", "LG", "Huawei", "Xiaomi", "OnePlus"],
  RAM: ["4 Go", "8 Go", "16 Go", "32 Go"],
  Capacité: ["32 Go","64 Go","128 Go","256 Go","512 Go","1 To","2 To"],
  Stockage: ["32 Go","64 Go","128 Go","256 Go","512 Go","1 To","2 To"],
  ANC: ["Oui", "Non"],
  Connexion: ["USB", "Bluetooth", "WiFi", "Jack", "USB-C"],
  Couleur: ["Noir", "Blanc", "Bleu", "Rouge", "Gris", "Or", "Argent","Corail","Vert","Violet","Jaune","Rose"],
  // fallback générique pour Type (si aucune override catégorie)
  Model: ["Standard", "Pro", "Lite", "Max","Pro Max", "Ultra", "Plus", "Mini", "Air"],
  Type: ["Standard","Filaire", "Sans fil","Canal +","Strong"],
  Connectique: ["USB", "USB-C", "Thunderbolt", "SATA", "NVMe", "Ethernet", "WiFi"],
  Résolution: ["720p", "1080p", "1440p", "4K"],
  Longueur: ["0.5 m", "1 m", "2 m", "3 m", "5 m", "10 m", "15 m", "20 m", "30 m", "50 m"],
  Taille: ["24 pouces", "27 pouces", "32 pouces", "34 pouces", "40 pouces", "50 pouces", "55 pouces", "65 pouces"],
  Vitesse: ["300 Mbps", "600 Mbps", "1 Gbps", "2.5 Gbps", "5 Gbps", "10 Gbps"],
  Ports: ["5", "8", "16", "24", "48"],
  Puissance: ["50W", "100W", "150W", "200W", "250W", "300W", "500W", "1000W"],
  Tension_entree: ["12V", "24V", "48V", "120V", "230V", "400V"],
  Tension_sortie: ["12V", "24V", "48V", "120V", "230V", "400V"],
  Tension: ["12V", "24V", "48V", "110V", "220V", "230V", "240V"],
  Capacité: ["50 Ah", "100 Ah", "150 Ah", "200 Ah", "300 Ah", "400 Ah", "500 Ah", "600 Ah", "800 Ah", "1000 Ah"],
  Autonomie: ["30 min", "1 heure", "2 heures", "4 heures", "8 heures", "12 heures", "24 heures"],
  Dimensions: ["100x50 cm", "120x60 cm", "150x75 cm", "200x100 cm"],
  Connectivité: ["Standard","HDMI", "DisplayPort", "VGA", "DVI", "Ethernet", "Fiber","Panneau solaire"],
  Section: ["standard","1 mm²", "1.5 mm²", "2.5 mm²", "4 mm²", "6 mm²", "10 mm²"],
};

/* ---------- overrides pour "Type" par catégorie ---------- */
const optionValuesByCategory = {
  PC: { Type: ["Portable", "Fixe", "2-en-1"] },
  Telephone: {},
  Tablette: { Type: ["Standard", "Pro", "Lite", "Mini", "Max"] },
  Webcam: { Type: ["Standard", "HD", "Full HD", "4K"] },
  Microphone: { Type: ["Dynamique", "Condenser", "USB", "XLR"] },
  clavier: { Type: ["Mécanique", "Membrane", "Low-profile", "Rubber-dome"] },
  souris: { Type: ["Optique", "Laser", "Gaming", "Sans fil", "Filaire"] },
  Ecran: { Type: ["LCD", "LED", "IPS", "OLED"] },
  Disque_dur: { Type: ["HDD", "SSD SATA", "NVMe SSD"] },
  Imprimante: { Type: ["Jet d'encre", "Laser", "Thermique"] },
  Lampe: { Type: ["LED", "Ampoule", "Lampadaire"] },
  Ecouteur: { Type: ["Filaire", "Sans fil"] },
  Casque_audio: { Type: ["Bluetooth", "Filaire", "Gaming"] },
  Routeur: { Type: ["ADSL", "Fiber", "Mesh"] },
  switch: { Type: ["Managed", "Unmanaged", "PoE"] },
  Camera: { Type: ["IP", "Analogique", "Dôme", "Bullet"] },
  Panneau_solaire: { Type: ["Monocristallin", "Polycristallin", "Amorphe"] },
  Cable: { Type: ["HDMI", "DisplayPort", "Ethernet", "USB", "USB-C", "Audio"] },
  Batterie_solaire: { Type: ["Gel", "AGM", "Lithium-ion"] },
  Regulateur: { Type: ["MPPT", "PWM", "Tension entrer", "Tension sortie", "Puissance"] },
  Onduleur: { Type: [ "Capacité", "Tension", "Autonomie"] },
  // ajoute d'autres overrides si besoin
};

/* ---------- helper pour obtenir choix d'une option ---------- */
const getChoices = (opt, categorie) => {
  if (categorie && optionValuesByCategory[categorie] && optionValuesByCategory[categorie][opt]) {
    return optionValuesByCategory[categorie][opt];
  }
  return optionValues[opt] || null;
};

/* ---------- Composant principal ---------- */
const B_add = ({ refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nom: '', categorie: '', description: '' });
  const [variantes, setVariantes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Quand on change la catégorie on met à jour les clés d'options existantes des variantes
     pour inclure 'Type' et autres si nécessaire (conserve les valeurs déjà saisies). */
  const handleCategoryChange = (cat) => {
    setFormData(prev => ({ ...prev, categorie: cat }));
    setVariantes(prev => prev.map(v => {
      const keys = optionsParType[cat] || [];
      const newOptions = {};
      keys.forEach(k => {
        newOptions[k] = (v.options && v.options[k] !== undefined) ? v.options[k] : '';
      });
      return { ...v, options: newOptions };
    }));
  };

  const addVariante = () => {
    const opts = optionsParType[formData.categorie]?.reduce((acc, nom) => { acc[nom] = ''; return acc; }, {}) || {};
    setVariantes(prev => [...prev, {
      options: opts,
      images: { principale: null, image_1: null, image_2: null },
      quantite: 0,
      prix: '',
      prix_promo: ''
    }]);
  };

  const handleChangeOption = (index, key, value) => {
    setVariantes(prev => {
      const cp = [...prev];
      cp[index] = { ...cp[index], options: { ...cp[index].options, [key]: value } };
      return cp;
    });
  };

  const handleImageChange = (index, key, file) => {
    setVariantes(prev => {
      const cp = [...prev];
      cp[index] = { ...cp[index], images: { ...cp[index].images, [key]: file } };
      return cp;
    });
  };

  const handleQuantiteChange = (index, value) => {
    setVariantes(prev => {
      const cp = [...prev];
      cp[index] = { ...cp[index], quantite: value };
      return cp;
    });
  };

  const handlePrixChange = (index, type, value) => {
    setVariantes(prev => {
      const cp = [...prev];
      cp[index] = { ...cp[index], [type]: value };
      return cp;
    });
  };

  const handleRemoveVariante = (index) => {
    setVariantes(prev => {
      const cp = [...prev];
      cp.splice(index, 1);
      return cp;
    });
  };

  /* rendu générique d'un champ d'option : select si on a des choices, sinon input text */
  const renderOptionField = (opt, v, i) => {
    const choices = getChoices(opt, formData.categorie);
    const value = v.options[opt] ?? '';
    if (choices && choices.length) {
      return (
        <select
          className="form-control mb-2"
          value={value}
          onChange={e => handleChangeOption(i, opt, e.target.value)}
          required
        >
          <option value="">-- Choisir --</option>
          {choices.map(val => <option key={val} value={val}>{val}</option>)}
        </select>
      );
    }
    // fallback input texte
    return (
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={e => handleChangeOption(i, opt, e.target.value)}
        required
      />
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k,v]) => data.append(k, v ?? ''));
      // on envoie variantes sans les File objects (le back reconstruit / on uploadera fichiers à côté)
      data.append('variantes', JSON.stringify(variantes.map(v => ({
        options: v.options, quantite: v.quantite, prix: v.prix, prix_promo: v.prix_promo
      }))));

      // attacher les fichiers pour chaque variante
      variantes.forEach((v, i) => {
        Object.entries(v.images || {}).forEach(([key, file]) => {
          if (file instanceof File) data.append(`images_${i}_${key}`, file);
        });
      });

      await axios.post('http://localhost:3001/api/adm/add/produits', data);
      toast.success("Produit ajouté avec succès !", { autoClose: 1000 });
      if (refresh) refresh();
      setFormData({ nom:'', categorie:'', description:'' });
      setVariantes([]);
      setIsModalOpen(false);
    } catch(err) {
      console.error(err);
      toast.error("Erreur lors de l'enregistrement.", { autoClose: 1000 });
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <ToastContainer />
      <motion.button className="floating-button" onClick={() => setIsModalOpen(true)}>
        <MdAddShoppingCart size={20} />
      </motion.button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="modal-overlay" onClick={()=>setIsModalOpen(false)}>
            <motion.div className="modal-content" style={{borderRadius:"10px"}} onClick={e=>e.stopPropagation()}>
              <div className="contentz">
                <div className="align-items-center mb-1"><img src={logo} alt="Logo" className="mb-3"/></div>

                <form onSubmit={handleSubmit}>
                  <div className="row m-0">
                    <div className="col-12 col-md-6 mb-3">
                      <label>Nom du produit</label>
                      <input type="text" value={formData.nom} onChange={e=>setFormData({...formData, nom:e.target.value})} className="form-control" required/>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <label>Catégorie</label>
                      <select value={formData.categorie} onChange={e=>handleCategoryChange(e.target.value)} className="form-control" required>
                        <option value="">-- Choisir une catégorie --</option>
                        {Object.keys(optionsParType).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>

                    <div className="col-12 mb-3">
                      <label>Description</label>
                      <textarea value={formData.description} onChange={e=>setFormData({...formData, description:e.target.value})} className="form-control" rows={3} />
                    </div>

                    <hr/><h6>Variantes</h6>

                    {variantes.map((v,i)=>(
                      <div key={i} className="border p-2 mb-3">
                        <div className='mb-2'>
                          <button type="button" className="btn btn-sm btn-danger float-end" onClick={()=>handleRemoveVariante(i)}>Supprimer</button>
                        </div>

                        {Object.keys(v.options).map(opt => (
                          <div key={opt} className="mb-2">
                            <label>{opt}</label>
                            {renderOptionField(opt, v, i)}
                          </div>
                        ))}

                        <div className="mb-2">
                          <label>Quantité</label>
                          <input type="number" value={v.quantite} onChange={e=>handleQuantiteChange(i,e.target.value)} className="form-control" />
                        </div>

                        <div className="mb-2">
                          <label>Prix</label>
                          <input type="number" value={v.prix || ''} onChange={e=>handlePrixChange(i,'prix',e.target.value)} className="form-control" />
                        </div>
                        <div className="mb-2">
                          <label>Prix promo</label>
                          <input type="number" value={v.prix_promo || ''} onChange={e=>handlePrixChange(i,'prix_promo',e.target.value)} className="form-control" />
                        </div>

                        <div className="mb-2">
                          <label>Images (1 principale + 2 secondaires)</label>
                          <br/>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <ImageUploader currentImage={v.images.principale} onChange={file=>handleImageChange(i,"principale",file)} />
                            <ImageUploader currentImage={v.images.image_1} onChange={file=>handleImageChange(i,"image_1",file)} />
                            <ImageUploader currentImage={v.images.image_2} onChange={file=>handleImageChange(i,"image_2",file)} />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className='d-flex justify-content-between align-items-center'>
                      <button type="button" className="variant_btn" onClick={addVariante}>+ Variante</button>
                      <button type="submit" className="btn-success enr_btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default B_add;
