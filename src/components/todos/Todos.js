import { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/todoActions";
import PropTypes from "prop-types";
import TodoList from "./TodoList";
import "./todos.scss";
import loadingImg from "../assets/loading.gif";
import networkImg from "../assets/no-connection.png";
import AddTodo from "./AddTodo";

const Todos = (props) => {
  let { getTodos } = props;
  useEffect(() => {
    getTodos();
  }, [getTodos]);
  const isDataLoaded = props.pageData && props.pageData.length > 0;
  let { errorMessage } = props;
  return (
    <div className="todos-wrap" data-testid="todos-wrap">
      <AddTodo />
      {isDataLoaded && (
        <h5 className="todo-header">{props && props.currentCategory} Todos</h5>
      )}

      <div className={isDataLoaded ? "todos" : "no-todos"}>
        {errorMessage === "Network Error" ? (
          <div className="text-center network-error">
            <img src={networkImg} alt="Loading animation" height="150" />
            <p>Unable to connect to the Internet</p>
            <button
              className="btn-network__error pointer"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        ) : !props.loading ? (
          isDataLoaded ? (
            props.pageData.map((todo) => {
              return (
                <TodoList
                  key={Math.floor(Math.random() * Date.now())}
                  todos={todo}
                />
              );
            })
          ) : (
            <p className="text-center">No Data Available!</p>
          )
        ) : (
          <div className="text-center">
            <img
              src={loadingImg}
              className="load_icon"
              alt="Loading animation"
            />
          </div>
        )}
      </div>
    </div>
  );
};

Todos.propTypes = {
  getTodos: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { pageData, loading, currentCategory, errorMessage } = state.todos;
  return {
    pageData,
    loading,
    currentCategory,
    errorMessage,
  };
};

export default connect(mapStateToProps, actions)(Todos);
