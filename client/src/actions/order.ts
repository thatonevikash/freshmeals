import useSWR, { mutate } from "swr";

import axios, { fetcher, endpoints } from "@/lib/axios";

// -------------------------------------------------------------

type OrderItemPayload =
  | { type: "Meal"; meal: string; quantity: number }
  | { type: "Plate"; plate: string; quantity: number };

interface PlaceOrderPayload {
  delivery_information: {
    mobile_no: string;
    address: string;
  };
  order_items: OrderItemPayload[];
}

export async function placeOrderApi(payload: PlaceOrderPayload) {
  const URL = endpoints.general.order.root;

  const res = await axios.post(URL, payload);

  if (res.status !== 201) {
    throw new Error("Unable to place order!");
  }

  mutate(URL);

  return res.data;
}

export function useGetOrders() {
  const URL = endpoints.general.order.root;

  return useSWR(URL, fetcher);
}
