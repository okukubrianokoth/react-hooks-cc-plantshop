import React, { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => {
        const updated = data.map(p => ({ ...p, soldOut: false }));
        setPlants(updated);
      });
  }, []);

  function addPlant(newPlant) {
    setPlants([...plants, { ...newPlant, soldOut: false }]);
  }

  function toggleSoldOut(id) {
    setPlants(plants.map(p =>
      p.id === id ? { ...p, soldOut: !p.soldOut } : p
    ));
  }

  function updatePrice(id, newPrice) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        setPlants(plants.map(p => p.id === id ? updatedPlant : p));
      });
  }

  function deletePlant(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPlants(plants.filter(p => p.id !== id));
    });
  }

  const filteredPlants = plants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NewPlantForm addPlant={addPlant} />
      <div className="plant-list">
        {filteredPlants.map(plant => (
          <PlantCard
            key={plant.id}
            plant={plant}
            toggleSoldOut={toggleSoldOut}
            updatePrice={updatePrice}
            deletePlant={deletePlant}
          />
        ))}
      </div>
    </main>
  );
}

export default PlantPage;
