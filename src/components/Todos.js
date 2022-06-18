import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../Reducers";
import moment from "moment";
import uuid from 'react-uuid';
import AWN from "awesome-notifications";

let notifier = new AWN();

const mapStateToProps = (state) => {
  return { todos: state };
};

const mapDispatchToProps = (dispatch) => {
  return { addTodo: (obj) => dispatch(addTodos(obj)) };
};

const Todos = (props) => {

  const [todo, setTodo] = useState("");

  const handleChange = (e) => { setTodo(e.target.value); };

  const add = () => {
    if (todo === "") {
      notifier.alert('Please Add ToDo!', { position: 'top-right' });
    } else {
      props.addTodo({
        id: uuid(),
        item: todo,
        create_time: moment().format('LL'),
        completed: false,
      });
      notifier.success('New ToDo Added Successfully!', { position: 'top-right' });
      setTodo("");
    }
  };
  return (
    <div className="addTodos">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        className="todo-input"
        value={todo}
      />
      <div className="buttons mb-0">
        <button onClick={() => add()}>Add</button>
      </div>
      <br />
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
