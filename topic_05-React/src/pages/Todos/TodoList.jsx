import TodoCard from "../../components/TodoCard/TodoCard";
import { useCallback, useState, useEffect } from "react";
import TodoChart from "../../components/TodoChart/TodoChart";
import "./TodoFilter.css";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodosHandlerAsync = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      // const response = await fetch("http://localhost:4000/api/todos");
      // if (!response.ok) {
      //   throw new Error("Error while fetching data. Try again!");
      // }
      // const result = await response.json();
      // const mappedData = result.map((todo) => {
      //   return {
      //     ...todo,
      //     date: new Date(todo.date),
      //   };
      // });
      // setTodos(mappedData);
      const httpResponse = await axios.get("http://localhost:4000/api/todos");
      const data = httpResponse.data;
      const mappedData = data.map((todo) => {
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
    try {
      // const options = {
      //   method: "DELETE",
      // };
      // const response = await fetch(
      //   `http://localhost:4000/api/todos/${id}`,
      //   options
      // );
      // const result = await response.json();
      // console.log(result);
      // fetchTodosHandlerAsync();
      const httpReq = axios({
        method: "delete",
        url: `http://localhost:4000/api/todos/${id}`,
      });
      const response = await httpReq;
      console.log(response);
      fetchTodosHandlerAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const onFilterChangeHandler = (e) => {
    const filterValue = e.target.value;
    const filtered = todos.filter(
      (todo) => todo.date.getFullYear() === parseInt(filterValue)
    );
    setFilteredTodos(filtered);
  };

  useEffect(() => {
    fetchTodosHandlerAsync();
  }, [fetchTodosHandlerAsync]);

  let content = <p>Found no todos!</p>;

  if (filteredTodos) {
    content = (
      <>
        <ul className="todos-list">
          {filteredTodos.map((todo) => (
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
  } else {
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

  if (!isLoading && error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p className="loading">Todos are currently loading...</p>;
  }

  return (
    <>
      <div className="todos-filter">
        <div className="todos-filter__control">
          <label htmlFor="year-filter">Filter by year</label>
          <select
            id="year-filter"
            defaultValue="0"
            onChange={onFilterChangeHandler}
          >
            <option value="0" disabled>
              Select a year...
            </option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>
      </div>
      <TodoChart todos={filteredTodos ? filteredTodos : todos} />
      {content}
    </>
  );
};

export default TodoList;
