import { Cycle } from "./reducer";

export enum ActionTypes {
  ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
  INTERUPT_CURRENT_CYCLE = "INTERUPT_CURRENT_CYCLE",
  MARK_CURRENT_CYCLE_AS_FINISHED = "MARK_CURRENT_CYCLE_AS_FINISHED",
  DELETE_CYCLE = "DELETE_CYCLE",
}

export function addNewCycleAction(newCycle: Cycle) {
  return { type: ActionTypes.ADD_NEW_CYCLE, payload: newCycle }
}

export function interuptCurrentCycleAction() {
  return { type: ActionTypes.INTERUPT_CURRENT_CYCLE }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
    payload: new Date(),
  }
}

export function deleteCycleAction(cycleId: string) {
  return { type: ActionTypes.DELETE_CYCLE, payload: cycleId }
}
