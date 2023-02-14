import { differenceInSeconds } from "date-fns";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ActionTypes } from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface NewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextData {
  activeCountdown: Cycle | undefined;
  cycles: Cycle[];
  markCycleAsFinished: () => void;
  isCountdownActive: string | null;
  amountSecondsPassed: number;
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
  totalSeconds: number;
  handleCreateNewCycle: (data: NewCycleFormData) => void;
  handleInteruptCycle: () => void;
  handleDeleteCycle: (id: string) => void;
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
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: activeCountdown?.id,
    });
  }

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch({ type: ActionTypes.ADD_NEW_CYCLE, payload: newCycle });

    setAmountSecondsPassed(0);
  }

  function handleInteruptCycle() {
    setAmountSecondsPassed(0);
    dispatch({ type: ActionTypes.INTERUPT_CURRENT_CYCLE, isCountdownActive });
  }

  function handleDeleteCycle(id: string) {
    dispatch({ type: ActionTypes.DELETE_CYCLE, payload: id });
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
        handleDeleteCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};

export const useCycles = () => useContext(CyclesContext);
