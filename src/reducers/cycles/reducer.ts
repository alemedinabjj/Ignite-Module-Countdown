import { ActionTypes } from './actions'

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  isCountdownActive: string | null;
}

export function cyclesReducer(state: CyclesState, action: any){
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload],
        isCountdownActive: action.payload.id,
      };
    case ActionTypes.INTERUPT_CURRENT_CYCLE:
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
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
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

      case ActionTypes.DELETE_CYCLE:
        return {
          ...state,
          cycles: state.cycles.filter((cycle) => cycle.id !== action.payload),
        };

    default:
      return state;
  }
}