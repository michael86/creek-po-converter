import { TableCell, IconButton } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
};

const ShowItemHistoryButton: React.FC<Props> = ({ open, disabled, setOpen }) => {
  return (
    <TableCell>
      <IconButton
        aria-label="expand row"
        size="small"
        disabled={disabled}
        onClick={() => setOpen(!open)}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </TableCell>
  );
};

export default ShowItemHistoryButton;
