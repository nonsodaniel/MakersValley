import React, { useEffect, useState } from "react";
import * as actions from "../../../store/actions/todoActions";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { categorList, priorityList, statusList } from "./db";
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

const TodoFormModal = ({ todo, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  let todoId = todo?.id;

  const getFormData = () => {
    return {
      title,
      description,
      priority,
      category,
      status,
    };
  };

  const addOrUpdateTodo = (e) => {
    e.preventDefault();
    let formdata = getFormData();
    if (todoId) {
      dispatch(actions.updateTodo({ ...todo, ...formdata }));
      resetForm();
      handleClose();
      return;
    }
    dispatch(actions.addTodo(formdata));
    resetForm();
    handleClose();
  };

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setPriority("");
    setCategory("");
    setStatus("");
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const setEditData = (todo) => {
      if (todo) {
        setTitle(todo.title || "");
        setDesc(todo.description || "");
        setPriority(todo.priority || "");
        setCategory(todo.category || "");
        setStatus(todo.status || "");
      } else {
        resetForm();
      }
    };
    setEditData(todo);
  }, [todo, dispatch]);

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
            <i className="far fa-times-circle close-modal"></i>
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
                maxLength="35"
                onChange={({ target }) => setTitle(target.value)}
                required={true}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Type your Todo Description here... Max character (150)"
                value={description}
                onChange={({ target }) => setDesc(target.value)}
                maxLength="150"
                required={true}
              ></textarea>
            </div>
            <div className="form-group group-1">
              <div className="priority">
                <select
                  className="form-control"
                  id="priority"
                  value={priority}
                  onChange={({ target }) => setPriority(target.value)}
                  required={true}
                >
                  <option value="">Select Priority</option>
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
                  id="category"
                  value={category}
                  onChange={({ target }) => setCategory(target.value)}
                  required={true}
                >
                  <option value="">Category</option>
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

            {todoId && (
              <select
                className="form-control status-select"
                id="status"
                value={status}
                onChange={({ target }) => setStatus(target.value)}
                required
              >
                <option value="">Update Status</option>
                {statusList.map((status) => {
                  let { id, value } = status;
                  return (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            )}

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