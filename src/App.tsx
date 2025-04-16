import { useEffect } from "react";
import { Container, Typography, CircularProgress, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store";
import { authUser } from "./store/slices/authSlice";
import { useRouter } from "@tanstack/react-router";

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const status = useSelector((state: RootState) => state.auth.status);
  const router = useRouter();

  // Fetch auth status on app load
  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  useEffect(() => {
    if (status !== "loading") {
      console.log("status is: ", isAuthenticated);
      if (isAuthenticated) {
        router.navigate({ to: "/dashboard" });
        return;
      }
    }
  }, [isAuthenticated, status, router]);

  if (status === "loading") {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress sx={{ mt: 2 }} />
      </Container>
    );
  }

  const navigate = (location: "login" | "register") => {
    router.navigate({ to: `/${location}` });
  };

  return (
    <>
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4">Welcome to Creekview</Typography>
        <Button variant="contained" onClick={() => navigate("login")}>
          Login
        </Button>
        <Button variant="contained" onClick={() => navigate("register")}>
          Register
        </Button>
      </Container>
    </>
  );
}

export default App;
