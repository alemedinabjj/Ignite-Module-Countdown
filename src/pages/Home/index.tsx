import { Play, HandPalm } from "phosphor-react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import * as S from "./styles";
import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./NewCycleForm";
import { Countdown } from "./Countdown";
import { useCycles } from "../../contexts/CyclesContext";

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

export const Home = () => {
  const {
    activeCountdown,
    isCountdownActive,
    setIsCountdownActive,
    amountSecondsPassed,
    setAmountSecondsPassed,
    setCycles,
    cycles,
  } = useCycles();

  const newCycleForm = useForm<NewCycleFormData>({});

  const { handleSubmit, watch, reset } = newCycleForm;

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
    reset();
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
    reset();
  }

  console.log(activeCountdown);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {isCountdownActive ? (
          <S.StopCountdownButton type="button" onClick={handleInteruptCycle}>
            <HandPalm size={24} />
            Interromper
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </S.StartCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  );
};
