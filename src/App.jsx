import React from 'react';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>VF Gaming Store</h1>

        <button
          className="button"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </header>

      <main>
        <p>Welcome to VF Gaming Store!</p>
      </main>
    </div>
  );
}

export default App;
