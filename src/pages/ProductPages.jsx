import React, { useEffect, useState } from "react";
import { fetchProduct } from "../api";
import { useParams } from "react-router-dom";

export default function ProductPage(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchProduct(id).then(r => { setP(r); setLoading(false); }).catch(()=> setLoading(false));
  },[id]);

  if (loading) return <p>Loading…</p>;
  if (!p) return <p>Product not found</p>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")||"[]");
    cart.push({ id: p._id || p.id, name: p.name, price: p.price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div>
      <h2>{p.name}</h2>
      <img src={p.imageUrl || p.image || "/placeholder.png"} className="thumbnail" />
      <p>{p.description}</p>
      <p><strong>${p.price}</strong></p>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}
