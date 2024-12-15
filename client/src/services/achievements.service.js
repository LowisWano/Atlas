import axios from "axios";
const baseUrl = "http://localhost:3001/api/achievements";

export const getAchievementsList = async (token) => {
  const response = await axios.get(`${baseUrl}/list`, { headers: { Authorization : `Bearer ${token}` } });
  return response.data;
};

export const getUserAchievementsList = async (id, token) => {
  const response = await axios.get(`${baseUrl}/${id}/user-achievements`, { headers: { Authorization : `Bearer ${token}` } });
  return response.data;
};