import axios from 'axios';

export const sendPrompt = async (promptText) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/prompt/', {
      prompt: promptText,
    });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
