import { Roles } from "../types/roles";

type ButtonKey =
  | "uploadPO"
  | "viewPO"
  | "addLocation"
  | "addPrefix"
  | "manageUsers"
  | "viewLogs"
  | "generateHex"
  | "dispatchLabels"
  | "generateViasat";

export const BUTTONS: Record<ButtonKey, { label: string; route: string }> = {
  uploadPO: { label: "Upload Purchase Order", route: "/pdf/upload" },
  viewPO: { label: "View Purchase Orders", route: "/purchase-orders" },
  addLocation: { label: "Add Location", route: "/locations/add" },
  addPrefix: { label: "Add Prefix", route: "/prefix/add" },
  manageUsers: { label: "Manage Users", route: "/users/manage" },
  viewLogs: { label: "View Logs", route: "/logs" },
  generateHex: { label: "Generate Hex Stickers", route: "/hex-stickers" },
  dispatchLabels: {
    label: "Generate Dispatch Labels",
    route: "/dispatch-labels",
  },
  generateViasat: { label: "Generate Viasat Labels", route: "/viasat" },
};

type ButtonGroup = {
  title: string;
  buttons: ButtonKey[];
};

export const ROLE_BUTTON_KEYS: Record<Roles, ButtonGroup[]> = {
  [Roles.admin]: [
    { title: "User Management", buttons: ["manageUsers", "viewLogs"] },
    {
      title: "Purchase Orders",
      buttons: ["uploadPO", "viewPO", "addLocation", "addPrefix"],
    },
    { title: "Viasat Labels", buttons: ["generateViasat"] },
    { title: "Dispatch Labels", buttons: ["dispatchLabels"] },
    { title: "Hex Stickers", buttons: ["generateHex"] },
  ],

  [Roles.purchasing]: [
    { title: "Purchase Orders", buttons: ["uploadPO", "viewPO"] },
    { title: "Dispatch Labels", buttons: ["dispatchLabels"] },
  ],
  [Roles.storesAdmin]: [
    {
      title: "Purchase Orders",
      buttons: ["uploadPO", "viewPO", "addLocation", "addPrefix"],
    },
    { title: "Dispatch Labels", buttons: ["dispatchLabels"] },
  ],
  [Roles.storesModerator]: [
    {
      title: "Purchase Orders",
      buttons: ["uploadPO", "viewPO", "addLocation", "addPrefix"],
    },
    { title: "Dispatch Labels", buttons: ["dispatchLabels"] },
  ],
  [Roles.storesEditor]: [
    { title: "Purchase Orders", buttons: ["uploadPO", "viewPO"] },
    { title: "Dispatch Labels", buttons: ["dispatchLabels"] },
  ],
  [Roles.storesViewer]: [
    { title: "Purchase Orders", buttons: ["viewPO"] },
    { title: "Dispatch Labels", buttons: ["dispatchLabels"] },
  ],
  [Roles.production]: [
    { title: "Viasat Labels", buttons: ["generateViasat"] },
    { title: "Dispatch Labels", buttons: ["dispatchLabels"] },
  ],
  [Roles.test]: [
    { title: "Hex Stickers", buttons: ["generateHex"] },
    { title: "Dispatch Labels", buttons: ["dispatchLabels"] },
  ],
};

export const getGroupedButtonsForRole = (
  role: Roles
): { title: string; buttons: { label: string; route: string }[] }[] => {
  const groups = ROLE_BUTTON_KEYS[role] || [];

  return groups.map((group) => ({
    title: group.title,
    buttons: group.buttons.map((key) => BUTTONS[key]),
  }));
};
