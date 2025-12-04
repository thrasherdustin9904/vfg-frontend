import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [email,setEmail]=useState(""); const [pw,setPw]=useState("");
  const nav = useNavigate();

  const doRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password: pw });
      alert("Registered — please login");
      nav("/login");
    } catch (err) {
      alert("Register failed");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={doRegister}>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" /></div>
        <div><input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" /></div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
