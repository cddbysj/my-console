import React from "react";
import { connect } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { addTodo, toggleTodo } from "../../reducers/todoSlice";

const selectTodos = createSelector(
  state => state.todos,
  todos => todos
);

let nextTodoId = 1;

const Todos = props => {
  const { todos, addTodo, toggleTodo } = props;

  const onAddTodo = text => {
    addTodo({ id: nextTodoId++, text });
  };
  const onToggleTodo = id => {
    toggleTodo({ id });
  };

  return (
    <div>
      <button onClick={() => onAddTodo("New Todo!")}>Add todo</button>
      <ul>
        {todos &&
          todos.map(todo => (
            <li key={todo.id}>
              {todo.id}-{todo.text}
              <button onClick={() => onToggleTodo(todo.id)}>toggle</button>
              <span>{todo.completed ? "√" : "×"}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: selectTodos(state)
});

const mapDispatchToProps = { addTodo, toggleTodo };

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
