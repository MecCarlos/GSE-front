import Footer from "../../components/Footer";
import ProduitCalaogue from "../../components/ProduitCatalogue";
import "../../Style/common/catalogue.css";

export const Catalogue = () => {
  return (
    <div className="home_page">
      <ProduitCalaogue />

      <Footer />
    </div>
  );
};
