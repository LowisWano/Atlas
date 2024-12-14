// items.service.js
import axios from "axios";
const baseUrl = "http://localhost:3001/api/items";
const playerUrl = "http://localhost:3001/api/player";

export const getUserItems = async (token) => {
  const response = await axios.get(`${baseUrl}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUserPurchases = async (playerId, token) => {
  const response = await axios.get(`${playerUrl}/${playerId}/profile/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getPlayerInfo = async (playerId, token) => {
  const response = await axios.get(`${playerUrl}/${playerId}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const purchaseItem = async (playerId, itemId, token) => {
  const response = await axios.post(
    `${playerUrl}/${playerId}/purchase`,
    { itemId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};