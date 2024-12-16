import { useState } from 'react';
import { Target, Trash2 } from 'lucide-react';

export default function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const addGoal = (e) => {
    e.preventDefault();
    if (!newGoal.trim() || !targetDate) return;

    const goal = {
      id: crypto.randomUUID(),
      title: newGoal,
      targetDate: new Date(targetDate),
      progress: 0,
      category: 'default'
    };

    setGoals([...goals, goal]);
    setNewGoal('');
    setTargetDate('');
  };

  const updateProgress = (id, progress) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, progress: Math.min(100, Math.max(0, progress)) } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Goals</h2>

      <form onSubmit={addGoal} className="space-y-3 mb-6">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter your goal..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            {/* <Plus size={24} /> */}
            <span className=" p-0.9  material-symbols-outlined">add</span>
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Target size={20} className="text-blue-500" />
                  {goal.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Due: {goal.targetDate.toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <input
                type="range"
                value={goal.progress}
                onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

