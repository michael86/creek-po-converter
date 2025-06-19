import { PayloadActionCreator } from "@reduxjs/toolkit";
import { useAppDispatch } from "../store";
import { UseMutationResult } from "@tanstack/react-query";
import { PurchaseOrderLabelsMap } from "./labels";
import React from "react";
import { PoState } from "./state/purchaseOrders";
import { Roles } from "./roles";
import { RouteKeys } from "./routes";

export interface ActionDeps {
  uuid?: string | null;
  dispatch?: ReturnType<typeof useAppDispatch>;
  setEditMode?: PayloadActionCreator<boolean>;
  editMode?: boolean;
  deletePO?: UseMutationResult<any, any, string>;
  setShowSnack?: React.Dispatch<React.SetStateAction<boolean>>;
  purchaseOrder?: PoState;
  labels?: PurchaseOrderLabelsMap;
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
