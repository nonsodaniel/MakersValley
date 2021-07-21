import React, { useState } from "react";
import Modal from "react-modal";
import "./modal.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const AddModal = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = useState("");

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(title);
  return (
    <div className="modal">
      <button className="btn" onClick={openModal}>
        Add Todo
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="header">
          <button className="text-center" onClick={closeModal}>
            close
          </button>
        </div>
        <h2 className="text-center">Creat a Todo</h2>
        <div className="body">
          <form action="">
            <form>
              <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="Todo Title"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">
                  Todo Description
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                ></textarea>
              </div>
              <div class="form-group group-1">
                <div className="priority">
                  <label for="exampleFormControlSelect1">Priority</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>Less important</option>
                    <option>Ver Important</option>
                    <option>Not important</option>
                  </select>
                </div>
                <div className="category">
                  <label for="exampleFormControlSelect1">Category</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                    <option>Work</option>
                    <option>Learning</option>
                    <option>Health</option>
                    <option>Religion</option>
                    <option>Entertainment</option>
                    <option>Relaxation</option>
                  </select>
                </div>
              </div>

              <div className="btn-wrap">
                <button className="btn">Submit Todo</button>
              </div>
            </form>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddModal;
