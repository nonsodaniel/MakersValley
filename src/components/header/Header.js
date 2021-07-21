import * as actions from "../../store/actions/todoActions";
import "../../components/layouts/layout.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./header.scss";
import { categorList, priorityList } from "../utils/modal/db";

const Header = (props) => {
  const dispatch = useDispatch();
  const select = useSelector((state) => state);

  const handleSearch = ({ target }) => {
    dispatch(actions.handleSearchTodo(target.value));
  };
  const sortCategory = ({ target }) => {
    dispatch(actions.handleSortCategory(target.value));
  };
  const sortPriority = ({ target }) => {
    dispatch(actions.handleSortPriority(target.value));
  };
  const sortDate = ({ target }) => {
    dispatch(actions.handleSortDate(target.value));
  };

  return (
    <header className="header" data-testid="header">
      <form action="">
        <div className="header-wrap">
          <div className="search-input">
            <input
              type="text"
              className="form-tag search-textbox"
              data-testid="search-textfield"
              aria-label="search-textfield"
              placeholder="Search Todo"
              value={props.searchValue}
              onChange={handleSearch}
            />
            <span className="search-icon">
              {" "}
              <i className="fas fa-search"></i>
            </span>
          </div>
          <div className="sort-row">
            <span className="sort-items sort-title">Sort By: </span>
            <div className="select-wrap sort-items">
              <label htmlFor="sortCategory" className="sort-label">
                Category
              </label>
              <select
                className="select-item"
                aria-label="select"
                onChange={sortCategory}
                data-testid="sort-category"
              >
                <option value="All"> Category</option>
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
            <div className="select-wrap sort-items">
              <label htmlFor="sortOrder" className="sort-label">
                Priority
              </label>
              <select
                className="select-item"
                aria-label="select"
                onChange={sortPriority}
                data-testid="sort-order"
              >
                <option value="All">Select Priority</option>
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
            <div className="select-wrap sort-items">
              <label htmlFor="sortDate" className="sort-label">
                Date
              </label>
              <select
                className="select-item"
                aria-label="select"
                onChange={sortDate}
                data-testid="sort-date"
              >
                {

                }
                <option value="default">Default</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </header>
  );
};

export default Header;
