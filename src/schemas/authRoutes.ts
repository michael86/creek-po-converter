import { TextFieldVariants } from "@mui/material";

export const loginFields = [
  {
    name: "email",
    label: "Email",
    type: "text",
    variant: "standard" as TextFieldVariants,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    variant: "standard" as TextFieldVariants,
  },
];

export const registerFields = [
  ...loginFields,
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    variant: "standard" as TextFieldVariants,
  },
  {
    name: "name",
    label: "name",
    type: "text",
    variant: "standard" as TextFieldVariants,
  },
];
