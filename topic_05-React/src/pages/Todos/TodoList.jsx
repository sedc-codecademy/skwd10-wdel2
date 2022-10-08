import TodoCard from "../../components/TodoCard/TodoCard";
import { useCallback, useState, useEffect } from "react";

const TodoList = () => {
  // const todos = [
  //   {
  //     _id: 1,
  //     title: "Title 1",
  //     date: "2022-10-10",
  //     progress: 50,
  //     description: "Hello World.",
  //   },
  //   {
  //     _id: 2,
  //     title: "Title 2",
  //     date: "2022-10-10",
  //     progress: 75,
  //     description: "Hello World.",
  //   },
  //   {
  //     _id: 3,
  //     title: "Title 3",
  //     date: "2022-10-10",
  //     progress: 99,
  //     description: "Hello World.",
  //   },
  // ];

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodosHandlerAsync = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/todos");
      if (!response.ok) {
        throw new Error("Error while fetching data. Try again!");
      }
      const result = await response.json();
      const mappedData = result.map((todo) => {
        return {
          ...todo,
          date: new Date(todo.date),
        };
      });
      setTodos(mappedData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const deleteTodoHandler = async (id) => {
    console.log(id);
  };

  useEffect(() => {
    fetchTodosHandlerAsync();
  }, [fetchTodosHandlerAsync]);

  let content = <p>Found no todos!</p>;

  if (todos.length > 0) {
    content = (
      <>
        <ul className="todos-list">
          {todos.map((todo) => (
            <TodoCard
              key={todo._id}
              id={todo._id}
              title={todo.title}
              date={todo.date}
              progress={todo.progress}
              description={todo.description}
              onDeleteTodo={deleteTodoHandler}
            />
          ))}
        </ul>
      </>
    );
  }

  return <>{content}</>;
};

export default TodoList;
