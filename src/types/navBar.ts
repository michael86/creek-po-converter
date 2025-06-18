import { PayloadActionCreator } from "@reduxjs/toolkit";
import { useAppDispatch } from "../store";
import { UseMutationResult } from "@tanstack/react-query";
import { PurchaseOrderLabelsMap } from "./labels";
import React from "react";
import { PoState } from "./state/purchaseOrders";

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

export interface ButtonGroup {
  [key: number]:
    | {
        title: string;
        buttons: string[];
        actions?: {
          [key: string]: (deps: ActionDeps) => void;
        };
      }
    | {};
}
