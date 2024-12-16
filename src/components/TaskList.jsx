import { useState } from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { StorageKeys } from '../utils/storage';

export default function TaskList() {
  const [tasks, setTasks] = useLocalStorage(StorageKeys.TASKS, []);
  const [newTask, setNewTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: crypto.randomUUID(),
      title: newTask,
      completed: false,
      category: 'default',
      createdAt: new Date(),
    };

    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date() : undefined }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full transform transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tasks</h2>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95"
        >
          {/* <Plus size={24} /> */}
          <span className=" p-2 material-symbols-outlined">add</span>
        </button>
      </form>

      <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        {tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg group transform transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className={`text-lg transform transition-all hover:scale-110 ${
                  task.completed ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
              <span className={`${
                task.completed ? 'line-through text-gray-400' : 'text-gray-700'
              } transition-all`}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:text-red-600 transform hover:scale-110"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
