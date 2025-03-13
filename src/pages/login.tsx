import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas/login";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data: { email: string; password: string }) => console.log(data); //submit api call here

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Login to Creekview</h1>
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
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
