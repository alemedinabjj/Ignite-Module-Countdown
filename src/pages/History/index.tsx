import { useCycles } from "../../contexts/CyclesContext";
import * as S from "./styles";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Trash } from "phosphor-react";
import useDataOrderBy from "../../hooks/useDataOderBy";
import { Cycle } from "../../reducers/cycles/reducer";
import { ArrowUp, ArrowDown } from "phosphor-react";

export const History = () => {
  const { cycles, handleDeleteCycle } = useCycles();

  const {
    data: sortedData,
    handleSort,
    sortColumn,
    sortDirection,
  } = useDataOrderBy(cycles);

  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("task")}>
                <div>
                  {" "}
                  Tarefa
                  {sortColumn === "id" && sortDirection === 1 ? (
                    <ArrowUp size={20} />
                  ) : (
                    <ArrowDown size={20} />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort("minutesAmount")}>
                <div>
                  {" "}
                  Duração
                  {sortColumn === "minutesAmount" && sortDirection === 1 ? (
                    <ArrowUp size={20} />
                  ) : (
                    <ArrowDown size={20} />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort("startDate")}>
                <div>
                  {" "}
                  Início
                  {sortColumn === "startDate" && sortDirection === 1 ? (
                    <ArrowUp size={20} />
                  ) : (
                    <ArrowDown size={20} />
                  )}
                </div>
              </th>
              <th>Status</th>
              <th>Deletar</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((cycle: any) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate ? (
                    <S.Status statusColor="green">Concluído</S.Status>
                  ) : cycle.interruptedDate ? (
                    <S.Status statusColor="red">Interrompido</S.Status>
                  ) : (
                    <S.Status statusColor="yellow">Em andamento</S.Status>
                  )}
                </td>
                <td>
                  <Trash
                    weight="fill"
                    cursor={"pointer"}
                    color={"red"}
                    size={27}
                    onClick={() => handleDeleteCycle(cycle.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  );
};
