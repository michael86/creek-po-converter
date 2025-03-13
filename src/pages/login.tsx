import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password too short")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase character")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .matches(/^(?=.*[0-9])/, "Must contain at least one number")
    .matches(/^(?=.*[!@#%&])/, "Must contain at least one special character"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => console.log(data);

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
