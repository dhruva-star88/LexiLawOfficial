import axiosInstance from "./axiosInstance";

// Upload document
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    "/upload-document/",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Analyse document
export const analyseDocument = async (documentId) => {
  const response = await axiosInstance.post(
    `/analyse-document/${documentId}/`
  );

  return response.data;
};

// Ask assistant
export const askDocumentAssistant = async (documentId, question) => {
  const response = await axiosInstance.post(
    `/document-assistant/${documentId}/`,
    {
      question: question,
    }
  );

  return response.data;
};
