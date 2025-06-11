import * as React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  message: string;
  setShowSnack: React.Dispatch<React.SetStateAction<boolean>>;
};

const SnackBar: React.FC<Props> = ({ message, setShowSnack }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setShowSnack(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        Close
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => setOpen(true), []);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};

export default SnackBar;
