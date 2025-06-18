import { Button } from "@mui/material";
import { useLocation } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { useDeletePurchaseOrder } from "../../hooks/usePurchaseOrderMutations";
import { setEditMode } from "../../store/slices/purchaseOrder";
import { ROLE_BUTTON_KEYS } from "../../schemas/navButtons/navButtons";
import { ActionDeps } from "../../types/navBar";
import SnackBar from "../SnackBar";

import { useMemo, useState } from "react";

export default function NavButtons() {
  const auth = useAppSelector((s) => s.auth);
  const po = useAppSelector((s) => s.purchaseOrder);
  const editMode = po.editMode;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const deletePO = useDeletePurchaseOrder();
  const [showSnack, setShowSnack] = useState(false);

  const pathKey = pathname.replace(/[-/]/g, "");

  const roleCfg = ROLE_BUTTON_KEYS[auth.role ?? -1]; // fallback to -1 for undefined roles

  const deps: ActionDeps = useMemo(
    () => ({
      dispatch,
      setEditMode,
      editMode,
      uuid: po.uuid,
      deletePO,
      labels: po.labels,
      purchaseOrder: po,
      setShowSnack,
    }),
    [dispatch, setEditMode, editMode, po, deletePO]
  );

  if (!auth.role || !("buttons" in roleCfg)) return null;
  if (pathKey === "purchaseorders" && !po.items) return null;

  return (
    <>
      {roleCfg.buttons.map((btnKey) => {
        const handler = roleCfg.actions?.[btnKey];
        if (!handler) return null;

        return (
          <Button
            key={btnKey}
            variant="outlined"
            color="inherit"
            onClick={() => handler(deps)}
            sx={{ mr: 2.5 }}
          >
            {btnKey.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase())}
          </Button>
        );
      })}
      {showSnack && <SnackBar setShowSnack={setShowSnack} message="No labels to Print" />}
    </>
  );
}
