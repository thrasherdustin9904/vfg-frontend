const API_BASE = "https://vfg-backend12.onrender.com";

// Wait helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getHealth() {
  try {
    // Step 1: Wake backend (Render cold start fix)
    await fetch(API_BASE, { method: "GET" }).catch(() => {});

    // Step 2: Try health check (retry up to 3 times)
    for (let i = 0; i < 3; i++) {
      try {
        const res = await fetch(`${API_BASE}/api/health`);
        if (res.ok) return await res.json();
      } catch {}
      await delay(1000); // wait 1 sec between retries
    }

    // Step 3: If still no response
    return { status: "error", error: "Backend not responding" };

  } catch (err) {
    return { status: "error", error: err.message };
  }
}
