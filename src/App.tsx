import { useEffect } from "react";
import { Typography, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store";
import { authUser } from "./store/slices/authSlice"; // Import your thunk

function App() {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Fetch authentication status
  useEffect(() => {
    dispatch(authUser()); // Dispatch the async thunk
  }, [dispatch]);

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4">
        {isAuthenticated ? `Welcome, ${user}` : "Welcome to Creekview"}
      </Typography>
    </Container>
  );
}

export default App;
