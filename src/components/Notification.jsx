import React from 'react';
import { Check, X, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = ({ notification }) => {
  const { removeNotification } = useNotification();

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white dark:text-black" />
          </div>
        );
      case 'error':
        return (
          <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <X className="w-4 h-4 text-white dark:text-black" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-white dark:text-black" />
          </div>
        );
      case 'info':
        return (
          <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <Info className="w-4 h-4 text-white dark:text-black" />
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <Info className="w-4 h-4 text-white dark:text-black" />
          </div>
        );
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100';
      case 'error':
        return 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100';
      case 'warning':
        return 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100';
      case 'info':
        return 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100';
      default:
        return 'bg-white dark:bg-black border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100';
    }
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-md border shadow-sm transition-all duration-300 w-64 ${getStyles()}`}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{notification.message}</p>
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

const NotificationContainer = () => {
  const { notifications } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;
