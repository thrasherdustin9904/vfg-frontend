import React, { useState } from "react";
import api from "../api";

export default function AdminDashboard({ token }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const addProduct = async () => {
    if (!name || !price) return alert("Name & price required");
    const form = new FormData();
    form.append("name", name);
    form.append("description", desc);
    form.append("price", price);
    if (file) form.append("image", file);

    try {
      const res = await api.createProduct(form, token);
      alert("Created");
      setName(""); setPrice(""); setDesc(""); setFile(null);
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  return (
    <div className="card" style={{maxWidth:700}}>
      <h3>Admin — Add Product</h3>
      <div className="form">
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
      </div>
      <div className="form" style={{marginTop:8}}>
        <input className="input" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
        <button className="button" onClick={addProduct}>Create</button>
      </div>
    </div>
  );
}
