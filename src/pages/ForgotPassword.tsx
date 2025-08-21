import { useState } from "react";
import { Typography, InputLabel, Input, Button } from "@mui/material";
import api from "../api";

const ForgotPassword = () => {
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    if (!email) return;

    const res = await api.post("user/forgot-password", { email });

    if (res.status !== 200) return;

    setMessage(
      "If that email address exists in our system, you will receive an email with instructions to reset your password."
    );
  };

  return (
    <section style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography component={"h1"} variant="h3" align="center">
        Forgot Password
      </Typography>
      <Typography>
        Hi Joe - Please enter your email address to reset your password.
      </Typography>

      <form onSubmit={onSubmit}>
        <InputLabel sx={{ marginBottom: 2 }}>
          Email:
          <Input
            color="primary"
            margin="dense"
            name="email"
            required
            type="email"
          />
        </InputLabel>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>

      {message && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}
    </section>
  );
};

export default ForgotPassword;
