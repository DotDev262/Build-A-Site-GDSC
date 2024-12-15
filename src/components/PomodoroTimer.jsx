import { useState, useEffect } from 'react';
import TimerSettings from './TimerSettings';
import { useSound } from '../hooks/useSound';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { StorageKeys } from '../utils/storage';

export default function PomodoroTimer() {
  const [settings, setSettings] = useLocalStorage(StorageKeys.POMODORO, {
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4
  });

  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const { playAlarm } = useSound();

  useEffect(() => {
    let interval;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playAlarm();
      if (isWork) {
        const newSessions = sessions + 1;
        setSessions(newSessions);

        if (newSessions % settings.sessionsUntilLongBreak === 0) {
          setTimeLeft(settings.longBreakDuration * 60);
        } else {
          setTimeLeft(settings.breakDuration * 60);
        }
      } else {
        setTimeLeft(settings.workDuration * 60);
      }
      setIsWork(!isWork);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWork, sessions, settings, playAlarm]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsWork(true);
    setTimeLeft(settings.workDuration * 60);
    setSessions(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (isWork ? settings.workDuration * 60 :
    (sessions % settings.sessionsUntilLongBreak === 0 ? settings.longBreakDuration : settings.breakDuration) * 60)) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center transform hover:scale-[1.02] transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4">Pomodoro Timer</h2>

      <div className="relative mb-8 group">
        <svg className="w-48 h-48 mx-auto transform -rotate-90">
          <circle
            className="  text-gray-200"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="90"
            cx="96"
            cy="96"
          />
          <circle
            className="text-blue-500 transition-all duration-300"
            strokeWidth="8"
            strokeDasharray={565.48} // Updated to the new circumference (2 * π * 90)
            strokeDashoffset={565.48 - (565.48 * progress) / 100} // Adjust the strokeDashoffset based on the new circumference
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="90"  // The new radius
            cx="96"
            cy="96"
          />
        </svg>
        <div className=" absolute inset-0 flex flex-col items-center justify-center">
          <div className=" text-5xl font-bold mb-2 animate-pulse-subtle">{formatTime(timeLeft)}</div>
          <div className="text-lg text-gray-600">
            {isWork ? 'Study Time' : 'Break Time'}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={toggleTimer}
          className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-all transform hover:scale-110 active:scale-95"
        >
          {isActive ? (
            <span className=" p-1  material-icons">pause</span>
          ) : (
            <span className=" p-1 material-icons">play_arrow</span>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-200 text-gray-700 p-4 rounded-full hover:bg-gray-300 transition-all transform hover:scale-110 active:scale-95"
        >
          <span className=" p-1 material-icons">rotate_left</span>
        </button>
        <button
          onClick={() => setShowSettings(true)}
          className="bg-gray-200 text-gray-700 p-4 rounded-full hover:bg-gray-300 transition-all transform hover:scale-110 active:scale-95"
        >
          <span className=" p-1 material-icons">settings</span>
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        Session {Math.floor(sessions / settings.sessionsUntilLongBreak) + 1} •
        {sessions % settings.sessionsUntilLongBreak + 1}/{settings.sessionsUntilLongBreak} until long break
      </div>

      <TimerSettings
        settings={settings}
        onSettingsChange={setSettings}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}