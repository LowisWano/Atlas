import axios from "axios";
const baseUrl = "http://localhost:3001/api/auth"; // make this conditional to include actual baseUrl once Atlas is hosted and deployed

/**
 * 
 * @param {*} credentials 
 * @returns jwt token
 */
export const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
}

export const signup = async(userDetails) => {
  const response = await axios.post(`${baseUrl}/signup`, userDetails);
  return response.data;
}