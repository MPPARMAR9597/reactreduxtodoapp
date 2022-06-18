import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  completeTodos,
  unCompleteTodos,
  removeTodos,
  updateTodos,
  removeAllTodos
} from "../Reducers";
import TodoItem from "./TodoItem";
import AWN from "awesome-notifications";
let notifier = new AWN();

const mapStateToProps = (state) => {
  return { todos: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    completeTodo: (id) => dispatch(completeTodos(id)),
    unCompleteTodos: (id) => dispatch(unCompleteTodos(id)),
    removeAllTodos: (id) => dispatch(removeAllTodos()),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("all");

  const deleteAllTodo = () => {
    let getConformation = window.confirm("Are You Sure ?");
    if (getConformation === true) {
      props.removeAllTodos();
      notifier.alert('All ToDo Deleted!', { position: 'top-right' });
    }
  }

  return (
    <div className="displaytodos">
      <div className="buttons" style={props.todos.length === 0 ? { display: 'none' } : { display: 'block' }}>
        <button style={{ backgroundColor: sort === "all" ? "#4caf50" : '', color: sort === "all" ? "#fff" : '' }} onClick={() => setSort("all")}>All</button>
        <button style={{ backgroundColor: sort === "completed" ? "#4caf50" : '', color: sort === "completed" ? "#fff" : '' }} onClick={() => setSort("completed")} >Completed</button>
        <button style={{ backgroundColor: sort === "incompleted" ? "#4caf50" : '', color: sort === "incompleted" ? "#fff" : '' }} onClick={() => setSort("incompleted")} >In-Completed</button>
        <button onClick={deleteAllTodo} disabled={props.todos.length === 0}>All Delete</button>
      </div>
      <ul>

        {props.todos.length > 0 && sort === "all"
          ? props.todos.map((item) => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                removeTodo={props.removeTodo}
                updateTodo={props.updateTodo}
                completeTodo={props.completeTodo}
                unCompleteTodos={props.unCompleteTodos}
              />
            );
          })
          : ''}

        {props.todos.length > 0 && sort === "completed"
          ? props.todos.map((item) => {
            return (
              item.completed === true && (
                <TodoItem
                  key={item.id}
                  item={item}
                  removeTodo={props.removeTodo}
                  updateTodo={props.updateTodo}
                  completeTodo={props.completeTodo}
                  unCompleteTodos={props.unCompleteTodos}
                />
              )
            );
          })
          : ''}

        {props.todos.length > 0 && sort === "incompleted"
          ? props.todos.map((item) => {
            return (
              item.completed === false && (
                <TodoItem
                  key={item.id}
                  item={item}
                  removeTodo={props.removeTodo}
                  updateTodo={props.updateTodo}
                  completeTodo={props.completeTodo}
                  unCompleteTodos={props.unCompleteTodos}
                />
              )
            );
          })
          : ''}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
