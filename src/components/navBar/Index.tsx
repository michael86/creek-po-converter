import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useAppSelector } from "../../store";
import { useNavigate } from "@tanstack/react-router";
import NavButtons from "./NavButtons";
import NavigationMenu from "./NavigationMenu";

export default function ButtonAppBar() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2.5 }}>
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
                ? /* your logout fn */ console.log("logout")
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
