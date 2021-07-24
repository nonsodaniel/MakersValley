import { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux";
import * as actions from "../../store/actions/todoActions";
import PropTypes from "prop-types";
import TodoList from "./TodoList";
import "./todos.scss";
import TodoFormModal from "../utils/modal/TodoFormModal";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";



const Todos = (props) => {
  let { getTodos, clearEditTodo, dragDrop} = props;
  const [isOpen, setIsOpen] = useState(false)
  let select = useSelector((state) => state);

  
  const editData = select.todos && select.todos.editData
  const isDataLoaded = props.pageData && props.pageData.length > 0;




  const openModal = (action) => {
    if (action === "add") {
      clearEditTodo();
    }
    setIsOpen(true);
  };
  
  const closeModal = () =>{
    setIsOpen(false)
  }

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {

    const result = swap(props.pageData, sourceIndex, targetIndex);
    return dragDrop(result);

  }
 
  

  useEffect(() => {
    getTodos();
  }, [getTodos]);


  return (
    <div className="todos-wrap" data-testid="todos-wrap">
      <div className="btn-wrap text-center">
        <button className="btn btn-add" onClick={() => openModal("add")}>
          Add Todo
        </button>
      </div>
      <TodoFormModal todo={editData} isOpen={isOpen} onClose={closeModal} />
      {isDataLoaded && (
        <h5 className="todo-header">{props && props.currentCategory} Todos</h5>
      )}
      
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          className={` ${isDataLoaded ? "todos" : "no-todos"}`}
          id="left"
          boxesPerRow={4}
          rowHeight={70}
        >
            {
              isDataLoaded ? (
                props.pageData.map((todo) => {
                  return (
                    <GridItem key={todo.id} className="todo">
                    <TodoList
                      key={Math.floor(Math.random() * Date.now())}
                      todos={todo}
                      openModal={openModal}
                    />
                    </GridItem>
                  );
                })
              ) : (
                <p className="text-center">No Data Available!</p>
              )
           }
      </GridDropZone>
    </GridContextProvider>
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
