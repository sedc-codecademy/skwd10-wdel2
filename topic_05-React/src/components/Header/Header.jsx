import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__brand">
        <Link to="/">TodoApp</Link>
      </div>
      <nav className="header__nav">
        {/* If you want exact route URLs you have to define them with the "end" property */}
        <NavLink end className="header__nav-item" to="/todos/new">
          Add Todo
        </NavLink>
        <NavLink end className="header__nav-item" to="/todos/list">
          Todo Panel
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
