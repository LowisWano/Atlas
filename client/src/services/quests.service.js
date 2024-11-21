import axios from "axios";
const baseUrl = "http://localhost:3001/api/player";

export const getUserQuests = async (playerId, token) => {
  const response = await axios.get(`${baseUrl}/${playerId}/active-quests`, { headers: { "Authorization" : `Bearer ${token}` } });
  return response.data;
};

export const createQuest = async (playerId, token, newQuest) => {
  const response = await axios.post(`${baseUrl}/${playerId}/quests`, newQuest, { headers: { "Authorization" : `Bearer ${token}` } });
  return response.data;
}

export const deleteQuest = async (playerId, token, questId) => {
  const response = await axios.post(`${baseUrl}/${playerId}/quests/${questId}`, { headers: { "Authorization" : `Bearer ${token}` } });
  return response.data;
}