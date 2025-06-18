import { PurchaseOrderLabelsMap } from "../../types/labels";
import { ActionDeps } from "../../types/navBar";
import { Delivery } from "../../types/state/purchaseOrders";
import { genPurchaseOrderLabels } from "../../utils/Nav/purchaseOrders";

export const setEditPoTable = ({ dispatch, setEditMode, editMode }: ActionDeps) => {
  if (dispatch && setEditMode && editMode !== undefined) dispatch(setEditMode(!editMode));
};

export const deletePo = ({ uuid, deletePO }: ActionDeps) => {
  if (uuid && deletePO) {
    deletePO.mutate(uuid);
  }
};

export const printSelected = ({ labels, setShowSnack }: ActionDeps) => {
  if (labels && setShowSnack) genPurchaseOrderLabels(labels, setShowSnack);
};

export const printAll = ({ purchaseOrder, setShowSnack }: ActionDeps) => {
  if (!purchaseOrder || !setShowSnack) return;

  const allLabels: PurchaseOrderLabelsMap = {};
  if (!purchaseOrder.items) {
    setShowSnack(true);
    return;
  }

  purchaseOrder.items.forEach((item) => {
    const partNumber = item.partNumber;
    const history = item.deliveries || {};

    Object.entries(history).forEach(([historyId, historyEntry]) => {
      const history = historyEntry as Delivery;

      if (!allLabels[partNumber]) allLabels[partNumber] = {};
      allLabels[partNumber][+historyId] = {
        purchaseOrder: purchaseOrder.name || "",
        dateReceived: history.dateReceived,
        quantityReceived: history.quantityReceived,
        description: item.description,
        partNumber,
        storageLocation: item.storageLocation || null,
      };
    });
  });

  genPurchaseOrderLabels(allLabels, setShowSnack);
};
