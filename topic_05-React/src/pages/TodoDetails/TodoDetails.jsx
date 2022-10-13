import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TodoDetails.css";
import axios from "axios";

const TodoDetails = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState({});

  const fetchTodoAsync = useCallback(async () => {
    try {
      // const response = await fetch(`http://localhost:4000/api/todos/${id}`);
      // if (!response.ok) {
      //   throw new Error("An error occured! Try again later!");
      // }
      // const result = await response.json();
      // setTodo(result);
      const httpResponse = await axios.get(
        `http://localhost:4000/api/todos/${id}`
      );
      const data = httpResponse.data;
      setTodo(data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchTodoAsync();
  }, [fetchTodoAsync]);

  return (
    <div className="todo-details">
      <div className="todo-details__header">
        <p className="todo-details__title">{todo.title}</p>
        <progress
          className="todo-details__progress"
          value={todo.progress}
          max="100"
        ></progress>
      </div>
      <p className="todo-details__date">{todo.date}</p>
      <p className="todo-details__description">{todo.description}</p>
    </div>
  );
};

export default TodoDetails;
