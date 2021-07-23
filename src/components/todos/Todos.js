import { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux";
import * as actions from "../../store/actions/todoActions";
import PropTypes from "prop-types";
import TodoList from "./TodoList";
import "./todos.scss";
import loadingImg from "../assets/loading.gif";
import networkImg from "../assets/no-connection.png";
import TodoFormModal from "../utils/modal/TodoFormModal";

const Todos = (props) => {
  let { getTodos } = props;
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () =>{
    setIsOpen(true)
  }
  const closeModal = () =>{
    setIsOpen(false)
  }

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const isDataLoaded = props.pageData && props.pageData.length > 0;
  let { errorMessage } = props;
  let select = useSelector((state) => state);
  const editData = select.todos && select.todos.editData
  return (
    <div className="todos-wrap" data-testid="todos-wrap">
      <div className="btn-wrap text-center">
        <button className="btn btn-add" onClick={openModal}>
          Add Todo
        </button>
      </div>
      <TodoFormModal todo={editData} isOpen={isOpen} onClose={closeModal} />
      {isDataLoaded && (
        <h5 className="todo-header">{props && props.currentCategory} Todos</h5>
      )}

      <div className={isDataLoaded ? "todos" : "no-todos"}>
        {!props.loading ? (
          isDataLoaded ? (
            props.pageData.map((todo) => {
              return (
                <TodoList
                  key={Math.floor(Math.random() * Date.now())}
                  todos={todo}
                  openModal={openModal}
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
