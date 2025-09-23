import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ImageSelector = ({ currentImage, onChange }) => {
  const [preview, setPreview] = useState(currentImage ? currentImage : null);
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click(); // déclenche le select
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // aperçu
      onChange(file); // remonte l'image au parent
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <img
        src={preview ? preview : "/placeholder.png"} // placeholder si pas d'image
        alt="Sélection"
        onClick={handleClick}
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          cursor: "pointer",
          border: "2px dashed #ccc",
          borderRadius: "5px",
        }}
      />
      <p style={{ fontSize: "12px", marginTop: "4px" }}>Cliquez pour changer</p>
    </div>
  );
};

export default ImageSelector;
