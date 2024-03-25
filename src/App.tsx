import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import ProcessPdf from "./components/ProcessPdf";
import DownloadPo from "./components/DownloadPo";
import { readFromStorage } from "./utils/storage";
import axios from "./utils/interceptors";
import "./Print.css";
import "./reset.css";

function App() {
  const [screen, setScreen] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = readFromStorage("token");
      const email = readFromStorage("email");

      if (!token || !email) return;

      try {
        type Res = { data: { valid: boolean } };
        const res: Res = await axios.get(`account/validate-token/${token}/${email}`);
        setLoggedIn(res.data.valid);
      } catch (error) {
        console.error("Error validating token:", error);
        setLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header className="no-print">
        <Nav screen={screen} setScreen={setScreen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </header>

      {screen === 0 && <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {screen === 1 && <ProcessPdf />}
      {screen === 2 && <DownloadPo />}
    </>
  );
}

export default App;
