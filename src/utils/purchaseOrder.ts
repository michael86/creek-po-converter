import { Items } from "../types/state/purchaseOrders";

type UpdateItemLocationsByPart = (items: Items, partNumber: string, newLocation: string) => Items;
export const updateItemLocationsByPart: UpdateItemLocationsByPart = (
  items,
  partNumber,
  newLocation
) => {
  const updated = { ...items };

  for (const id in updated) {
    if (updated[id].partNumber === partNumber) {
      updated[id] = {
        ...updated[id],
        storageLocation: newLocation,
      };
    }
  }

  return updated;
};
