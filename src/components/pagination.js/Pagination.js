import { connect } from "react-redux";
import * as actions from "../../store/actions/todoActions";
import "./pagination.scss";

const Pagination = (props) => {
  const prevBtn = () => {
    props.handlePrevBtn()

  };
  const nextBtn = () => {
    props.handleNextBtn()
  };
  return (
    <div className="pagination" data-testid="pagination">
      {props.allTodos.length > 0 && (
        <div className="pagination-wrap">
          <button
            className="pagination-text pointer"
            data-testid="btn-prev"
            disabled={props.currentPage === 1}
            onClick={prevBtn}
          >
            Previous
          </button>
          <span>
            <button className="page-btn">{props.currentPage}</button> of{" "}
            {props.totalPages}{" "}
          </span>
          <button
            className="pagination-text pointer"
            data-testid="btn-next"
            disabled={props.currentPage === props.totalpages}
            onClick={nextBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { currentPage, totalPages, allTodos } = state.todos;
  return {
    allTodos,
    currentPage,
    totalPages,
  };
};
export default connect(mapStateToProps, actions)(Pagination);