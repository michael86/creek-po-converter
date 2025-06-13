import * as React from "react";
import { Button } from "@mui/material";
import { useLocation } from "@tanstack/react-router";
import { useAppSelector } from "../../store";
import { isKeyOf } from "../../utils/typeGuards";
import type { ButtonSchema } from "../../types/navBar";

const buttonSchema: ButtonSchema = {
  purchaseorders: [
    { label: "Edit", action: () => {}, styles: { mr: 2.5 } },
    { label: "Delete", action: () => {}, styles: { mr: 2.5 } },
  ],
  test: [{ label: "Edit", action: () => {} }],
};

const NavButtons: React.FC = () => {
  const { pathname } = useLocation();
  const purchaseOrder = useAppSelector((s) => s.purchaseOrder);

  const path = pathname.replace(/[-/]/g, "") as keyof ButtonSchema;

  if ((path === "purchaseorders" && !purchaseOrder.items) || !isKeyOf(buttonSchema, path)) {
    return null;
  }

  return buttonSchema[path].map((cfg, idx) => {
    return (
      <Button
        key={`${cfg.label}-${idx}`}
        variant="outlined"
        color="inherit"
        onClick={cfg.action}
        sx={cfg.styles ?? {}}
      >
        {cfg.label}
      </Button>
    );
  });
};

export default NavButtons;
