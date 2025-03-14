import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/login";
import api from "../api";
import { useState } from "react";
import BackButton from "../components/backButton";

const Auth: React.FC<{ route: "login" | "register" }> = ({ route }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [error, setError] = useState<null | string>(null);

  const onSubmit = async (data: { email: string; password: string }) => {
    setError(null);
    try {
      const valid = await api.post("user/login", {
        email: data.email,
        password: data.password,
      });
      console.log(valid);
    } catch (error: any) {
      if ("status" in error) {
        const err = error as CustomAxiosError;
        setError(err.message);
      }
    }
  };

  return (
    <>
      <BackButton />

      <h1 style={{ textAlign: "center" }}>
        {route === "login" ? "Login to Creekview" : "Register"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "50%",
          margin: "auto",
        }}
      >
        <TextField
          {...register("email")}
          label="Email"
          variant="standard"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label="Password"
          type="password"
          variant="standard"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      {error && (
        <Typography color="red" align="center">
          {error}
        </Typography>
      )}
    </>
  );
};

export default Auth;
