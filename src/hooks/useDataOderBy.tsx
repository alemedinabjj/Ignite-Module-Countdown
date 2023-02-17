import { useReducer, useMemo } from "react";

type OrderByState<T> = {
  data: T[];
  sortColumn: keyof T | null;
  sortDirection: number;
};

type OrderByAction<T> =
  | { type: "SORT_BY_COLUMN"; payload: keyof T }
  | { type: "TOGGLE_SORT_DIRECTION" };

function reducer<T>(state: OrderByState<T>, action: any): OrderByState<T> {
  switch (action.type) {
    case "SORT_BY_COLUMN":
      const newSortColumn = action.payload;

      const newSortDirection =
        state.sortColumn === newSortColumn ? -1 * state.sortDirection : 1;

      return {
        ...state,
        sortColumn: newSortColumn,
        sortDirection: newSortDirection,
      };

    case "TOGGLE_SORT_DIRECTION":
      return {
        ...state,
        sortDirection: -1 * state.sortDirection,
      };

    default:
      return state;
  }
}

function useDataOrderBy<T>(initialData: T[]) {
  const [state, dispatch] = useReducer(reducer, {
    data: initialData,
    sortColumn: null,
    sortDirection: 1,
  });

  const sortedData = useMemo(() => {
    const { data, sortColumn, sortDirection } = state;

    if (sortColumn === null) {
      return data;
    }

    return data.sort((a: any, b: any) => {
      const direction = sortDirection === 1 ? 1 : -1;

      if (a[sortColumn] < b[sortColumn]) {
        return -1 * direction;
      }

      if (a[sortColumn] > b[sortColumn]) {
        return 1 * direction;
      }

      return 0;
    });
  }, [state.data, state.sortColumn, state.sortDirection]);

  function handleSort(column: keyof T) {
    if (column === state.sortColumn) {
      dispatch({ type: "TOGGLE_SORT_DIRECTION" });
    } else {
      dispatch({ type: "SORT_BY_COLUMN", payload: column });
    }
  }

  return {
    data: sortedData,
    handleSort,
    sortColumn: state.sortColumn,
    sortDirection: state.sortDirection,
  };
}

export default useDataOrderBy;
