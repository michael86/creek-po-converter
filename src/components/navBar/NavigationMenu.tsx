import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

const NavigationMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path: string | null) => {
    setAnchorEl(null);
    path && navigate({ to: path });
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleClose("dashboard")}>Dashboard</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClose("hex-stickers")}>Generate Hex Stickers</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClose("pdf/upload")}>Upload Purchase Order</MenuItem>
        <MenuItem onClick={() => handleClose("purchase-orders")}>View Purchase Orders</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClose("locations/add")}>Add Location</MenuItem>
        <MenuItem onClick={() => handleClose("prefix/add")}>Add Prefix</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleClose("users/manage")}>Manage Users</MenuItem>
        <MenuItem onClick={() => handleClose("logs")}>View Logs</MenuItem>
      </Menu>
    </>
  );
};

export default NavigationMenu;
