import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

export default function App(){
  const [cart, setCart] = useState([]);
  const [adminToken, setAdminToken] = useState(localStorage.getItem("admin_token")||null);

  const handleAdd = (product) => {
    setCart(prev => [...prev, product]);
  };
  const handleRemove = (idx) => {
    setCart(prev => prev.filter((_,i)=>i!==idx));
  };
  const handleCheckout = (items) => {
    // If using Checkout component, will redirect
    // We render Checkout panel
    // For simplicity just open Checkout modal area - manage below
    // Here we'll show Checkout component in page bottom
    const el = document.getElementById("checkout-area");
    if (el) el.scrollIntoView({behavior:"smooth"});
  };

  return (
    <div className="container">
      <div className="header">
        <h1>VF Gaming Store</h1>
        <div>
          <button className="button" onClick={()=>window.location.reload()}>Refresh</button>
        </div>
      </div>

      <ProductList onAdd={handleAdd} />

      <div id="checkout-area" style={{marginTop:24}}>
        <Checkout items={cart} />
      </div>

      <div style={{marginTop:20}}>
        <Cart items={cart} onRemove={handleRemove} onCheckout={handleCheckout} />
      </div>

      <div style={{marginTop:40}}>
        <h2>Admin</h2>
        {!adminToken ? <AdminLogin onLogin={t=>setAdminToken(t)} /> : <AdminDashboard token={adminToken} />}
      </div>
    </div>
  );
        }
