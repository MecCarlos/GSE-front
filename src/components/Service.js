import { FaBolt, FaSun, FaPaintBrush, FaTruck } from "react-icons/fa";
import '../Style/common/service.css'; 
import { Link } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Service = () => {
  return (
    <div className="row my-5 service-section text-white px-3">
        <div className="col-md-3 mb-4">
            <div className="service-box bg-electric p-4 rounded">
                <FaBolt size={40} className="mb-3 icon" />
                <h5>Installation Électrique</h5>
                <p>Installation fiable et professionnelle pour vos bâtiments.</p>
                <br />
                <Link to="/" className="link">En savoire plus <MdOutlineArrowForwardIos /></Link>
            </div>
        </div>

        <div className="col-md-3 mb-4">
            <div className="service-box bg-solar p-4 rounded">
                <FaSun size={40} className="mb-3 icon" />
            <h5>Énergie Solaire</h5>
            <p>Solutions solaires écologiques pour une énergie durable.</p>
            <br />
            <Link to="/" className="link">En savoire plus <MdOutlineArrowForwardIos /></Link>
        </div>
      </div>

        <div className="col-md-3 mb-4">
            <div className="service-box bg-design p-4 rounded ">
                <FaPaintBrush size={40} className="mb-3 icon" />
                <h5>Design Graphique</h5>
                <p>Création de logos, affiches, flyers, réseaux sociaux...</p>
                <br />
                <Link to="/" className="link">En savoire plus <MdOutlineArrowForwardIos /></Link>
            </div>
        </div>

        <div className="col-md-3 mb-4">
            <div className="service-box bg-vente p-4 rounded ">
                <FaTruck size={40} className="mb-3 icon" />
                <h5>Vente & Livraison</h5>
                <p>Produits livrés rapidement à votre porte avec garantie qualité.</p>
                <br />
            <Link to="/" className="link">En savoire plus <MdOutlineArrowForwardIos /></Link>
        </div>
      </div>
    </div>
  );
};

export default Service;
