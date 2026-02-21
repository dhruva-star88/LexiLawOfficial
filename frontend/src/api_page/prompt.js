import axios from "axios";

export const sendPrompt = async (promptText) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.post(
      "http://127.0.0.1:8000/api/prompt/",
      { prompt: promptText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};