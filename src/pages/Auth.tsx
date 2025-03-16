import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "../schemas/authValidation";
import { loginFields, registerFields } from "../schemas/authRoutes";
import api from "../api";
import { useState } from "react";
import BackButton from "../components/backButton";
import { AuthForm } from "../types/authForm";
import { useAppDispatch } from "../store";
import { login } from "../store/slices/authSlice";
import { useRouter } from "@tanstack/react-router";

const Auth: React.FC<{ route: "login" | "register" }> = ({ route }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fields = route === "login" ? loginFields : registerFields;
  const schema = route === "login" ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({ resolver: yupResolver(schema) });

  const [error, setError] = useState<null | string>(null);

  const onSubmit = async (data: {
    confirmPassword?: string;
    email: string;
    name?: string;
    password: string;
  }) => {
    setError(null);

    try {
      const valid = await api.post(route === "login" ? "user/login" : "user/register", data);

      if (valid.status === 200) {
        const data: { email: string; name: string; role: number } = valid.data.data;
        dispatch(login({ name: data.name, email: data.email, role: data.role }));
        router.navigate({ to: "/dashboard" });
      }
    } catch (error: any) {
      if ("status" in error) {
        setError(error.message);
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
        {fields.map((field) => (
          <TextField
            key={field.name}
            {...register(field.name as keyof AuthForm)}
            label={field.label}
            variant={field.variant}
            type={field.type || "text"}
            error={!!errors[field.name as keyof AuthForm]}
            helperText={errors[field.name as keyof AuthForm]?.message}
          />
        ))}

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
