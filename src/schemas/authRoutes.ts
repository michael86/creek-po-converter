export const logingFields = [
  {
    name: "email",
    label: "Email",
    type: "text",
    variant: "standard",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    variant: "standard",
  },
];
export const registerFields = [
  ...logingFields,
  {
    name: "confirm-password",
    label: "Confirm Password",
    type: "password",
    variant: "standard",
  },
  {
    name: "name",
    label: "name",
    type: "text",
    variant: "standard",
  },
];
