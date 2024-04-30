import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/icons-material/Menu";
import "../styles/drawer.css";
import { useAppSelector } from "../hooks";
import axios from "../utils/interceptors";
import { deleteFromStorage } from "../utils/storage";

type Props = {
  setScreen: React.Dispatch<React.SetStateAction<number>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavDrawer: React.FC<Props> = ({ setScreen, setLoggedIn }) => {
  const { role } = useAppSelector((state) => state.user);

  const onLogout = async () => {
    try {
      await axios.post(`account/logout`);
    } catch (error) {
      console.error("error loggin out", error);
    } finally {
      setLoggedIn(false);
      deleteFromStorage("token");
      deleteFromStorage("email");
      setScreen(0);
    }
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[
          { text: "Upload New Po", icon: FileUploadIcon, screen: 1 },
          { text: "Download Po", icon: DownloadIcon, screen: 2 },
        ].map((entry, index) => (
          <ListItem key={entry.text} disablePadding onClick={() => setScreen(entry.screen)}>
            <ListItemButton>
              <entry.icon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</entry.icon>
              <ListItemText primary={entry.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {role >= 2 && (
        <>
          <Divider />
          <List>
            {[{ text: "Add Prefix", icon: AddIcon, screen: 3 }].map((entry, index) => (
              <ListItem key={entry.text} disablePadding onClick={() => setScreen(entry.screen)}>
                <ListItemButton>
                  <entry.icon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</entry.icon>
                  <ListItemText primary={entry.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
      {role >= 3 && (
        <>
          <Divider />
          <List>
            {[{ text: "Edit Purchase Order", icon: EditIcon, screen: 4 }].map((entry, index) => (
              <ListItem key={entry.text} disablePadding onClick={() => setScreen(entry.screen)}>
                <ListItemButton>
                  <entry.icon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</entry.icon>
                  <ListItemText primary={entry.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
      {role >= 5 && (
        <>
          <Divider />
          <List>
            {[{ text: "View Logs", icon: VisibilityIcon, screen: 5 }].map((entry) => (
              <ListItem key={entry.text} disablePadding onClick={() => setScreen(entry.screen)}>
                <ListItemButton>
                  <entry.icon />
                  <ListItemText primary={entry.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Divider />
      <List>
        {[{ text: "Log Out", icon: LogoutIcon }].map((entry) => (
          <ListItem key={entry.text} disablePadding onClick={onLogout}>
            <ListItemButton>
              <entry.icon />
              <ListItemText primary={entry.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Menu className="menu-hamburger" onClick={toggleDrawer(true)} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default NavDrawer;
