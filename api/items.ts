import axios from "axios";

export const getItems = async () => {
  const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/items");
  return res.data.items;
};
export const getItem = async (id: string) => {
  const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + `/items/${id}`);
  return res.data.item;
};

export const createItem = async (data: any) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/items",
    data
  );
  return res.data.item;
};

export const updateItem = async (id: string, data: any) => {
  const res = await axios.put(
    process.env.NEXT_PUBLIC_API_URL + `/items/${id}`,
    data
  );
  return res.data.item;
};

export const deleteItem = async (id: string) => {
  await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/items/${id}`);
};
