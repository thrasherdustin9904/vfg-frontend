import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <img src={product.image || "/placeholder.jpg"} alt={product.name} />
      <h3>{product.name}</h3>
      <p style={{minHeight:40}}>{product.description}</p>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <strong>${Number(product.price).toFixed(2)}</strong>
        <button className="button" onClick={() => onAdd(product)}>Add</button>
      </div>
    </div>
  );
}
