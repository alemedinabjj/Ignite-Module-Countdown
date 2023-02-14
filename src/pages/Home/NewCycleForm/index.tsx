import * as S from "./styles";
import { useForm, useFormContext } from "react-hook-form";
import { useCycles } from "../../../contexts/CyclesContext";

export const NewCycleForm = () => {
  const { isCountdownActive } = useCycles();

  const { register } = useFormContext();

  return (
    <S.FormContainer>
      {" "}
      <label htmlFor="task">Vou trabalhar em</label>
      <S.TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para oseu projeto"
        disabled={!!isCountdownActive}
        {...register("task")}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <S.MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={1}
        min={1}
        max={60}
        disabled={!!isCountdownActive}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </S.FormContainer>
  );
};
