import "./TodoCard.css";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

const TodoCard = (props) => {
  const formatDate = () => {
    const month = props.date.toLocaleString("en-US", { month: "short" });
    const day = props.date.toLocaleString("en-US", { day: "2-digit" });
    const year = props.date.getFullYear();
    return `${month}. ${day} ${year}`;
  };

  const deleteTodoHandler = () => {
    props.onDeleteTodo(props.id);
  };

  const todoDetailsNav = `/todos/${props.id}`;
  return (
    <li>
      <Card className="todo-card">
        <div className="todo-card__details">
          <div className="todo-card__title">{props.title}</div>
          <div className="todo-card__content">
            <div className="todo-card__progress">
              {props.progress.toFixed(2)}%
            </div>
            <div className="todo-card__date">{formatDate()}</div>
            <div className="todo-card__description">{props.description}</div>
          </div>
          <div className="todo-card__actions">
            <button className="btn-danger" onClick={deleteTodoHandler}>
              Delete Todo
            </button>
            <Link to={todoDetailsNav}>
              <button type="button" className="btn-primary">
                Details
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default TodoCard;
