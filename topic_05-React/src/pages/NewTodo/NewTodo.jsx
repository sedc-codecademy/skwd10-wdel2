import React, { useState } from "react";
import "./NewTodo.css";

const NewTodo = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
  };
  const descriptionChangeHandler = (e) => {
    setEnteredDescription(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(enteredTitle);
    console.log(enteredDate);
    console.log(enteredDescription);
  };

  return (
    <form className="form" onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-input"
          id="title"
          autoComplete="off"
          onChange={titleChangeHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-input"
          id="date"
          autoComplete="off"
          onChange={dateChangeHandler}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          cols="30"
          rows="10"
          className="form-input"
          onChange={descriptionChangeHandler}
        ></textarea>
      </div>
      <button className="btn-primary max-width" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default NewTodo;
