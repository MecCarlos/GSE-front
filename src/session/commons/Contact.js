import { ContactComp } from "../../components/ContactComp";
import Footer from "../../components/Footer";
import "../../Style/common/contact.css";

export const Contact = () => { 
  return (
    <div className="home_page">
      <div className="home_content contact_page">

        <ContactComp />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};