import React, { useEffect, useState } from "react";
import { getHealth } from "../api";

export default function Home(){
  const [health, setHealth] = useState(null);

  useEffect(()=>{
    getHealth().then(r => setHealth(r)).catch(e => setHealth({status:'error'}));
  },[]);

  return (
    <div>
      <h1 className="header-title">VF Gaming Store</h1>
      <p>{health && health.status === "ok" ? "Backend is connected successfully!" : "Welcome to VF Gaming Store!"}</p>
    </div>
  );
}
