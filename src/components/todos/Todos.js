import { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux";
import Draggable from "react-draggable";
import * as actions from "../../store/actions/todoActions";
import PropTypes from "prop-types";
import TodoList from "./TodoList";
import "./todos.scss";
import loadingImg from "../assets/loading.gif";
import TodoFormModal from "../utils/modal/TodoFormModal";



const Todos = (props) => {
  let { getTodos, clearEditTodo } = props;
  const [isOpen, setIsOpen] = useState(false)
  const [deltaPosition, setDeltaPosition] = useState({deltaPosition: {
    x: 0,
    y: 0
  }})

    
  const openModal = (action) => {
    if (action === "add") {
      clearEditTodo();
    }
    setIsOpen(true);
  };
  
  const closeModal = () =>{
    setIsOpen(false)
  }


  useEffect(() => {
    getTodos();
  }, [getTodos]);


  function handleDrag(e, ui) {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  }


 function handleStart() {
  }

  function handleStop() {
  }


  const isDataLoaded = props.pageData && props.pageData.length > 0;
  let select = useSelector((state) => state);
  const editData = select.todos && select.todos.editData
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

      <div className={isDataLoaded ? "todos" : "no-todos"}>
       
            {!props.loading ? (
              isDataLoaded ? (
                props.pageData.map((todo) => {
                  return (
                    <Draggable
                    axis="x"
                    handle=".handle"
                    defaultPosition={{ x: 0, y: 0 }}
                    position={null}
                    grid={[25, 25]}
                    scale={1}
                    onStart={handleStart}
                    onDrag={handleDrag}
                    onStop={handleStop}
                  >
                    <TodoList
                      key={Math.floor(Math.random() * Date.now())}
                      todos={todo}
                      openModal={openModal}
                    />
                    </Draggable>
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
