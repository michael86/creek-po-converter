import api from "..";

export const addPropelairEntry = async (data: any) => {
  try {
    const res = await api.post("propelair/add-entry", data);
    return res.data;
  } catch (error) {
    console.error("Failed to add propelair entry", error);
    throw error;
  }
};
