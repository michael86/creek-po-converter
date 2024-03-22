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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await axios.post("http://127.0.0.1:6005/account/login", { data: formState });
    // Handle response accordingly
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
            <button type="button">register</button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Home;
