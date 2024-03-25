import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import axios from "axios";
import "./styles/home.css";

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

  const showMessage = (message: string) => {
    setStatus(message);

    setTimeout(() => {
      setStatus(null);
    }, 1000 * 5);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log();

    const res = await axios.post("http://127.0.0.1:6005/account/register", { data: formState });

    if (res.data.status === 2) {
      showMessage("Email used");
      return;
    }

    showMessage("Account created");
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
            <button type="submit">Log in</button>
            <button type="submit">register</button>
          </div>
          {status && <p>{status}</p>}
        </form>
      )}
    </section>
  );
};

export default Home;
