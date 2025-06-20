import { PurchaseOrderLabelsMap } from "../../types/labels";
import { ActionDeps } from "../../types/navBar";
import { Delivery } from "../../types/state/purchaseOrders";
import { genPurchaseOrderLabels } from "../../utils/Nav/purchaseOrders";

export const setEditPoTable = ({ dispatch, setEditMode, editMode }: ActionDeps) => {
  if (dispatch && setEditMode && editMode !== undefined) dispatch(setEditMode(!editMode));
};

export const deletePo = ({ poUuid, deletePO }: ActionDeps) => {
  if (poUuid && deletePO) {
    deletePO.mutate(poUuid);
  }
};

export const printSelected = ({ poName, labels, setShowSnack }: ActionDeps) => {
  if (labels && setShowSnack && poName) genPurchaseOrderLabels(poName, labels, setShowSnack);
};

export const printAll = ({ poName, items, setShowSnack }: ActionDeps) => {
  if (!setShowSnack || !poName || !items || items.length === 0) return;

  const allLabels: PurchaseOrderLabelsMap = {};

  Object.entries(items).forEach(([_, item]) => {
    const { partNumber, description, storageLocation, deliveries } = item;

    (deliveries || []).forEach((delivery: Delivery) => {
      const uuid = delivery.id;

      allLabels[uuid] = {
        dateReceived: delivery.dateReceived,
        quantityReceived: delivery.quantityReceived,
        description,
        partNumber,
        storageLocation: storageLocation || null,
      };
    });
  });

  genPurchaseOrderLabels(poName, allLabels, setShowSnack);
};
