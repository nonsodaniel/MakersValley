import React from "react";
import AddModal from "../utils/modal/AddModal";

const AddTodo = () => {
  return (
    <div className="add-todo">
      <div className="btn-wrap">
        <AddModal />
      </div>
    </div>
  );
};

export default AddTodo;
