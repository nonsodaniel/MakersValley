import React, { useEffect, useState } from "react";
import * as actions from "../../../store/actions/todoActions";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { categorList, priorityList } from "./db";
import "./modal.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: `rgba(0, 0, 0, 0.25) 0px 12px 15px 0px`,
    background: "white",
    border: "none",
  },
};

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const TodoFormModal = ({ todo = {}, isOpen, onClose }) => {
  console.log("todo", todo);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDesc] = useState(todo.description || "");
  const [priority, setPriority] = useState(todo.priority || "");
  const [category, setCategory] = useState(todo.category || "");
  let todoId = todo.id;

  const getFormData = () => {
    return {
      title,
      description,
      priority,
      category,
    };
  };

  const addOrUpdateTodo = (e) => {
    e.preventDefault();
    let formdata = getFormData();
    if (todoId) {
      dispatch(actions.updateTodo({ ...todo, ...formdata }));
      return;
    }
    dispatch(actions.addTodo(formdata));
  };
  // useEffect(() => {
  //   setTodo(editData);
  // }, [editData]);
  return (
    <div className="todo-modal">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="header">
          <span onClick={onClose} className="text-right pointer">
            <i className="far fa-times-circle"></i>
          </span>
          <h2 className="text-center">
            {todoId ? "Update Todo" : "Create New Todo"}
          </h2>
        </div>
        <div className="body">
          <form onSubmit={addOrUpdateTodo}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Todo Title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Type your Todo Description here..."
                value={description}
                onChange={({ target }) => setDesc(target.value)}
              ></textarea>
            </div>
            <div className="form-group group-1">
              <div className="priority">
                <select
                  className="form-control"
                  id="priority"
                  onChange={({ target }) => setPriority(target.value)}
                >
                  <option defaultValue="All">Select Priority</option>
                  {priorityList.map((prty) => {
                    let { id, value } = prty;
                    return (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="category">
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={({ target }) => setCategory(target.value)}
                >
                  <option defaultValue="All">Category</option>
                  {categorList.map((catgry) => {
                    let { id, value } = catgry;
                    return (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="btn-wrap">
              <button
                type="submit"
                className={`btn ${todoId ? "btn-update" : "btn-add"}`}
              >
                {todoId ? "Update Todo" : "Add Todo"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default TodoFormModal;
