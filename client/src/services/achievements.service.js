import axios from "axios";
const baseUrl = "http://localhost:3001/api/quests";

export const getAchievementsList = async (token) => {
  const response = await axios.get(`${baseUrl}/list`, { headers: { Authorization : `Bearer ${token}` } });
  return response.data;
};

export const getUserAchievementsList = async (id, token) => {
  console.log("Fetching user achievements for playerId:", id);
  const response = await axios.get(`${baseUrl}/${id}/user-achievements`, { headers: { Authorization : `Bearer ${token}` } });
  console.log("Fetched user achievements:", response.data);
  return response.data;
};