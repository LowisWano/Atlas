import axios from "axios";
const baseUrl = "http://localhost:3001/api/player";
/*
  Base url once project is deployed
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = process.env.PUBLIC_BASE_URL || `${protocol}://${host}`;
*/

export const getUserQuests = async (playerId, token) => {
  const response = await axios.get(`${baseUrl}/${playerId}/active-quests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createQuest = async (playerId, token, newQuest) => {
  const response = await axios.post(`${baseUrl}/${playerId}/quests`, newQuest, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteQuest = async (playerId, token, questId) => {
  const response = await axios.delete(
    `${baseUrl}/${playerId}/quests/${questId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const editQuest = async (playerId, token, questId, editedQuest) => {
  console.log(editedQuest)
  const response = await axios.put(
    `${baseUrl}/${playerId}/quests/${questId}`,
    editedQuest,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
