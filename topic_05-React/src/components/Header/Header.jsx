import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__brand">Todo App</div>
      <nav className="header__nav">
        <a href="/" className="header__nav-item">
          Add Todo
        </a>
        <a href="/" className="header__nav-item">
          Todo Panel
        </a>
      </nav>
    </header>
  );
};

export default Header;
