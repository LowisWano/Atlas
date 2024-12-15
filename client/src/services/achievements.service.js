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

export const checkFirstQuestAchievement = async (id, token) => {
  try {
    await axios.post(`${baseUrl}/${id}/check-first-quest`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Error checking first quest achievement:", error);
  }
};

export const checkFirstMainQuestAchievement = async (id, token) => {
  try {
    await axios.post(`${baseUrl}/${id}/check-first-main-quest`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Error checking first main quest achievement:", error);
  }
};

export const checkFirstDailyQuestAchievement = async (id, token) => {
  try {
    await axios.post(`${baseUrl}/${id}/check-first-daily-quest`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Error checking first daily quest achievement:", error);
  }
};

export const checkFirstPurchaseAchievement = async (id, token) => {
  try {
    await axios.post(`${baseUrl}/${id}/check-first-purchase`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Error checking first purchase achievement:", error);
  }
};

export const check5000GoldAchievement = async (id, token) => {
  try {
    await axios.post(`${baseUrl}/${id}/check-5000-gold`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("Error checking 5000 gold achievement:", error);
  }
};