import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './session/commons/Home';
import "leaflet/dist/leaflet.css";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Accueil } from './session/user/Accueil';
import PrivateRoute from './PrivateRoute';
import { Catalogue } from './session/user/Catalogue';
import { Contact } from './session/commons/Contact';
import { AuthProvider } from './AuthContext';
import { Contactuser } from './session/user/Contactuser';
import { A_accueil } from './session/admin/A_accueil';
import { A_catalogue } from './session/admin/Catalogue';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />

          {/* Page utilisateur */}
          <Route path="/accueil" element={
            <PrivateRoute>
              <Accueil />
            </PrivateRoute>
          } />
          <Route path="/catalogue" element={
            <PrivateRoute>
              <Catalogue />
            </PrivateRoute>
          } />

          <Route path="/Contact_utilisateur" element={
            <PrivateRoute>
              <Contactuser />
            </PrivateRoute>
          } />


          {/* Page admin */}
          <Route path="/admin-accueil" element={
            <PrivateRoute>
              <A_accueil />
            </PrivateRoute>
          } />

          <Route path="/admin-catalogue" element={
            <PrivateRoute>
              <A_catalogue />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

