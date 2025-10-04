// src/components/Buyer/CropCard.jsx
import React from "react";

const CropCard = ({ crop, onView }) => {
  return (
    <div className="crop-card" style={{border: "1px solid #ccc", padding: "10px", margin: "10px", borderRadius: "8px"}}>
      <img
        src={crop.imageUrl || "https://via.placeholder.com/150"}
        alt={crop.name}
        style={{width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px"}}
      />
      <h3>{crop.name}</h3>
      <p>Price: ₹{crop.price}</p>
      <p>Quantity: {crop.quantity}</p>
      <p>Farmer: {crop.farmerName || "Unknown"}</p>
      <button onClick={() => onView(crop.id)}>View Details</button>
    </div>
  );
};

export default CropCard;
