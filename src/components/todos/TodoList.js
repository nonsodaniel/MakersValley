import PropTypes from "prop-types";
const TodoList = ({ todos }) => {
  const { name, description, created } = todos;
  return (
    <div className="todo" key={created}>
      <div className="card todo-card">
        <div className="todo-details">
          <div className="priority-date">
            <span className="priority">
              Priority: <b className="text">Important</b>{" "}
            </span>
            <span className="date">{new Date().toDateString()}</span>
          </div>
          <h3>{name}</h3>
          <p>{description}</p>
          <div className="category-status">
            <span className="category">Education</span>
            <span className="status">Pending</span>
          </div>
        </div>
        <div className="actions">
          <span>
            <i className="fas fa-edit edit"></i>
          </span>
          <span>
            <i className="fas fa-trash-alt delete"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  }),
};

export default TodoList;
