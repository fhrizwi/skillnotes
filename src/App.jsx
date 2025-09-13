import RoutingMap from "./RoutingMap";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <RoutingMap />
      </div>
    </ThemeProvider>
  )
}