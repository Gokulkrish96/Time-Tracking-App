import React from "react";
import { Project } from "../interfaces/Project";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Project List</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="flex justify-between items-center border border-gray-300 p-4 rounded-lg"
          >
            <div>
              <h3 className="text-md font-bold">{project.name}</h3>
              <p>{project.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(project)}
                className="bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(project.id)}
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

export default ProjectList;
