import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import { Link } from "react-router-dom";

export default function Products(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchProducts().then(r => { setList(r || []); setLoading(false); }).catch(e => { setList([]); setLoading(false); });
  },[]);

  return (
    <div>
      <h2>Products</h2>
      {loading ? <p>Loading...</p> : (
        <div className="product-grid">
          {list.length === 0 && <div>No products yet</div>}
          {list.map(p => (
            <div key={p._id || p.id} className="card">
              <img className="thumbnail" src={p.imageUrl || p.image || "/placeholder.png"} alt={p.name} />
              <h3>{p.name}</h3>
              <p>${p.price}</p>
              <Link to={`/products/${p._id || p.id}`}>View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
