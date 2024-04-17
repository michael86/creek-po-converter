import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import ProcessPdf from "./components/ProcessPdf";
import DownloadPo from "./components/DownloadPo";
import Toast from "./components/Toast";
import { readFromStorage, saveToStorage } from "./utils/storage";
import axios from "./utils/interceptors";
import "react-toastify/dist/ReactToastify.css";
import "./Print.css";
import "./reset.css";
import { setRole } from "./slices/user";
import { useAppDispatch } from "./hooks";
import AddPrefix from "./components/AddPrefix";
import EditPo from "./components/EditPo";
import Logs from "./components/Logs";

function App() {
  const [screen, setScreen] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const token = readFromStorage("token");
      const email = readFromStorage("email");

      if (!token || !email) return;

      try {
        const {
          data: { valid, role },
        } = await axios.get(`account/validate-token/${token}/${email}`);
        setLoggedIn(valid);
        if (!role) return;

        dispatch(setRole(role));
      } catch (error) {
        console.error("Error validating token:", error);
        setLoggedIn(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Toast />
      <header className="no-print">
        <Nav screen={screen} setScreen={setScreen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </header>

      {screen === 0 && <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {screen === 1 && <ProcessPdf />}
      {screen === 2 && <DownloadPo />}
      {screen === 3 && <AddPrefix />}
      {screen === 4 && <EditPo />}
      {screen === 5 && <Logs />}
    </>
  );
}

export default App;
