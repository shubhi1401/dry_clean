import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const createOrder = (data) => API.post("/create-order", data);
export const getOrders = () => API.get("/orders");
export const updateStatus = (id, status) =>
  API.put(`/update-status/${id}`, { status });
export const getDashboard = () => API.get("/dashboard");