import React, { useState } from "react";
import "./NewTodo.css";
import axios from "axios";

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

  const resetTodoForm = () => {
    setEnteredTitle("");
    setEnteredDate("");
    setEnteredDescription("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        !enteredTitle.length > 0 ||
        !enteredDescription.length > 0 ||
        !enteredDate
      ) {
        throw new Error("All fields are required!");
      }
      const newTodo = {
        title: enteredTitle,
        date: enteredDate.toString(),
        description: enteredDescription,
        progress: 0,
      };

      // const options = {
      //   method: "POST",
      //   body: JSON.stringify(newTodo),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };
      // const response = await fetch("http://localhost:4000/api/todos", options);
      // const result = await response.json();
      // console.log(result);
      const httpRequest = axios({
        method: "post",
        url: "http://localhost:4000/api/todos",
        data: newTodo,
      });
      const result = await httpRequest;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    resetTodoForm();
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
          value={enteredTitle}
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
          value={enteredDate}
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
          value={enteredDescription}
        ></textarea>
      </div>
      <button className="btn-primary max-width" type="submit">
        Add Todo
      </button>
      <button
        onClick={resetTodoForm}
        className="btn-danger max-width reset-form"
        type="button"
      >
        Reset Form
      </button>
    </form>
  );
};

export default NewTodo;
