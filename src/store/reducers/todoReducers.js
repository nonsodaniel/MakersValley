import {
  START_FETCH_TODO,
  SET_TODO_DATA,
  TODO_FETCH_FAILED,
  SEARCH_TODO,
  SORT_CATEGORY,
  SORT_DATE,
  PREV_PAGE,
  NEXT_PAGE,
  SORT_PRIORITY,
  EDIT_TODO,
  DELETE_TODO,
} from "../actions/types";

const INTIAL_STATE = {
  allTodos: [],
  data: [],
  error: false,
  loading: false,
  errorMessage: "",
  searchValue: "",
  search: true,
  totalPages: 1,
  currentPage: 1,
  pageLength: 6,
  pageData: [],
  currentCategory: "All",
  currentPriority: "All",
};

export  const reducer = (state = INTIAL_STATE, actions) => {
  switch (actions.type) {
    case START_FETCH_TODO:
      return { ...state, loading: true };
    case SET_TODO_DATA:
      let data = actions.payload.todos;
      return {
        ...state,
        error: false,
        loading: false,
        errorMessage: "",
        allTodos: data,
        data: data,
        totalPages: Math.ceil(data.length / state.pageLength),
        pageData: paginate(data, state.currentPage, state.pageLength),
      };
    case DELETE_TODO:
      const { id } = actions.payload;
      console.log(id, state.allTodos);
      let newData = state.allTodos.filter((data_) => data_.id !== id);
      console.log(newData);
      localStorage.setItem("todos", JSON.stringify(newData));
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        totalPages: Math.ceil(newData.length / state.pageLength),
        data: newData,
        pageData: paginate(newData, 1, state.pageLength),
      };
    case EDIT_TODO:
      const { editId } = actions.payload;
      let editData = state.allTodos.find((data) => data.id === editId);
      return {
        ...state,
        editData,
      };
    case TODO_FETCH_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: actions.payload.errorMsg,
        loading: false,
      };
    case SEARCH_TODO:
      const { searchValue } = actions.payload;
      let searchData =
        searchValue === ""
          ? state.allTodos
          : state.allTodos.filter(({ title }) => title.includes(searchValue));
      return {
        ...state,
        search: true,
        currentPage: 1,
        searchValue: searchValue,
        totalPages: Math.ceil(searchData.length / state.pageLength),
        data: searchData,
        pageData: paginate(searchData, 1, state.pageLength),
      };
    case SORT_CATEGORY:
      const { activeCategory } = actions.payload;
      let sortCatData =
        activeCategory === "All"
          ? state.allTodos
          : state.allTodos.filter(({ category }) =>
              category.includes(activeCategory)
            );
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortCatData,
        totalPages: Math.ceil(sortCatData.length / state.pageLength),
        activeCategory: activeCategory,
        currentCategory: activeCategory,
        pageData: paginate(sortCatData, 1, state.pageLength),
      };
    case SORT_PRIORITY:
      const { activePriority } = actions.payload;
      let sortPrtyData =
        activePriority === "All"
          ? state.allTodos
          : state.allTodos.filter(({ priority }) =>
              priority.includes(activePriority)
            );
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortPrtyData,
        totalPages: Math.ceil(sortPrtyData.length / state.pageLength),
        activePriority: activePriority,
        currentPriority: activePriority,
        pageData: paginate(sortPrtyData, 1, state.pageLength),
      };
    case SORT_DATE:
      const { activeDate } = actions.payload;
      let sortDateData =
        activeDate === "default"
          ? state.allTodos
          : activeDate === "asc"
          ? [...state.allTodos].sort((a, b) =>
              a.created.localeCompare(b.created)
            )
          : activeDate === "desc"
          ? [...state.allTodos].sort((a, b) =>
              b.created.localeCompare(a.created)
            )
          : null;
      return {
        ...state,
        search: false,
        currentPage: 1,
        searchValue: "",
        data: sortDateData,
        activeOrder: activeDate,
        pageData: paginate(sortDateData, 1, state.pageLength),
      };

    case PREV_PAGE:
      let prevPage = state.currentPage - 1;
      return {
        ...state,
        currentPage: prevPage,
        pageData: paginate(state.data, prevPage, state.pageLength),
      };

    case NEXT_PAGE:
      let nextPage = state.currentPage + 1;
      return {
        ...state,
        currentPage: nextPage,
        pageData: paginate(state.data, nextPage, state.pageLength),
      };
    default:
      return { ...state };
  }
};

const paginate = (arr, currentPage, pagelength) => {
  return arr.slice((currentPage - 1) * pagelength, pagelength * currentPage);
};

export default reducer;