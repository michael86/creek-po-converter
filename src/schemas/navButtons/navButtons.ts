import { Roles } from "../../types/roles";
import { ButtonGroup } from "../../types/navBar";
import { deletePo, printAll, printSelected, setEditPoTable } from "./buttonActions";
import { RouteKeys } from "../../types/routes";

export const ROLE_BUTTON_KEYS: ButtonGroup = {
  [Roles.admin]: {
    title: "Purchase Order Actions",
    routes: {
      [RouteKeys.PurchaseOrder]: {
        buttons: ["edit", "delete", "printSelected", "printAll"],
        actions: {
          edit: setEditPoTable,
          delete: deletePo,
          printSelected,
          printAll,
        },
      },
    },
  },
  [Roles.production]: {},
  [Roles.purchasing]: {
    title: "Purchase Order Actions",
    routes: {
      [RouteKeys.PurchaseOrder]: {
        buttons: ["edit", "delete", "printSelected", "printAll"],
        actions: {
          edit: setEditPoTable,
          delete: deletePo,
          printSelected,
          printAll,
        },
      },
    },
  },
  [Roles.storesAdmin]: {
    title: "Purchase Order Actions",
    routes: {
      [RouteKeys.PurchaseOrder]: {
        buttons: ["edit", "delete", "printSelected", "printAll"],
        actions: {
          edit: setEditPoTable,
          delete: deletePo,
          printSelected,
          printAll,
        },
      },
    },
  },
  [Roles.storesModerator]: {
    title: "Purchase Order Actions",
    routes: {
      [RouteKeys.PurchaseOrder]: {
        buttons: ["edit", "delete", "printSelected", "printAll"],
        actions: {
          edit: setEditPoTable,
          delete: deletePo,
          printSelected,
          printAll,
        },
      },
    },
  },
  [Roles.storesEditor]: {
    title: "Purchase Order Actions",
    routes: {
      [RouteKeys.PurchaseOrder]: {
        buttons: ["edit", "printSelected", "printAll"],
        actions: {
          edit: setEditPoTable,
          printSelected,
          printAll,
        },
      },
    },
  },
  [Roles.storesViewer]: {
    title: "Purchase Order Actions",
    routes: {
      [RouteKeys.PurchaseOrder]: {
        buttons: ["printSelected", "printAll"],
        actions: {
          printSelected,
          printAll,
        },
      },
    },
  },
  [Roles.test]: {},
};
