import axios from "axios";

const HTTP = axios.create({
  baseURL: "http://localhost:8000/api/v1/contractApp",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getContracts = (params) => HTTP.get("/contracts", { params });
export const getContractById = (id) => HTTP.get(`/contractDetail/${id}`);
export const updateContract = (id, data) => HTTP.put(`/contractDetail/${id}`, data);
export const deleteContract = (id) => HTTP.delete(`/contractDetail/${id}`);
export const uploadContract = (formData) =>
  HTTP.post("/contracts/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export default HTTP;
