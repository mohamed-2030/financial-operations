import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="navBar">
      <ul>
        <li>
          <NavLink
            to="/home"
            className={(navData) => (navData.isActive ? "link-active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-operations"
            className={(navData) => (navData.isActive ? "link-active" : "")}
          >
            My Operations
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/statistic"
            className={(navData) => (navData.isActive ? "link-active" : "")}
          >
            Statistic
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default NavBar;
