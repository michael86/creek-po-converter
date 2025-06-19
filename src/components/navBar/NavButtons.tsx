import { RouteKeys } from "../../types/routes";
import { Button } from "@mui/material";
import { useLocation } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { useDeletePurchaseOrder } from "../../hooks/usePurchaseOrderMutations";
import { setEditMode } from "../../store/slices/purchaseOrder";
import { ROLE_BUTTON_KEYS } from "../../schemas/navButtons/navButtons";
import { ActionDeps } from "../../types/navBar";
import SnackBar from "../SnackBar";

import { useMemo, useState } from "react";
import { Roles } from "../../types/roles";

export default function NavButtons() {
  const auth = useAppSelector((s) => s.auth);
  const po = useAppSelector((s) => s.purchaseOrder);
  const editMode = po.editMode;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const deletePO = useDeletePurchaseOrder();
  const [showSnack, setShowSnack] = useState(false);

  const rawKey = pathname.split("/")[1]?.replace(/-/g, "") || "dashboard";
  const routeKey = RouteKeys[rawKey as keyof typeof RouteKeys];

  const role = auth.role as Roles;

  if (!(role in ROLE_BUTTON_KEYS)) {
    console.warn("Unknown or missing role:", auth.role);
    return null;
  }

  const roleCfg = ROLE_BUTTON_KEYS[role];

  const routeCfg = roleCfg?.routes?.[routeKey];
  const buttons = routeCfg?.buttons ?? [];
  const actions = routeCfg?.actions ?? {};

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

  if (rawKey === "purchaseorders" && !po.uuid) return null;

  return (
    <>
      {buttons.map((btnKey) => {
        const handler = actions[btnKey];
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
