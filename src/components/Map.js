import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Position de Pahou
const position = [6.4167, 2.2333]; 

const Map = () => {
  return (
    <section className="container my-5 w-100" style={{ position: "relative" }}>
      <h3 className="mb-4 text-center" style={{fontFamily: "monospace"}}>Où nous trouver ?</h3>
      <MapContainer center={position} zoom={15} style={{ height: "400px" }}>
        {/* Carte OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {/* Marqueur */}
        <Marker position={position}>
          <Popup>Notre boutique est ici !</Popup>
        </Marker>
      </MapContainer>
    </section>
  );
};

export default Map;
