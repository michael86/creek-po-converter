import "./App.css";
import { useState } from "react";
import ProcessPdf from "./components/ProcessPdf";

function App() {
  const [screen, setScreen] = useState<number>(0);
  return (
    <>
      <header>
        <nav>
          {screen === 0 && <li onClick={() => setScreen(1)}>Upload new PO</li>}
          {screen === 1 && <li onClick={() => setScreen(0)}>Home</li>}
        </nav>
      </header>

      {screen === 0 && <h1>Home</h1>}
      {screen === 1 && <ProcessPdf />}
    </>
  );
}

export default App;
