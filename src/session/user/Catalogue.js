
import Footer from "../../components/Footer";
import ProduitCalaogue from "../../components/ProduitCatalogue";
import "../../Style/common/catalogue.css";


export const Catalogue = () => { 

   

    return (
        <div className="home_page">
            <div className="home_content catalogue">
                
                <header>
                <h1>catalogue</h1>
                </header>
            </div>
            
            <ProduitCalaogue/>

            {/* Footer */}
            <Footer/>
        </div>

        
    );
}