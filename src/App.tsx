import React, { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TimeTracker from "./components/TimeTracker";
import { Project } from "./interfaces/Project";
import { Task } from "./interfaces/Task";

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingProject, setEditingProject] = useState<Project | undefined>(
    undefined
  );
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleSaveProject = (project: Project) => {
    if (editingProject) {
      setProjects(projects.map((p) => (p.id === project.id ? project : p)));
    } else {
      setProjects([...projects, project]);
    }
    setEditingProject(undefined);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    setEditingTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Time Tracking App</h1>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>
        <ProjectForm
          onSave={handleSaveProject}
          editingProject={editingProject}
          onCancelEdit={() => setEditingProject(undefined)}
        />
        <ProjectList
          projects={projects}
          onEdit={handleEditProject}
          onDelete={handleDeleteProject}
        />
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Manage Tasks</h2>
        <TaskForm
          onSave={handleSaveTask}
          projects={projects}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(undefined)}
        />
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </div>
      <TimeTracker />
    </div>
  );
};

export default App;
