import axios from "axios";
import { API_URL } from "../common/utils";

export const getTasks = async () => {
  return await axios.get(`${API_URL}/tasks`);
};

export const createTask = async (task: {
  name: string;
  description: string;
  projectId: string;
}) => {
  return await axios.post(`${API_URL}/tasks`, task);
};

export const updateTask = async (
  id: string,
  task: { name: string; description: string }
) => {
  return await axios.put(`${API_URL}/tasks/${id}`, task);
};

export const deleteTask = async (id: string) => {
  return await axios.delete(`${API_URL}/tasks/${id}`);
};
