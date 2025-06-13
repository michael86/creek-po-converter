import { SxProps, Theme } from "@mui/material";

export interface ButtonConfig {
  label: string;
  action: () => unknown;
  styles?: SxProps<Theme>;
}

export interface ButtonSchema {
  purchaseorders: ButtonConfig[];
  test: ButtonConfig[];
}
