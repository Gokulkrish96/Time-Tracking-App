import React, { useState, useEffect } from "react";
import { TimeEntry } from "../interfaces/TimeEntry";
import { Project } from "../interfaces/Project";
import { Task } from "../interfaces/Task";

interface TimeEntryFormProps {
  onSave: (timeEntry: TimeEntry) => void;
  projects: Project[];
  tasks: Task[];
  editingTimeEntry?: TimeEntry;
  onCancelEdit: () => void;
}

const TimeEntryForm: React.FC<TimeEntryFormProps> = ({
  onSave,
  projects,
  tasks,
  editingTimeEntry,
  onCancelEdit,
}) => {
  const [projectId, setProjectId] = useState("");
  const [taskId, setTaskId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (editingTimeEntry) {
      setProjectId(editingTimeEntry.projectId);
      setTaskId(editingTimeEntry.taskId);
      setStartTime(editingTimeEntry.startTime);
      setEndTime(editingTimeEntry.endTime);
    } else {
      setProjectId("");
      setTaskId("");
      setStartTime("");
      setEndTime("");
    }
  }, [editingTimeEntry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTimeEntry) {
      onSave({ ...editingTimeEntry, projectId, taskId, startTime, endTime });
    } else {
      onSave({
        id: Date.now().toString(),
        projectId,
        taskId,
        startTime,
        endTime,
      });
    }
    onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {editingTimeEntry ? "Edit Time Entry" : "Log Time Entry"}
      </h2>
      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
        required
      >
        <option value="">Select Project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
      <select
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
        required
      >
        <option value="">Select Task</option>
        {tasks.map((task) => (
          <option key={task.id} value={task.id}>
            {task.name}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
        required
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
        required
      />
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {editingTimeEntry ? "Update Time Entry" : "Save Time Entry"}
        </button>
        {editingTimeEntry && (
          <button
            onClick={onCancelEdit}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TimeEntryForm;
