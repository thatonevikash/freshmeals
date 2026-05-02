import axios, { endpoints } from "@/lib/axios";

// -------------------------------------------------------------

export async function registerSellerApi() {
  const URL = endpoints.general.seller.register;

  try {
    const res = await axios.put(URL);

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Unable to register seller");
    }

    return res.data;
  } catch (error) {
    const message =
      error && typeof error === "object" && "response" in error && (error as { response?: { data?: { message?: string } } }).response?.data?.message
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : "Unable to register seller";

    throw new Error(message);
  }
}

export async function unregisterSellerApi() {
  const URL = endpoints.general.seller.unregister;

  try {
    const res = await axios.put(URL);

    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Unable to unregister seller");
    }

    return res.data;
  } catch (error) {
    const message =
      error && typeof error === "object" && "response" in error && (error as { response?: { data?: { message?: string } } }).response?.data?.message
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : "Unable to unregister seller";

    throw new Error(message);
  }
}
