import TodoLayout from "./TodoLayout";
import { Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import TodoDetails from "../TodoDetails/TodoDetails";
import NewTodo from "../NewTodo/NewTodo";

const TodoRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<TodoLayout />}>
          {/* If you want a "naked" route without any actual url fragment to it, you'll have to define it as an index */}
          {/* <Route index path="" element={<TodoList />} /> */}
          <Route path="list" element={<TodoList />} />
          <Route path=":id" element={<TodoDetails />} />
          <Route path="new" element={<NewTodo />} />
        </Route>
      </Routes>
    </>
  );
};

export default TodoRoutes;
