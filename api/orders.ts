import axios from "axios";

export const getOrders = async () => {
  const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/orders");
  return res.data.orders;
};
export const getOrder = async (id: string) => {
  const res = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + `/orders/${id}`
  );
  return res.data.order;
};

export const createOrder = async (data: any) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/orders",
    data
  );
  return res.data.order;
};

export const fulfillOrder = async (id: string) => {
  await axios.put(process.env.NEXT_PUBLIC_API_URL + `/orders/${id}/fulfilled`);
};
export const cancelOrder = async (id: string) => {
  await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/orders/${id}`);
};
