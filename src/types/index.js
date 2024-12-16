export function Task(id, title, completed, category, createdAt, completedAt) {
  this.id = id;
  this.title = title;
  this.completed = completed;
  this.category = category;
  this.createdAt = createdAt;
  this.completedAt = completedAt; // Optional property
}

export function Goal(id, title, targetDate, progress, category) {
  this.id = id;
  this.title = title;
  this.targetDate = targetDate;
  this.progress = progress;
  this.category = category;
}

export function PomodoroSettings(workDuration, breakDuration, longBreakDuration, sessionsUntilLongBreak) {
  this.workDuration = workDuration;
  this.breakDuration = breakDuration;
  this.longBreakDuration = longBreakDuration;
  this.sessionsUntilLongBreak = sessionsUntilLongBreak;
}
