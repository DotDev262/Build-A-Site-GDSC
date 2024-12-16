
import TaskList from "./components/TaskList";
import PomodoroTimer from "./components/PomodoroTimer";
import GoalTracker from "./components/GoalTracker";
import ProductivityStats from "./components/ProductivityStats";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { StorageKeys } from "./utils/storage";
import { useMouseTrail } from "./hooks/useMouseTrail";
import logo from "./components/Logo.png";

function App() {
  const [tasks] = useLocalStorage(StorageKeys.TASKS, []);
  const [goals] = useLocalStorage(StorageKeys.GOALS, []);

  // Enable mouse trail effect
  useMouseTrail();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm relative top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img id="logo" src={logo} alt="My Image" />
            <h1 className="text-2xl font-bold text-gray-900">FOCUS MORPH</h1>
            <div className="flex justify-end items-center px-4 w-full">
              <button className="button-89" role="button" onClick={() => (window.location.href = "")}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 transform hover:scale-[1.01] transition-transform duration-300">
          <ProductivityStats tasks={tasks} goals={goals} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TaskList />
          <PomodoroTimer />
          <GoalTracker />
        </div>
      </main>
    </div>
  );
}

export default App;
