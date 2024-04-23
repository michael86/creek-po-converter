import { SetStateAction, ReactElement, Dispatch } from "react";
import "../styles/nav.css";
import { deleteFromStorage } from "../utils/storage";
import axios from "../utils/interceptors";
import { useAppSelector } from "../hooks";

type Props = {
  setScreen: Dispatch<SetStateAction<number>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

type _Nav = (props: Props) => ReactElement | null;

const Nav: _Nav = ({ setScreen, loggedIn, setLoggedIn }) => {
  const { role } = useAppSelector((state) => state.user);

  const onLogout = async () => {
    try {
      await axios.post(`account/logout`);
    } catch (error) {
      console.error("error loggin out", error);
    } finally {
      setLoggedIn(false);
      deleteFromStorage("token");
      deleteFromStorage("email");
    }
  };

  return loggedIn === true ? (
    <nav>
      <ul>
        <li onClick={() => setScreen(0)}>Home</li>
        <li onClick={() => setScreen(1)}>Upload new PO</li>
        <li onClick={() => setScreen(2)}>Download PO/stickers</li>

        {role >= 4 && (
          <>
            <li onClick={() => setScreen(3)}>Add Part Prefix</li>
            <li onClick={() => setScreen(4)}>Edit Purchase order</li>
          </>
        )}
        {role === 5 && <li onClick={() => setScreen(5)}>View logs</li>}
        <li onClick={onLogout}>Log out</li>
      </ul>
    </nav>
  ) : null;
};

export default Nav;
