import React, { useState } from "react";

function PlantCard({ plant, toggleSoldOut, updatePrice, deletePlant }) {
  const [newPrice, setNewPrice] = useState("");

  function handlePriceSubmit(e) {
    e.preventDefault();
    updatePrice(plant.id, newPrice);
    setNewPrice("");
  }

  return (
    <div className="plant-card" style={{ opacity: plant.soldOut ? 0.5 : 1 }}>
      <h3>{plant.name}</h3>
      <img src={plant.image} alt={plant.name} width="150" />
      <p>${plant.price}</p>
      <button onClick={() => toggleSoldOut(plant.id)}>
        {plant.soldOut ? "Available" : "Mark as Sold Out"}
      </button>

      <form onSubmit={handlePriceSubmit}>
        <input
          type="number"
          step="0.01"
          placeholder="New price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button type="submit">Update Price</button>
      </form>

      <button onClick={() => deletePlant(plant.id)}>Delete</button>
    </div>
  );
}

export default PlantCard;
