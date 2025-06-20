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
  const dispatch = useAppDispatch();
  const deletePO = useDeletePurchaseOrder();
  const { pathname } = useLocation();
  const [showSnack, setShowSnack] = useState(false);

  const auth = useAppSelector((s) => s.auth);

  const { orderName, uuid, labels, editMode, items } = useAppSelector((s) => ({
    orderName: s.purchaseOrder.orderName,
    uuid: s.purchaseOrder.uuid,
    labels: s.purchaseOrder.labels,
    editMode: s.purchaseOrder.editMode,
    items: s.purchaseOrder.items,
  }));

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
      poName: orderName,
      poUuid: uuid,
      labels: labels,
      items,
      dispatch,
      setEditMode,
      editMode,
      deletePO,
      setShowSnack,
    }),
    [dispatch, setEditMode, editMode, deletePO]
  );

  if (rawKey === "purchaseorders" && !uuid) return null;

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
