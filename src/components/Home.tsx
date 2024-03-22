import { Dispatch, FormEvent, ReactElement, SetStateAction, useState } from "react";
import axios from "axios";
import "./styles/home.css";

type Props = {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
};

type _Home = (props: Props) => ReactElement;

const Home: _Home = ({ loggedIn, setLoggedIn }) => {
  const [clicked, setClicked] = useState<"login" | "register" | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await axios.get("127.0.0.1:6005/account/login");
  };

  return (
    <section className="home">
      <h1>Creekview Purchase Order and Sticker Creator</h1>
      {!loggedIn && (
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />

          <div>
            <button onClick={() => setClicked("login")}>Log in</button>
            <button onClick={() => setClicked("register")}>register</button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Home;
