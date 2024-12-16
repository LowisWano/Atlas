import axios from "axios";
const baseUrl = "http://localhost:3001/api/player";
const userUrl = "http://localhost:3001/api/user";

export const getPlayerInfo = async (playerId, token) => {
  const response = await axios.get(`${baseUrl}/${playerId}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserInfo = async (playerId, token) => {
  const response = await axios.get(`${userUrl}/${playerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updatePlayer = async (playerId, token, updatePlayerInfo) => {
  const response = await axios.put(`${baseUrl}/${playerId}/profile/update`, updatePlayerInfo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser  = async (playerId, token, name) => {
  const response = await axios.put(`${userUrl}/${playerId}/username`,  name, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const uploadProfilePic = async (playerId, token, formData) => {
  const response = await axios.post(`${baseUrl}/${playerId}/profile/upload`, formData, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};