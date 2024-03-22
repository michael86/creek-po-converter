import "./Print.css";
import "./reset.css";
import { useState } from "react";
import ProcessPdf from "./components/ProcessPdf";
import DownloadPo from "./components/DownloadPo";
import Nav from "./components/Nav";
import Home from "./components/Home";

function App() {
  const [screen, setScreen] = useState<number>(0);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <>
      <header className="no-print">
        <Nav screen={screen} setScreen={setScreen} loggedIn={loggedIn} />
      </header>

      {screen === 0 && <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {screen === 1 && <ProcessPdf />}
      {screen === 2 && <DownloadPo />}
    </>
  );
}

export default App;
