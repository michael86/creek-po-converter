import { SetStateAction, ReactElement, Dispatch } from "react";
import "./styles/nav.css";
import { readFromStorage, deleteFromStorage } from "../utils/storage";
import axios from "axios";

type Props = {
  screen: number;
  setScreen: Dispatch<SetStateAction<number>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

type _Nav = (props: Props) => ReactElement | null;

const Nav: _Nav = ({ screen, setScreen, loggedIn, setLoggedIn }) => {
  const onLogout = async () => {
    const token = readFromStorage("token");
    const email = readFromStorage("email");

    if (!token || !email) {
      setLoggedIn(false);
      return;
    }

    try {
      await axios.post(`http://192.168.1.62:6005/account/logout`, {
        token,
        email,
      });
    } catch (error) {
      console.log("error loggin out", error);
    } finally {
      setLoggedIn(false);
      deleteFromStorage("token");
      deleteFromStorage("email");
    }
  };

  return loggedIn === true ? (
    <nav>
      <ul>
        {screen === 0 && <li onClick={() => setScreen(1)}>Upload new PO</li>}
        {screen === 0 && <li onClick={() => setScreen(2)}>Download PO/stickers</li>}
        {(screen === 1 || screen === 2) && <li onClick={() => setScreen(0)}>Home</li>}
        <li onClick={onLogout}>Log out</li>
      </ul>
    </nav>
  ) : null;
};

export default Nav;
