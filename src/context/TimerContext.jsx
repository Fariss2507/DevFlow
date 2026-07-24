import { createContext, useContext, useState, useEffect, useRef } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [taskName, setTaskName] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const startTimer = () => {
    if (!taskName.trim()) return;
    setRunning(true);
  };

  const stopTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setSeconds(0);
    setTaskName('');
    setRunning(false);
  };

  return (
    <TimerContext.Provider
      value={{ taskName, setTaskName, seconds, running, startTimer, stopTimer, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}