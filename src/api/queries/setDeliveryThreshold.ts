import api from "..";

export const setDeliveryThreshold = async (uuid: string, state: boolean) => {
  try {
    const res = await api.put(`purchase-order/order-items/${uuid}/threshold`, { state });
    return res.data;
  } catch (error) {
    console.error("Failed to set delivery threshold", error);
    throw error;
  }
};
