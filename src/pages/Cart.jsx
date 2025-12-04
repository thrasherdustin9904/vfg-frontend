import React, { useState } from "react";
import { createOrder } from "../api";

export default function Cart(){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")||"[]"));
  const total = cart.reduce((s,i)=>s + Number(i.price||0),0);

  const checkout = async () => {
    const token = localStorage.getItem("token");
    if(!token) return alert("Please login first.");
    try {
      const order = { items: cart, total };
      await createOrder(order);
      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed");
    } catch (err) {
      alert("Checkout failed");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div>
          <ul>
            {cart.map((c,i)=> <li key={i}>{c.name} - ${c.price}</li>)}
          </ul>
          <p>Total: ${total}</p>
          <button onClick={checkout}>Checkout</button>
        </div>
      )}
    </div>
  );
}
