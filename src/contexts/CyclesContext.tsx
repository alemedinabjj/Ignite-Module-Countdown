import { createContext, useContext, useReducer, useState } from "react";

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

interface CyclesState {
  cycles: Cycle[];
  isCountdownActive: string | null;
}

export const CycleProvider = ({ children }: CyclesProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            cycles: [...state.cycles, action.payload],
            isCountdownActive: action.payload.id,
          };
        case "INTERUPT_CURRENT_CYCLE":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === action.isCountdownActive) {
                return {
                  ...cycle,
                  interruptedDate: new Date(),
                };
              }

              return cycle;
            }),
            isCountdownActive: null,
          };
        case "MARK_CURRENT_CYCLE_AS_FINISHED":
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === action.payload) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                };
              }

              return cycle;
            }),
            isCountdownActive: null,
          };
        default:
          return state;
      }
    },
    {
      cycles: [],
      isCountdownActive: null,
    }
  );

  const { cycles, isCountdownActive } = cyclesState;

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCountdown = cycles.find(
    (cycle) => cycle.id === isCountdownActive
  );

  const totalSeconds = activeCountdown ? activeCountdown.minutesAmount * 60 : 0;

  function markCycleAsFinished() {
    dispatch({
      type: "MARK_CURRENT_CYCLE_AS_FINISHED",
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

    dispatch({ type: "ADD_NEW_CYCLE", payload: newCycle });

    setAmountSecondsPassed(0);
  }

  function handleInteruptCycle() {
    setAmountSecondsPassed(0);
    dispatch({ type: "INTERUPT_CURRENT_CYCLE", isCountdownActive });
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
