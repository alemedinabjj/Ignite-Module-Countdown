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
    handleCreateNewCycle,
    handleInteruptCycle,
  } = useCycles();

  const newCycleForm = useForm<NewCycleFormData>({});

  const { handleSubmit, watch, reset } = newCycleForm;

  function createNewCycle(data: NewCycleFormData) {
    handleCreateNewCycle(data);
    reset();
  }

  function interruptCycle() {
    handleInteruptCycle();
    reset();
  }

  console.log(activeCountdown);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {isCountdownActive ? (
          <S.StopCountdownButton type="button" onClick={interruptCycle}>
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
