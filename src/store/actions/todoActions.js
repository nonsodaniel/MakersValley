import {
  START_FETCH_TODO,
  SET_TODO_DATA,
  TODO_FETCH_FAILED,
  SEARCH_TODO,
  SORT_CATEGORY,
  SORT_DATE,
  SORT_ALPHABET,
  NEXT_PAGE,
  PREV_PAGE,
  SORT_PRIORITY,
  DELETE_TODO,
} from "./types";

export const getTodos = () => {
  return (dispatch) => {
    try {
      dispatch({ type: START_FETCH_TODO });
      const response = JSON.parse(localStorage.getItem("todos"));
      let payload = {};
      if (response.length) {
        payload.todos = response;
        dispatch({ type: SET_TODO_DATA, payload });
      } else {
        payload.errorMsg = "failed to fetch data";
        dispatch({ type: SET_TODO_DATA, payload });
      }
    } catch (error) {
      dispatch({
        type: TODO_FETCH_FAILED,
        payload: { errorMsg: error.message },
      });
    }
  };
};

export const handleDeleteTodo = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_TODO,
      payload: { id },
    });
    getTodos();
  };
}; 

export const handleSearchTodo = (searchValue) => {
  return (dispatch) => {
    dispatch({
      type: SEARCH_TODO,
      payload: { searchValue },
    });
  };
};
export const handleSortCategory = (activeCategory) => {
  return (dispatch) => {
    dispatch({
      type: SORT_CATEGORY,
      payload: { activeCategory },
    });
  };
};
export const handleSortPriority = (activePriority) => {
  return (dispatch) => {
    dispatch({
      type: SORT_PRIORITY,
      payload: { activePriority },
    });
  };
};

  export const handleSortAlphabet = (activeOrder) => {
    return (dispatch) => {
      dispatch({
        type: SORT_ALPHABET,
        payload: { activeOrder },
      });
    };
  };
  export const handleSortDate = (activeDate) => {
    return (dispatch) => {
      dispatch({
        type: SORT_DATE,
        payload: { activeDate },
      });
    };
  };
  export const handlePrevBtn = () => {
    return (dispatch) => {
      dispatch({
        type: PREV_PAGE,
      });
    };
  };
  export const handleNextBtn = () => {
    return (dispatch) => {
      dispatch({
        type: NEXT_PAGE,
      });
    };
  };
  