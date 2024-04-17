import { SetStateAction, ReactElement, Dispatch } from "react";
import "./styles/nav.css";
import { readFromStorage, deleteFromStorage } from "../utils/storage";
import axios from "../utils/interceptors";
import { useAppSelector } from "../hooks";

type Props = {
  screen: number;
  setScreen: Dispatch<SetStateAction<number>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

type _Nav = (props: Props) => ReactElement | null;

const Nav: _Nav = ({ screen, setScreen, loggedIn, setLoggedIn }) => {
  const { role } = useAppSelector((state) => state.user);

  const onLogout = async () => {
    const token = readFromStorage("token");
    const email = readFromStorage("email");

    if (!token || !email) {
      setLoggedIn(false);
      return;
    }

    try {
      await axios.post(`account/logout`);
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
        {(screen === 1 || screen === 2) && <li onClick={() => setScreen(0)}>Home</li>}
        {(screen === 0 || screen === 2) && <li onClick={() => setScreen(1)}>Upload new PO</li>}
        {(screen === 0 || screen === 1) && (
          <li onClick={() => setScreen(2)}>Download PO/stickers</li>
        )}
        {role >= 4 && (
          <>
            <li onClick={() => setScreen(2)}>Add Part Prefix</li>
            <li onClick={() => setScreen(2)}>Edit Purchase order</li>
          </>
        )}
        {role === 5 && <li onClick={() => setScreen(2)}>View logs</li>}
        <li onClick={onLogout}>Log out</li>
      </ul>
    </nav>
  ) : null;
};

export default Nav;
