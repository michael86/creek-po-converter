const role1 = [{ label: "Generate Hex Stickers", route: "/hex-stickers" }];

const role2 = [
  { label: "Upload Purchase Order", route: "/pdf/upload" },
  { label: "View Purchase Order", route: "/pdf" },
];

const role3 = [
  ...role2,
  { label: "Add Location", route: "/locations/add" },
  { label: "Add prefix", route: "/prefix/add" },
];

const role4 = [
  ...role1,
  ...role3,
  { label: "Manage Users", route: "/users/manage" },
  { label: "View Logs", route: "/logs" },
];

export const roles: { [key: string]: { label: string; route: string }[] } = {
  "1": role1,
  "2": role2,
  "3": role3,
  "4": role4,
};
