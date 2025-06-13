import { SxProps, Theme } from "@mui/material";

export interface ButtonConfig {
  role: number;
  label: string;
  action: () => unknown;
  sx?: SxProps<Theme>;
}

export interface ButtonSchema {
  purchaseorders: ButtonConfig[];
}
