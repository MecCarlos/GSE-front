
import Footer from "../../components/Footer";
import ProduitCalaogue from "../../components/ProduitCatalogue";
import "../../Style/common/catalogue.css";


export const Catalogue = () => { 

    return (
        <div className="home_page">
            <div className="home_content catalogue">
                
          {/* <header className="contact_header_simple">
          <div className="header_content">
            <h1>Contactez-Nous</h1>
            <p className="header_subtitle">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>
        </header> */}
            </div>
            
            <ProduitCalaogue/>

            {/* Footer */}
            <Footer/>
        </div>

        
    );
}