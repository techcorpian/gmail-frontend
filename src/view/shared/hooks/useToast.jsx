import { useState, useEffect } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState({ message: '', type: '', isVisible: false });
  const [fadeOut, setFadeOut] = useState(false);
  const [duration, setDuration] = useState(5000); // Default duration set to 5000 ms

  const showToast = (message, type = 'success', duration = 5000) => {
    setToast({ message, type, isVisible: true });
    setFadeOut(false); // Reset fade-out state
    setDuration(duration); // Set the duration for the toast

    // Automatically hide the toast after the specified duration
    setTimeout(() => {
      setToast({ message: '', type: '', isVisible: false });
    }, duration);
  };

  const toastStyles = {
    success: 'bg-green-300 top-4 left-1/2',
    warning: 'bg-yellow-300 top-4 left-1/2',
    error: 'bg-red-300 top-4 left-1/2',
    info: 'bg-blue-300 bottom-4 left-1/4 z-20',
  };

  const ToastComponent = () => {
    useEffect(() => {
      if (toast.isVisible) {
        const fadeTimer = setTimeout(() => {
          setFadeOut(true);
        }, duration - 1000); // Start fading out 1 second before hiding

        return () => {
          clearTimeout(fadeTimer);
        };
      }
    }, [toast.isVisible, duration]);

    return (
      toast.isVisible && (
        <div
          className={`fixed transform -translate-x-1/2 py-2 px-5 rounded-lg shadow-lg transition-opacity duration-1000 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          } ${toastStyles[toast.type]}`}
        >
          {toast.message}
        </div>
      )
    );
  };

  return { showToast, ToastComponent };
};
