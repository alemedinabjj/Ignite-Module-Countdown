import { createContext, useContext, useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextData {
  activeCountdown: Cycle | undefined;
  cycles: Cycle[];
  markCycleAsFinished: () => void;
  isCountdownActive: string | null;
  setIsCountdownActive: React.Dispatch<React.SetStateAction<string | null>>;
  amountSecondsPassed: number;
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
  totalSeconds: number;
  handleCreateNewCycle: (data: NewCycleFormData) => void;
  handleInteruptCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

interface CyclesProviderProps {
  children: React.ReactNode;
}

export const CycleProvider = ({ children }: CyclesProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [isCountdownActive, setIsCountdownActive] = useState<string | null>(
    null
  );

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCountdown = cycles.find(
    (cycle) => cycle.id === isCountdownActive
  );

  const totalSeconds = activeCountdown ? activeCountdown.minutesAmount * 60 : 0;

  function markCycleAsFinished() {
    const updatedCycles = cycles.map((cycle) => {
      if (cycle.id === activeCountdown?.id) {
        return {
          ...cycle,
          finishedDate: new Date(),
        };
      }

      return cycle;
    });

    setCycles(updatedCycles);
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((oldCycles) => [...oldCycles, newCycle]);
    setIsCountdownActive(newCycle.id);

    setAmountSecondsPassed(0);
  }

  function handleInteruptCycle() {
    setAmountSecondsPassed(0);

    const updatedCycles = cycles.map((cycle) => {
      if (cycle.id === activeCountdown?.id) {
        return {
          ...cycle,
          interruptedDate: new Date(),
        };
      }

      return cycle;
    });

    setCycles(updatedCycles);
    setIsCountdownActive(null);
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCountdown,
        cycles,
        markCycleAsFinished,
        isCountdownActive,
        setIsCountdownActive,
        amountSecondsPassed,
        setAmountSecondsPassed,
        totalSeconds,
        handleCreateNewCycle,
        handleInteruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export const useCycles = () => useContext(CyclesContext);
