import "./TodoCard.css";
import Card from "../Card/Card";

const TodoCard = (props) => {
    console.log(props);
  return (
    <li>
      <Card className="todo-card">
        <div className="todo-card__details">
          <div className="todo-card__title">{props.title}</div>
          <div className="todo-card__content">
            <div className="todo-card__progress">
              {props.progress.toFixed(2)}%
            </div>
            <div className="todo-card__date">{props.date}</div>
            <div className="todo-card__description">{props.description}</div>
          </div>
          <div className="todo-card__actions">
            <button className="btn-danger">Delete Todo</button>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default TodoCard;
