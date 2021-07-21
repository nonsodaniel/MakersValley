import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/todoActions";
import "./pagination.scss";

const Pagination = (props) => {
  const dispatch = useDispatch();
  const select = useSelector((state) => state);
  const { currentPage, totalPages, allTodos } = select.todos;
  const prevBtn = () => {
    dispatch(actions.handlePrevBtn());
  };
  const nextBtn = () => {
    dispatch(actions.handleNextBtn());
  };

  return (
    <div className="pagination" data-testid="pagination">
      {allTodos.length > 0 && (
        <div className="pagination-wrap">
          <button
            className="pagination-text pointer"
            data-testid="btn-prev"
            disabled={currentPage === 1}
            onClick={prevBtn}
          >
            Previous
          </button>
          <span>
            <button className="page-btn">{currentPage}</button> of{" "}
            {totalPages}{" "}
          </span>
          <button
            className="pagination-text pointer"
            data-testid="btn-next"
            disabled={currentPage === totalPages}
            onClick={nextBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

// const mapStateToProps = (state) => {
//   const { currentPage, totalPages, allTodos } = state.todos;
//   return {
//     allTodos,
//     currentPage,
//     totalPages,
//   };
// };
export default Pagination;