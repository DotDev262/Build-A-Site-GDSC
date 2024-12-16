import { calculateProductivity, calculateGoalProgress, getProductivityStreak } from '../utils/statistics';
import { Flame } from 'lucide-react';

export default function ProductivityStats({ tasks, goals }) {
  const productivity = Math.round(calculateProductivity(tasks));
  const goalProgress = Math.round(calculateGoalProgress(goals));
  const streak = getProductivityStreak(tasks);

  return (
    <div className="bg-gradient-to-br  from-blue-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="bg-white/20 rounded-full p-3 w-12 h-12 mx-auto mb-2">
            <span className="material-symbols-outlined">trophy</span> {/* Trophy symbol */}
          </div>
          <div className="text-2xl font-bold">{productivity}%</div>
          <div className="text-sm opacity-80">Task Completion</div>
        </div>
        <div className="text-center">
          <div className="bg-white/20 rounded-full p-3 w-12 h-12 mx-auto mb-2">
            {/* <Target className="w-6 h-6" /> */}
            <span className="material-symbols-outlined">target</span> {/* Target symbol */}
          </div>
          <div className="text-2xl font-bold">{goalProgress}%</div>
          <div className="text-sm opacity-80">Goal Progress</div>
        </div>
        <div className="text-center">
          <div className="bg-white/20 rounded-full p-3 w-12 h-12 mx-auto mb-2">
            <Flame className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold">{streak}</div>
          <div className="text-sm opacity-80">Day Streak</div>
        </div>
      </div>
    </div>
  );
}
