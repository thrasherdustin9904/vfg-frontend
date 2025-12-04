import React, { useState } from "react";
import api from "../api";

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = async () => {
    try {
      const data = await api.adminLogin(email, password);
      // store token
      if (data?.token) {
        localStorage.setItem("admin_token", data.token);
        onLogin(data.token);
      } else alert("No token returned");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };
  return (
    <div style={{padding:12}}>
      <input className="input" placeholder="Admin email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="input" style={{marginLeft:8}} placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
      <button className="button" onClick={submit} style={{marginLeft:8}}>Login</button>
    </div>
  );
}
