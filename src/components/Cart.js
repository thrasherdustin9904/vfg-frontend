import React from "react";

export default function Cart({ items, onRemove, onCheckout }) {
  const total = items.reduce((s,i) => s + Number(i.price), 0).toFixed(2);
  return (
    <div className="cart">
      <h4>Cart</h4>
      {items.length === 0 ? <p>Empty</p> : items.map((it, idx) => (
        <div key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>{it.name} - ${Number(it.price).toFixed(2)}</div>
          <button className="button" onClick={() => onRemove(idx)}>Remove</button>
        </div>
      ))}
      <hr />
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <strong>Total</strong>
        <strong>${total}</strong>
      </div>
      <div style={{marginTop:10}}>
        <button className="button" onClick={() => onCheckout(items)}>Checkout</button>
      </div>
    </div>
  );
}
