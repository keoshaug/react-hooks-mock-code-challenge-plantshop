import React, {useState} from "react";

function PlantCard({plant, onUpdatedPlant, onDeletePlant}) {

const {id, name, price, image} = plant
const [inStock, setInStock] = useState(true)
const [updatedPrice, setUpdatedPrice] = useState(0)

function handleClick () {
  setInStock(inStock => !inStock)
}

function handlePriceChange (e) {
  const amount = e.target.value
  if (amount === "" || amount === null) {
    setUpdatedPrice("")
  } else {
    setUpdatedPrice(parseFloat(e.target.value))
  }
}

function handleSubmit (e) {
  e.preventDefault()
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({price: updatedPrice})
  }

  fetch(`http://localhost:6001/plants${id}`, configObj)
  .then(r => r.json)
  .then(UpdatedPlant => onUpdatedPlant(UpdatedPlant))

  setUpdatedPrice(0)
}

function handleDelete () {
  fetch(`http://localhost:6001/plants${id}`, {
    method: "DELETE"
  })
  .then(onDeletePlant(id))
}
  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price.toFixed(2)}</p>
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={handleDelete}>Delete</button>
      <form onSubmit={handleSubmit}><input type="number" step="0.01" placeholder="New price" value={updatedPrice} onChange={handlePriceChange} />
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
