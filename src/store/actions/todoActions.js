import { uuid } from "../../components/utils/helpers";
import { saveToLocalStorage } from "../localstorage";
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
  EDIT_TODO,
  CLEAR_EDIT_TODO,
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

export const addTodo = (todo) => {
  return (dispatch, getState) => {
    const state = getState();
    todo.id = uuid();
    todo.status = "Pending";
    todo.created = new Date().toISOString();
    const todos = [todo, ...state.todos.allTodos];
    saveToLocalStorage("todos", todos);
    dispatch({
      type: SET_TODO_DATA,
      payload: { todos },
    });
  };
};

export const updateTodo = (todo) => {
  return (dispatch, getState) => {
    const state = getState();
    const todos = [...state.todos.allTodos];
    let todoToUpdate = todos.find(({ id }) => id === todo.id);
    Object.assign(todoToUpdate, todo);
    saveToLocalStorage("todos", todos);
    dispatch({
      type: SET_TODO_DATA,
      payload: { todos },
    });
  };
};

export const handleEditTodo = (editId) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_TODO,
      payload: { editId },
    });
  };
};
export const clearEditTodo =() =>{
  return (dispatch) => {
    dispatch({
      type: CLEAR_EDIT_TODO,
    });
  };
}


export const handleDeleteTodo = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const todos = [...state.todos.allTodos];
    let todosLeft = todos.filter((todo) => id !== todo.id);
    saveToLocalStorage("todos", todosLeft);
    dispatch({
      type: SET_TODO_DATA,
      payload: { todos: todosLeft   },
    });
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
