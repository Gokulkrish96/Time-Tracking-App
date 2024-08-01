import React, { useEffect, useState } from "react";
import {
  getTimeEntries,
  createTimeEntry,
  updateTimeEntry,
  deleteTimeEntry,
} from "../api/timeEntryApi";
import TimeEntryForm from "./TimeEntryForm";
import { getProjects } from "../api/projectApi";
import { getTasks } from "../api/taskApi";
import { Project } from "../interfaces/Project";
import { Task } from "../interfaces/Task";
import { TimeEntry } from "../interfaces/TimeEntry";

const TimeTracker: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTimeEntry, setEditingTimeEntry] = useState<
    TimeEntry | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const [timeEntriesRes, projectsRes, tasksRes] = await Promise.all([
        getTimeEntries(),
        getProjects(),
        getTasks(),
      ]);
      setTimeEntries(timeEntriesRes.data);
      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
    };
    fetchData();
  }, []);

  const handleSave = async (timeEntry: TimeEntry) => {
    if (editingTimeEntry) {
      const res = await updateTimeEntry(timeEntry.id, timeEntry);
      setTimeEntries(
        timeEntries.map((entry) =>
          entry.id === timeEntry.id ? res.data : entry
        )
      );
    } else {
      const res = await createTimeEntry(timeEntry);
      setTimeEntries([...timeEntries, res.data]);
    }
    setEditingTimeEntry(undefined);
  };

  const handleEdit = (timeEntry: TimeEntry) => {
    setEditingTimeEntry(timeEntry);
  };

  const handleDelete = async (id: string) => {
    await deleteTimeEntry(id);
    setTimeEntries(timeEntries.filter((entry) => entry.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingTimeEntry(undefined);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Time Tracker</h2>
      <TimeEntryForm
        onSave={handleSave}
        projects={projects}
        tasks={tasks}
        editingTimeEntry={editingTimeEntry}
        onCancelEdit={handleCancelEdit}
      />
      <ul className="mt-4 space-y-4">
        {timeEntries.map((entry) => (
          <li
            key={entry.id}
            className="border border-gray-300 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Project:</strong>{" "}
                {projects.find((p) => p.id === entry.projectId)?.name}
              </p>
              <p>
                <strong>Task:</strong>{" "}
                {tasks.find((t) => t.id === entry.taskId)?.name}
              </p>
              <p>
                <strong>Start Time:</strong> {entry.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {entry.endTime}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(entry)}
                className="bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeTracker;
