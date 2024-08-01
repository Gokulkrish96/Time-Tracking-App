import axios from "axios";
import { API_URL } from "../common/utils";

export const getProjects = async () => {
  return await axios.get(`${API_URL}/projects`);
};

export const createProject = async (project: {
  name: string;
  description: string;
}) => {
  return await axios.post(`${API_URL}/projects`, project);
};

export const updateProject = async (
  id: string,
  project: { name: string; description: string }
) => {
  return await axios.put(`${API_URL}/projects/${id}`, project);
};

export const deleteProject = async (id: string) => {
  return await axios.delete(`${API_URL}/projects/${id}`);
};
