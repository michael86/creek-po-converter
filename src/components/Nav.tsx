import { SetStateAction, ReactElement, Dispatch } from "react";
import "./styles/nav.css";

type Props = {
  screen: number;
  setScreen: Dispatch<SetStateAction<number>>;
  loggedIn: boolean;
};

type _Nav = (props: Props) => ReactElement | null;

const Nav: _Nav = ({ screen, setScreen, loggedIn }) => {
  return loggedIn === true ? (
    <nav>
      <ul>
        {screen === 0 && <li onClick={() => setScreen(1)}>Upload new PO</li>}
        {screen === 0 && <li onClick={() => setScreen(2)}>Download PO/stickers</li>}
        {(screen === 1 || screen === 2) && <li onClick={() => setScreen(0)}>Home</li>}
      </ul>
    </nav>
  ) : null;
};

export default Nav;
