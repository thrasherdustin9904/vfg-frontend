import React, { useState } from "react";
import api from "../api";

export default function Checkout({ items }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const startCheckout = async () => {
    if (!email) return alert("Enter email");
    setLoading(true);
    try {
      const data = await api.createCheckoutSession(items, email);
      // backend returns { url } or { url: session.url }
      const url = data.url || data.session?.url || data.sessionUrl;
      if (!url) {
        alert("No checkout url returned");
        return;
      }
      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally { setLoading(false); }
  };

  return (
    <div style={{marginTop:12}}>
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button className="button" onClick={startCheckout} disabled={loading} style={{marginLeft:8}}>
        {loading ? "Starting..." : "Pay with Stripe"}
      </button>
    </div>
  );
}
