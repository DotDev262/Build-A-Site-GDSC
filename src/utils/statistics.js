// Removed TypeScript-specific imports
// import { Task, Goal } from '../types'; // This import is not necessary in JavaScript

export function calculateProductivity(tasks) {
  if (tasks.length === 0) return 0;
  const completedTasks = tasks.filter(task => task.completed);
  return (completedTasks.length / tasks.length) * 100;
}

export function calculateGoalProgress(goals) {
  if (goals.length === 0) return 0;
  const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0);
  return totalProgress / goals.length;
}

export function getProductivityStreak(tasks) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const tasksForDay = tasks.filter(task => {
      const taskDate = new Date(task.completedAt || task.createdAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === currentDate.getTime();
    });

    if (tasksForDay.length === 0) break;
    
    const completedTasks = tasksForDay.filter(task => task.completed);
    if (completedTasks.length === 0) break;

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}
