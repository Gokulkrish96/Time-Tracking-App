import React from "react";
import { Task } from "../interfaces/Task";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Task List</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border border-gray-300 p-4 rounded-lg"
          >
            <div>
              <h3 className="text-md font-bold">{task.name}</h3>
              <p>{task.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="bg-yellow-500 text-white py-1 px-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
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

export default TaskList;
