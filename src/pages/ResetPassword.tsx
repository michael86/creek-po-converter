import { Button, Input, InputLabel, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import api from "../api";

const ResetPassword = () => {
  const { token } = useParams({ from: "/reset-password/$token" });

  const [message, setMessage] = useState<null | string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await api.post("user/reset-password", {
      token,
      password,
    });

    if (res.status !== 200) {
      setMessage("Failed to reset password. Please try again.");
      return;
    }

    setMessage("Password has been reset successfully!");
  };

  return (
    <section style={{ textAlign: "center", marginTop: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Reset Password
      </Typography>

      <Typography variant="body1" gutterBottom>
        If you have received a password reset link, please enter your new
        password below.
      </Typography>
      <form onSubmit={onSubmit}>
        <InputLabel>
          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            required
          />
        </InputLabel>
        <InputLabel>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            required
          />
        </InputLabel>
        <Input type="hidden" value={token} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Reset Password
        </Button>
      </form>

      {message && (
        <Typography variant="body2" color="error" style={{ marginTop: "20px" }}>
          {message}
        </Typography>
      )}
    </section>
  );
};

export default ResetPassword;
