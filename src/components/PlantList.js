import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, onUpdatedPlant, onDeletePlant}) {

  const plantList = plants.map((plant) => <PlantCard key={plant.id} plant={plant} onUpdatedPlant={onUpdatedPlant} onDeletePlant={onDeletePlant}/>)

  return (
    <ul className="cards">{plantList}</ul>
  );
}

export default PlantList;
