import axiosInstance from "./axiosInstance";

// Upload document
import axios from "axios";

export const uploadDocument = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(  
    "http://127.0.0.1:8000/api/upload-document/",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Analyse document
export const analyseDocument = async (documentId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `http://127.0.0.1:8000/api/analyse-document/${documentId}/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Ask assistant
export const askDocumentAssistant = async (documentId, question) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `http://127.0.0.1:8000/api/document-assistant/${documentId}/`,
    {
      question: question,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
