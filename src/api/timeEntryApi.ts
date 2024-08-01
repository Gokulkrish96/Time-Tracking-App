import axios from "axios";

const API_URL = "http://your-api-url.com/time-entries";

export const getTimeEntries = async () => {
  return await axios.get(`${API_URL}/time-entries`);
};

export const createTimeEntry = async (timeEntry: {
  projectId: string;
  taskId: string;
  startTime: string;
  endTime: string;
}) => {
  return await axios.post(`${API_URL}/time-entries`, timeEntry);
};

export const updateTimeEntry = async (
  id: string,
  timeEntry: {
    projectId: string;
    taskId: string;
    startTime: string;
    endTime: string;
  }
) => {
  return await axios.put(`${API_URL}/time-entries/${id}`, timeEntry);
};

export const deleteTimeEntry = async (id: string) => {
  return await axios.delete(`${API_URL}/time-entries/${id}`);
};
