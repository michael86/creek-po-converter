import { Dispatch, FormEvent, MouseEventHandler, SetStateAction, useState } from "react";
import axios from "axios";
import "./styles/home.css";
import { saveToStorage } from "../utils/storage";

interface HomeProps {
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ loggedIn, setLoggedIn }) => {
  const [formState, setFormState] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [route, setRoute] = useState<"login" | "register">("register");

  const showMessage = (message: string) => {
    setStatus(message);

    setTimeout(() => {
      setStatus(null);
    }, 1000 * 5);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formState.email || !formState.password) return;

    const res = await axios.post(`http://192.168.1.62:6005/account/${route}`, { data: formState });

    switch (route) {
      case "register":
        if (res.data.status === 2) {
          showMessage("Email used");
          return;
        }

        showMessage("Account created");
        saveToStorage("token", res.data.token);
        saveToStorage("email", formState.email);

        break;
      case "login":
        if (res.data.status !== 1) {
          showMessage("Invalid log in");
          return;
        }
        setLoggedIn(true);

        break;
      default:
        break;
    }
  };

  return (
    <section className="home">
      <h1>Creekview Purchase Order and Sticker Creator</h1>
      {!loggedIn && (
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formState.password}
            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
          />
          <div>
            <button type="submit" onClick={() => setRoute("login")}>
              Log in
            </button>
            <button type="submit" onClick={() => setRoute("register")}>
              register
            </button>
          </div>
          {status && <p>{status}</p>}
        </form>
      )}
    </section>
  );
};

export default Home;
