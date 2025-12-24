import axios from 'axios';

const API_URL = 'https://toxic-christmas-backend.onrender.com/api/judge';

export const getJudgment = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error getting judgment:", error);
    throw error;
  }
};
