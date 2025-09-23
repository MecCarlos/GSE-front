
import "../../Style/common/home.css";
import Footer from "../../components/Footer";
import Topuser from "../../components/Topuser";
import ProduitCalaogue from "../../components/ProduitCatalogue";


export const Catalogue = () => { 

   

    return (
        <div className="home_page">
            <div className="home_content">
                <Topuser/>
                <header>
                <h1>catalogue</h1>
                </header>
            </div>
            
            {/* Message hello */}
            {/* <div className="hello_box">
                <div className="home_text text-white">
                    <h1>Découvrez nos produits de qualité, conçus pour répondre à vos besoins.</h1>
                    <p></p>
                </div>
            </div> */}

            <ProduitCalaogue/>

            

            

            {/* Footer */}
            <Footer/>
        </div>

        
    );
}