import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "../Style/common/map.css"

// Correction des icônes par défaut de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Position de Pahou
const position = [6.4167, 2.2333];

// Création d'un marqueur personnalisé
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="41" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 27.5 16 41 16 41C16 41 32 27.5 32 16C32 7.163 24.837 0 16 0Z" fill="#001f3f"/>
      <path d="M16 8C12.134 8 9 11.134 9 15C9 18.866 12.134 22 16 22C19.866 22 23 18.866 23 15C23 11.134 19.866 8 16 8Z" fill="white"/>
      <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" fill="#001f3f"/>
    </svg>
  `),
  iconSize: [32, 41],
  iconAnchor: [16, 41],
  popupAnchor: [0, -41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [13, 41]
});

// Marqueur avec une icône bleue alternative
const blueIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="32" height="41" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 27.5 16 41 16 41C16 41 32 27.5 32 16C32 7.163 24.837 0 16 0Z" fill="#001f3f"/>
      <path d="M16 8C12.134 8 9 11.134 9 15C9 18.866 12.134 22 16 22C19.866 22 23 18.866 23 15C23 11.134 19.866 8 16 8Z" fill="white"/>
      <circle cx="16" cy="16" r="4" fill="#001f3f"/>
    </svg>
  `),
  iconSize: [32, 41],
  iconAnchor: [16, 41],
  popupAnchor: [0, -41],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
  className: 'custom-marker'
});

const Map = () => {
  return (
    <div className="map-component w-100" style={{ position: "relative" }}>
      <MapContainer 
        center={position} 
        zoom={15} 
        style={{ height: "400px", borderRadius: "15px" }}
        scrollWheelZoom={false}
        className="leaflet-map"
      >
        {/* Plusieurs options de tuiles */}
        
        {/* Option 1: OpenStreetMap classique */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {/* Option 2: CartoDB (plus moderne) - Décommentez pour utiliser */}
        {/*
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        */}
        
        {/* Option 3: Toner style (élégant) - Décommentez pour utiliser */}
        {/*
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          className="map-tiles"
        />
        */}
        
        {/* Marqueur avec icône personnalisée */}
        <Marker position={position} icon={blueIcon}>
          <Popup className="custom-popup">
            <div className="popup-content text-center">
              <h6 className="fw-bold mb-2" style={{ color: '#001f3f' }}>
                Olatech Corporation
              </h6>
              <p className="mb-1 small">
                <strong>Adresse:</strong> Pahou, Bénin
              </p>
              <p className="mb-1 small">
                <strong>Horaires:</strong> Lun-Sam: 8h-18h
              </p>
              <div className="mt-2">
                <a 
                  href="https://maps.google.com/?q=6.4167,2.2333" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                  style={{ 
                    backgroundColor: '#001f3f', 
                    borderColor: '#001f3f',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem'
                  }}
                >
                  📍 Itinéraire
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Légende en bas de la carte */}
      <div className="map-legend mt-2 text-center">
        <small className="text-muted">
          <i className="bi bi-geo-alt-fill me-1"></i>
          Localisation: Pahou, Bénin | 
          <i className="bi bi-arrow-up-right ms-2 me-1"></i>
          Cliquez sur le marqueur pour plus d'informations
        </small>
      </div>
    </div>
  );
};

export default Map;