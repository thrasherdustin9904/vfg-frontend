import React, { useEffect, useState } from "react";
import { fetchProducts, createProduct, updateProduct, deleteProduct } from "../api";

export default function Admin(){
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name:"", price:"", description:"", image: null });

  useEffect(()=>{ load(); },[]);
  const load = async ()=> {
    const list = await fetchProducts();
    setProducts(list || []);
  };

  const onFile = (e) => setForm({ ...form, image: e.target.files[0] });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("description", form.description);
      if (form.image) fd.append("image", form.image);
      if (editing) {
        await updateProduct(editing._id || editing.id, fd);
      } else {
        await createProduct(fd);
      }
      setForm({ name:"", price:"", description:"", image:null });
      setEditing(null);
      await load();
    } catch (err) {
      alert("save failed");
      console.error(err);
    }
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({ name:p.name, price:p.price, description:p.description, image:null });
  };

  const doDelete = async (id) => {
    if (!confirm("Delete?")) return;
    await deleteProduct(id);
    await load();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={submit} className="card">
        <h3>{editing ? "Edit product" : "Add product"}</h3>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input type="file" onChange={onFile} />
        <button type="submit">Save</button>
        {editing && <button type="button" onClick={()=>{setEditing(null); setForm({name:'',price:'',description:'',image:null})}}>Cancel</button>}
      </form>

      <h3>Products</h3>
      <div className="product-grid">
        {products.map(p => (
          <div className="card" key={p._id || p.id}>
            <img className="thumbnail" src={p.imageUrl || p.image || "/placeholder.png"} />
            <h4>{p.name}</h4>
            <p>${p.price}</p>
            <button onClick={()=>startEdit(p)}>Edit</button>
            <button onClick={()=>doDelete(p._id || p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
