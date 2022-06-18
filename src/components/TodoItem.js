import React, { useRef } from "react";
import { MdModeEditOutline, MdDone, MdCancel, MdDelete } from "react-icons/md";
import AWN from "awesome-notifications";
let notifier = new AWN();

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo, unCompleteTodos } = props;

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    updateTodo({ id, item: value });
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  return (
    <li key={item.id} className="card">

      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />

      <div className="btns">

        <p className="date__time">{item.create_time}</p>

        <button title="Edit Todo" onClick={() => changeFocus()} >{" "}<MdModeEditOutline />{" "}</button>

        {item.completed === false ?
          <button title="Complete Todo" style={{ color: "green" }} onClick={() => { completeTodo(item.id); notifier.success('ToDo Completed!', { position: 'top-right' }); }}>
            <MdDone />
          </button>
          : <button title="In-Complete Todo" style={{ color: "blue" }} onClick={() => { unCompleteTodos(item.id); notifier.alert('ToDo In-Completed!', { position: 'top-right' }); }}>
            <MdCancel />
          </button>}

        <button title="Delete Todo" style={{ color: "red" }} onClick={() => { removeTodo(item.id); notifier.alert('ToDo Deleted!', { position: 'top-right' }); }}>
          {" "} <MdDelete />
        </button>{" "}

      </div>
      {item.completed ? <span className="completed">Completed</span> :
        <span className="in-completed">In-Completed</span>
      }
    </li>
  );
};

export default TodoItem;
