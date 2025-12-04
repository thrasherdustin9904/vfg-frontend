const API_BASE = "https://vfg-backend12.onrender.com";

export async function getHealth() {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    return await response.json();
  } catch (err) {
    return { status: "error", error: err.message };
  }
}
