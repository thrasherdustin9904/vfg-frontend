const API_BASE = "https://vfg-backend12.onrender.com";

async function request(path, { method = "GET", body, json = true, headers = {} } = {}) {
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;
  let options = { method, headers };

  if (body instanceof FormData) {
    options.body = body; // Form-data for uploads
    // leave content-type to browser
  } else if (body != null) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const res = await fetch(API_BASE + path, options);
  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw { status: res.status, ...data };
    return data;
  } catch (err) {
    // If parse failed but res.ok -> return text
    if (res.ok) return text;
    throw err;
  }
}

/* Auth */
export async function register(payload) {
  return request("/api/auth/register", { method: "POST", body: payload });
}
export async function login(payload) {
  return request("/api/auth/login", { method: "POST", body: payload });
}

/* Products */
export async function fetchProducts() {
  return request("/api/products");
}
export async function fetchProduct(id) {
  return request(`/api/products/${id}`);
}
export async function createProduct(formData) {
  return request("/api/products", { method: "POST", body: formData });
}
export async function updateProduct(id, formDataOrJson) {
  const isForm = formDataOrJson instanceof FormData;
  return request(`/api/products/${id}`, {
    method: "PUT",
    body: formDataOrJson
  });
}
export async function deleteProduct(id) {
  return request(`/api/products/${id}`, { method: "DELETE" });
}

/* Checkout */
export async function createOrder(order) {
  return request("/api/checkout", { method: "POST", body: order });
}

/* Health */
export async function getHealth() {
  try {
    return await request("/api/health");
  } catch (err) {
    return { status: "error", error: err.message || err };
  }
}
