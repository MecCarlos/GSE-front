import '../../Style/common/catalogue.css';
import Produit_adm from '../../components/Produit_catalogue_adm';


export const A_catalogue = () => {
  return (
    <div className="home_page">
      <div className="home_content catalogue">
        {/* <Topadmin/> */}
        <header>
          <h1>catalogue</h1>
        </header>
      </div>

      <div className="product_box">
      <Produit_adm/>
      </div>


      {/* </> */}
      
    </div>
  );
}