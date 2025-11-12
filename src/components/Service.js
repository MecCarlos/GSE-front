import { FaBolt, FaSun, FaPaintBrush, FaTruck } from "react-icons/fa";
import '../Style/common/service.css'; 
import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Service = () => {
  return (
    <>
        <section className="section services">
            <div className="container">
                {/* TITRE CENTRÉ */}
                <div className="section-title text-center mb-4">
                    <h3 className="service-title">Services</h3>
                </div>
                <div className="row service-section text-white px-2">
                    <div className="col-md-3 mb-3">
                        <div className="service-box bg-electric p-3 rounded">
                            <FaBolt size={35} className="mb-2 icon" />
                            <h5>Installation Électrique</h5>
                            <p>Installation fiable et professionnelle pour vos bâtiments.</p>
                            <Link to="/" className="link">En savoir plus <MdOutlineArrowForwardIos /></Link>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="service-box bg-solar p-3 rounded">
                            <FaSun size={35} className="mb-2 icon" />
                            <h5>Énergie Solaire</h5>
                            <p>Solutions solaires écologiques pour une énergie durable.</p>
                            <Link to="/" className="link">En savoir plus <MdOutlineArrowForwardIos /></Link>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="service-box bg-design p-3 rounded">
                            <FaPaintBrush size={35} className="mb-2 icon" />
                            <h5>Design Graphique</h5>
                            <p>Création de logos, affiches, flyers, réseaux sociaux...</p>
                            <Link to="/" className="link">En savoir plus <MdOutlineArrowForwardIos /></Link>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <div className="service-box bg-vente p-3 rounded">
                            <FaTruck size={35} className="mb-2 icon" />
                            <h5>Vente & Livraison</h5>
                            <p>Produits livrés rapidement à votre porte avec garantie qualité.</p>
                            <Link to="/" className="link">En savoir plus <MdOutlineArrowForwardIos /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default Service;