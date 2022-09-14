import { useRef } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  const inputRef = useRef();
  const clickHandler = () => {
    const enteredValue = inputRef.current.value;
    props.searchHandler(enteredValue);
  };
  return (
    <div className="search-bar">
      <input type="text" ref={inputRef} />
      <i className="fa-solid fa-magnifying-glass" onClick={clickHandler}></i>
    </div>
  );
};

export default SearchBar;
