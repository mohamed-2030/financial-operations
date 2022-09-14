import "./MainBtn.css";
import { NavLink } from "react-router-dom";

const MainBtn = (props) => {
  return (
    <NavLink to={`${props.link}`} className="mainBtn">
      <i className={`${props.iconClass} icon`}></i>
      <span>{props.title}</span>
    </NavLink>
  );
};

export default MainBtn;
