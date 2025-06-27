import React from 'react';
import Topadmin from '../../components/Topadmin';
import B_add from './B_add';

export const A_catalogue = () => {
  return (
    <div className="home_page">
      <div className="home_content">
        <Topadmin/>
      </div>
      
      {/* Message hello */}
      <div className="product_box">
        
      </div>

      <B_add/>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 GildasEmpireService. Tous droits réservés.</p>
      </footer>
    </div>
  );
}