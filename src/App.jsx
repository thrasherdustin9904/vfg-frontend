import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";

function Header() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <header className="site-header">
      <nav>
        <Link to="/">VF Gaming Store</Link>
        <div className="nav-right">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          {user ? (
            <>
              {user.isAdmin && <Link to="/admin">Admin</Link>}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </main>
    </div>
  );
}
