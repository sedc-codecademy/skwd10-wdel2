import { Outlet } from "react-router-dom";

const TodoLayout = () => {
  return (
    <div className="todos">
      <h4>Todos!</h4>
      <Outlet />
    </div>
  );
};

export default TodoLayout;
