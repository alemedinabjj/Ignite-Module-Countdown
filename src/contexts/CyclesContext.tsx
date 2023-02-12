import { createContext, useContext, useState } from "react";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
}

export const CyclesContext = createContext({} as CyclesContextData);

export const CycleProvider = ({ children }: any) => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [isCountdownActive, setIsCountdownActive] = useState<string | null>(
    null
  );

  console.log(cycles);

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

  return (
    <CyclesContext.Provider
      value={{
        activeCountdown,
        cycles,
        setCycles,
        markCycleAsFinished,
        isCountdownActive,
        setIsCountdownActive,
        amountSecondsPassed,
        setAmountSecondsPassed,
        totalSeconds,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export const useCycles = () => useContext(CyclesContext);
