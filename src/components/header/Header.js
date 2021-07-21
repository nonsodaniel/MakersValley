import * as actions from "../../store/actions/todoActions";
import "../../components/layouts/layout.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import "./header.scss";

const Header = (props) => {
  const dispatch = useDispatch();
  const select = useSelector((state) => state);

  const handleSearch = ({ target }) => {
    dispatch(actions.handleSearchTodo(target.value));
  };
  const sortCategory = ({ target }) => {
    dispatch(actions.handleSortCategory(target.value));
  };
  const sortAlphabetically = ({ target }) => {
    dispatch(actions.handleSortAlphabet(target.value));
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
                <option defaultValue="All">All</option>
                <option value="Health">Health</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div className="select-wrap sort-items">
              <label htmlFor="sortOrder" className="sort-label">
                Order
              </label>
              <select
                className="select-item"
                aria-label="select"
                onChange={sortAlphabetically}
                data-testid="sort-order"
              >
                <option value="default">Default</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
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
