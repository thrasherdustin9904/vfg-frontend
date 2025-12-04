import React, { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState(""); const [pw,setPw]=useState("");
  const nav = useNavigate();

  const doLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password: pw });
      // expecting res.token and res.user
      localStorage.setItem("token", res.token || res.accessToken || "");
      localStorage.setItem("user", JSON.stringify(res.user || {}));
      nav("/");
      window.location.reload();
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={doLogin}>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" /></div>
        <div><input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" /></div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
