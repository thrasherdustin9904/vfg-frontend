const API_URL = "https://vfg-backend12.onrender.com/api";

export async function getHealth() {
  try {
    const res = await fetch(`${API_URL}/health`);
    return await res.json();
  } catch (err) {
    return { status: "error", error: err.message };
  }
}
