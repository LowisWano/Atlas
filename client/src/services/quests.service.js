import axios from "axios";
const baseUrl = "http://localhost:3001/player/";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getUserQuests = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/quests`)
  return response.data;
}