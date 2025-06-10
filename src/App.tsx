import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import ProcessPdf from "./pages/ProcessPdf";
import DownloadPo from "./pages/DownloadPo";
import AddPrefix from "./pages/AddPrefix";
import EditPo from "./pages/EditPo";
import Logs from "./pages/Logs";
import StickerTemplate from "./pages/StickerTemplate";
import CreateHexSticker from "./pages/CreateHexSticker";

import Toast from "./components/Toast";
import NavDrawer from "./components/NavDrawer";

import { setRole } from "./slices/user";
import { useAppDispatch } from "./hooks";

import { readFromStorage } from "./utils/storage";
import axios from "./utils/interceptors";

import "./Print.css";
import "./reset.css";
import CreateViasatStickers from "./pages/CreateViasatStickers";

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
  }, [dispatch]);

  return (
    <>
      <Toast />
      <header className="no-print">
        {loggedIn && <NavDrawer setScreen={setScreen} setLoggedIn={setLoggedIn} />}
      </header>

      {screen === 0 && <Home setScreen={setScreen} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      {screen === 1 && <ProcessPdf />}
      {screen === 2 && <DownloadPo />}
      {screen === 3 && <AddPrefix />}
      {screen === 4 && <EditPo />}
      {screen === 5 && <CreateHexSticker />}
      {screen === 6 && <Logs />}
      {screen === 7 && <StickerTemplate />}
      {screen === 8 && <CreateViasatStickers />}
    </>
  );
}

export default App;
