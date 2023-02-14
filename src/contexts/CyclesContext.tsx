import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import {
  ActionTypes,
  addNewCycleAction,
  interuptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextData {
  activeCountdown: Cycle | undefined;
  cycles: Cycle[];
  markCycleAsFinished: () => void;
  isCountdownActive: string | null;
  // setIsCountdownActive: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      isCountdownActive: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@monkey-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
    }
  );
  const { cycles, isCountdownActive } = cyclesState;
  const activeCountdown = cycles.find(
    (cycle) => cycle.id === isCountdownActive
  );
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCountdown) {
      return differenceInSeconds(
        new Date(),
        new Date(activeCountdown.startDate)
      );
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@monkey-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

  const totalSeconds = activeCountdown ? activeCountdown.minutesAmount * 60 : 0;

  function markCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  function handleInteruptCycle() {
    setAmountSecondsPassed(0);
    dispatch(interuptCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCountdown,
        cycles,
        markCycleAsFinished,
        isCountdownActive,
        // setIsCountdownActive,
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
