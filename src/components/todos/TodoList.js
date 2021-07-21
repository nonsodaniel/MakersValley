import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/todoActions";

const TodoList = ({ todos }) => {
  const { id, title, description, category, priority, status } = todos;
  const dispatch = useDispatch();

  const deleteTodo = ({ target: { id } }) => {
    dispatch(actions.handleDeleteTodo(id));
  };

  const str = `  Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
  ipsum dolores quod, iste corporis rem, voluptatem impedit eius`;
  // const desc =
  //   str.length > 130
  //     ? str +
  //       (
  //         <b>
  //           <Link to="#" title={str}>
  //             See more
  //           </Link>
  //         </b>
  //       )
  //     : str;

  return (
    <div className="todo" key={id}>
      <div className="card todo-card">
        <div className="todo-details">
          <div className="priority-date">
            <span className="priority">
              Priority: <b className="text">{priority}</b>{" "}
            </span>
            <span className="date">{new Date().toDateString()}</span>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          {/* <p title={str}>{desc}</p> */}
          <div className="category-status">
            <span className="category">{category}</span>
            <span className="status">{status}</span>
          </div>
        </div>
        <div className="actions">
          <span>
            <i className="fas fa-edit edit"></i>
          </span>
          <span onClick={deleteTodo} id={id}>
            <i className="fas fa-trash-alt delete" id={id}></i>
          </span>
        </div>
      </div>
    </div>
  );
};;

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
