import axios from "axios";
const baseUrl = "http://localhost:3001/api/player";

export const getUserQuests = async (id, token) => {
  const response = await axios.get(`${baseUrl}/${id}/active-quests`, { headers: { "Authorization" : `Bearer ${token}` } });
  return response.data;
};

export const createQuest = async (id, token, newQuest) => {
  const response = await axios.post(`${baseUrl}/${id}/quests`, newQuest, { headers: { "Authorization" : `Bearer ${token}` } });
  return response.data;
}