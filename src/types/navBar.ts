import { PayloadActionCreator } from "@reduxjs/toolkit";
import { useAppDispatch } from "../store";
import { UseMutationResult } from "@tanstack/react-query";
import { PurchaseOrderLabelsMap } from "./labels";
import React from "react";
import { Roles } from "./roles";
import { RouteKeys } from "./routes";
import { Item } from "./state/purchaseOrders";

export interface ActionDeps {
  poName: string | null;
  poUuid: string | null;
  items: Item[] | null;
  labels: PurchaseOrderLabelsMap | null;
  dispatch: ReturnType<typeof useAppDispatch> | null;
  setEditMode: PayloadActionCreator<boolean> | null;
  editMode: boolean | null;
  deletePO: UseMutationResult<any, any, string> | null;
  setShowSnack: React.Dispatch<React.SetStateAction<boolean>> | null;
}

export type ActionHandler = (deps: ActionDeps) => void;

export type ButtonGroup = {
  [role in Roles]: {
    title?: string;
    routes?: Partial<{
      [key in RouteKeys]: {
        buttons: string[];
        actions: {
          [buttonKey: string]: ActionHandler;
        };
      };
    }>;
  };
};
