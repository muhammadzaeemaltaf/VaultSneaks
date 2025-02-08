import { client } from "../lib/client";

export const DeleteOrder = async (orderId: string) => {
  try {
    const cancelledOrder = await client
      .patch(orderId)
      .set({ status: "cancelled" })
      .commit();
    return cancelledOrder;
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};
