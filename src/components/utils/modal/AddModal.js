import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { uuid } from "./constants";
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

if (typeof(window) !== 'undefined') {
    Modal.setAppElement('body')
}
const AddModal = () => {
   
  const [todos, setTodos] = useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [prty, setPrty] = useState("");
  const [category, setCategory] = useState("");

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
  // const handleSave = () =>{
    
  // }
  const addTodo = (e) => {
    e.preventDefault()
      let obj = {
          id: uuid(),
          title, description, 
          priority: prty,
          category,
          status: "pending"
      }
      if(todos && todos.length){
        let newData = [...todos, obj]
        setTodos(newData)
        localStorage.setItem("todos",  JSON.stringify(newData))
        getTodo()
      }else{
        localStorage.setItem("todos", JSON.stringify([obj]))
        getTodo()
      }
  };
  const getTodo = () =>{
    let data = JSON.parse(localStorage.getItem("todos"))
    setTodos(data)
  }
  useEffect(() => {
        getTodo()
  }, [])

  
  return (
    <div className="todo-modal">
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
        <span onClick={closeModal} className="text-right pointer"><i class="far fa-times-circle"></i></span>
        <h2 className="text-center">Creat a Todo</h2>
        </div>
        <div className="body">
            <form>
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
                    onChange={({ target }) => setPrty(target.value)}
                  >
                    <option>Priority</option>
                    <option value="less">Very Important</option>
                    <option value="very">Very Important</option>
                    <option value="not">Not important</option>
                  </select>
                </div>
                <div className="category">
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={({ target }) => setCategory(target.value)}
                  >
                    <option>Category</option>
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
                <button type="submit" className="btn" onClick={addTodo}>Submit Todo</button>
              </div>
            </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddModal;
