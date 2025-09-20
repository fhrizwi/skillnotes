import RoutingMap from "./RoutingMap";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import NotificationContainer from "./components/Notification";
import "./styles/toggle.css";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
            <RoutingMap />
            <NotificationContainer />
          </div>
        </NotificationProvider>
      </CartProvider>
    </ThemeProvider>
  )
}