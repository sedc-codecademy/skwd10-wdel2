import { Outlet } from "react-router-dom";

const TodoLayout = () => {
  return (
    <div className="todos">
      <h4 className="todos-label">Todos!</h4>
      <Outlet />
    </div>
  );
};

export default TodoLayout;
