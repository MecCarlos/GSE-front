import React from 'react';
import Topadmin from '../../components/Topadmin';

export const A_accueil = () => {
  return (
    <div className="home_page">
      <div className="home_content">
        <Topadmin/>
      </div>
      
      {/* Message hello */}
      <div className="hello_box">
        
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 Votre Entreprise. Tous droits réservés.</p>
      </footer>
    </div>
  );
}