import axios from 'axios';

const API_URL = 'http://localhost:3000/api/judge';

export const getJudgment = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error getting judgment:", error);
    throw error;
  }
};
