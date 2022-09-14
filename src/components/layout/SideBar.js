import "./SideBar.css";
import OperationsList from "../operations/OperationsList";
import { Link } from "react-router-dom";
import SearchBar from "../UI/search-bar/SearchBar";
import { useState, useEffect } from "react";

const SideBar = ({ operations, getOperation }) => {
  const [operationsSearch, setOperationsSearch] = useState(null);
  const searchHandler = (enetredSearch) => {
    const resultSearch = operations.filter((operation) => {
      const title = operation.title.toLowerCase();
      const searchValue = enetredSearch.toLowerCase();
      return title.includes(searchValue);
    });
    setOperationsSearch(resultSearch);
  };

  return (
    <div className="sideBar">
      <div className="header">
        <span>Operations</span>
        <Link to="/add-operation">
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
      <SearchBar searchHandler={searchHandler} />
      <OperationsList
        operations={!operationsSearch ? operations : operationsSearch}
        getOperation={getOperation}
      />
    </div>
  );
};

export default SideBar;
