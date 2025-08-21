import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "@tanstack/react-router";
import NavButtons from "./NavButtons";
import NavigationMenu from "./NavigationMenu";
import { useLogout } from "../../api/queries/useLogout";

export default function ButtonAppBar() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logoutMutate = useLogout();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2.5 }} className="no-print">
      <AppBar position="static" sx={{ padding: "0.5rem 0" }}>
        <Toolbar>
          <NavigationMenu />

          <Typography variant="h6" component="div">
            Creekview EMS - App
          </Typography>

          <Box
            sx={{
              justifySelf: "center",
              alignSelf: "center",
              flexGrow: 1,
              display: "flex",
              justifyContent: "start",
              maxWidth: "20%",
              margin: "auto",
            }}
          >
            <NavButtons />
          </Box>

          <Button
            sx={{ margin: "auto", marginLeft: "0", marginRight: "0" }}
            color="inherit"
            onClick={() =>
              auth.email && auth.role
                ? logoutMutate.mutateAsync().then(() => {
                    dispatch(logout());
                    navigate({ to: "/" });
                  })
                : navigate({ to: "/login" })
            }
          >
            {auth.email && auth.role ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
