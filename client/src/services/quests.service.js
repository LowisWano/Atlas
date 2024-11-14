import axios from "axios";
const baseUrl = "http://localhost:3001/api/player";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getUserQuests = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/active-quests`, { headers: { "Authorization" : token } });
  return response.data;
};
