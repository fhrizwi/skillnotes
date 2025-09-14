import RoutingMap from "./RoutingMap";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import "./styles/toggle.css";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
          <RoutingMap />
        </div>
      </CartProvider>
    </ThemeProvider>
  )
}