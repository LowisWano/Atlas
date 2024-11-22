import axios from "axios";
const baseUrl = "http://localhost:3001/api/player";

export const getAchievementsList = async (token) => {
  const response = await axios.get(`${baseUrl}/${id}/list`, { headers: { Authorization : `Bearer ${token}` } });
  return response.data;
};

export const getUserAchievementsList = async (token) => {
  const response = await axios.get(`${baseUrl}/${id}/user-achievements`, { headers: { Authorization : `Bearer ${token}` } });
  return response.data;
};