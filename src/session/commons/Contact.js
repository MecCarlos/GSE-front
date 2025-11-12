import { ContactComp } from "../../components/ContactComp";
import Footer from "../../components/Footer";
import "../../Style/common/contact.css";

export const Contact = () => { 
  return (
    <div className="home_page">
      <div className="home_content contact_page">
        {/* <header className="contact_header_simple">
          <div className="header_content">
            <h1>Contactez-Nous</h1>
            <p className="header_subtitle">
              Nous sommes là pour répondre à toutes vos questions
            </p>
          </div>
        </header> */}

        {/* Le corps du formulaire et des infos */}
        <ContactComp />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};