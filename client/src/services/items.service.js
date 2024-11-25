import axios from "axios";
const baseUrl = "http://localhost:3001/api/items";
/*
  Base url once project is deployed
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = process.env.PUBLIC_BASE_URL || `${protocol}://${host}`;
*/

export const getUserItems = async (token) => {
  const response = await axios.get(`${baseUrl}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

