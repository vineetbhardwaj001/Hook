import axios from "axios";

export const uploadVideo = (file) => {
  let formData = new FormData();
  formData.append("video", file);
  return axios.post("/api/analysis", formData);
};

export const generateScript = (params) => {
  return axios.post("/api/generate-script", params);
};
