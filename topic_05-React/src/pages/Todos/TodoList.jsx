import TodoCard from "../../components/TodoCard/TodoCard";

const TodoList = () => {
  const todos = [
    {
      _id: 1,
      title: "Title 1",
      date: "2022-10-10",
      progress: 50,
      description: "Hello World.",
    },
    {
      _id: 2,
      title: "Title 2",
      date: "2022-10-10",
      progress: 75,
      description: "Hello World.",
    },
    {
      _id: 3,
      title: "Title 3",
      date: "2022-10-10",
      progress: 99,
      description: "Hello World.",
    },
  ];

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
            />
          ))}
        </ul>
      </>
    );
  }

  return <>{content}</>;
};

export default TodoList;