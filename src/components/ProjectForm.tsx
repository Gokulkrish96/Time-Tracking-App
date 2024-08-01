import React, { useState, useEffect } from "react";
import { Project } from "../interfaces/Project";

interface ProjectFormProps {
  onSave: (project: Project) => void;
  editingProject?: Project;
  onCancelEdit: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  onSave,
  editingProject,
  onCancelEdit,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name);
      setDescription(editingProject.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [editingProject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      onSave({ ...editingProject, name, description });
    } else {
      onSave({ id: Date.now().toString(), name, description });
    }
    onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {editingProject ? "Edit Project" : "Create New Project"}
      </h2>
      <input
        type="text"
        placeholder="Project Name"
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
          {editingProject ? "Update Project" : "Save Project"}
        </button>
        {editingProject && (
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

export default ProjectForm;
