import React, { useState, useEffect } from "react";
import { Task } from "../interfaces/Task";
import { Project } from "../interfaces/Project";

interface TaskFormProps {
  onSave: (task: Task) => void;
  projects: Project[];
  editingTask?: Task;
  onCancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSave,
  projects,
  editingTask,
  onCancelEdit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      setProjectId(editingTask.projectId);
    } else {
      setName("");
      setDescription("");
      setProjectId("");
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      onSave({ ...editingTask, name, description, projectId });
    } else {
      onSave({ id: Date.now().toString(), name, description, projectId });
    }
    onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {editingTask ? "Edit Task" : "Create New Task"}
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
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full"
        rows={4}
      />
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {editingTask ? "Update Task" : "Save Task"}
        </button>
        {editingTask && (
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

export default TaskForm;
