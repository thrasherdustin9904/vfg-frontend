import { useState } from "react";
import { getHealth } from "./api";

function App() {
  const [message, setMessage] = useState("Welcome to VF Gaming Store!");

  async function handleRefresh() {
    const data = await getHealth();
    if (data.status === "ok") {
      setMessage("Backend is connected successfully!");
    } else {
      setMessage("Error: Could not connect to backend.");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>VF Gaming Store</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
