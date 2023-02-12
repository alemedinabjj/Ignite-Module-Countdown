import { differenceInSeconds } from "date-fns";
import React, { useEffect } from "react";
import { useCycles } from "../../../contexts/CyclesContext";
import * as S from "./styles";

export const Countdown = () => {
  const {
    activeCountdown,
    cycles,
    markCycleAsFinished,
    totalSeconds,
    setAmountSecondsPassed,
    amountSecondsPassed,
  } = useCycles();

  React.useEffect(() => {
    if (activeCountdown) {
      const interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCountdown.startDate
        );

        if (secondsDifference >= totalSeconds) {
          markCycleAsFinished();
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeCountdown, totalSeconds]);

  const currentSeconds = activeCountdown
    ? totalSeconds - amountSecondsPassed
    : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCountdown) {
      document.title = `${minutes}:${seconds} - Pomodoro`;
    }
  }, [minutes, seconds, activeCountdown]);

  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separador>:</S.Separador>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  );
};
