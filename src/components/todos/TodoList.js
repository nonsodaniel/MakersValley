import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions/todoActions";

const TodoList = ({ todos, openModal}) => {
  const { id, title, description, category, priority, status , created} = todos;
  const dispatch = useDispatch();

  const deleteTodo = ({ target: { id } }) => {
    let isDelete = window.confirm("Delete this record?");
    if(isDelete){
      dispatch(actions.handleDeleteTodo(id));
    }
  };

  const editTodo = async ({ target: { id } }) =>{
    dispatch(actions.handleEditTodo(id));
    openModal()

  }

  return (
    <>
      <div className="todo" key={id}>
        <div className="card todo-card">
          <div className="todo-details">
            <span className="priority">
              Priority: <b className="text">{priority}</b>{" "}
            </span>
            <br />
            <span className="date">
              <i className="far fa-clock"> </i>
              {` ` + new Date(created).toDateString()},{" "}
              {new Date(created).toLocaleTimeString()}
            </span>
            <h3>{title}</h3>

            <p>{description}</p>

            <div className="category-status">
              <span className="category">{category}</span>
              <span className={status}>{status}</span>
            </div>
          </div>
          <div className="actions">
            <span>
              <i className="fas fa-edit edit" onClick={editTodo} id={id}></i>
            </span>
            <span>
              <i
                className="fas fa-trash-alt delete"
                onClick={deleteTodo}
                id={id}
              ></i>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }),
};

export default TodoList;
