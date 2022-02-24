import React, { useCallback, useReducer, useRef, useState } from "react";
import "./App.css";


interface Todo {
  id: number;
  text: string;
}
// Todo[]
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const [myState, setMyState] = useState<Todo>();


  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);


  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    // useReducer

    <div className="App">

      <h2 className="mt-5">ToDo App</h2>

      {/* <input type="text" ref={newTodoRef} /> */}


      <div className="container">
        <div className="input-group mb-3 mt-5">
          <input type="text" className="form-control" placeholder="Please add your name" aria-label="Recipient's username" aria-describedby="button-addon2" ref={newTodoRef} />
          <button className="btn btn-secondary" type="button" id="button-addon2" onClick={onAddTodo}>Button</button>

        </div>
      </div>
      {/* <button onClick={onAddTodo}>Add</button> */}
      {todos.map((todo) => (
        <div className="mt-2" key={todo.id}>
          {todo.text}
          <button type="button" className="btn btn-primary " onClick={() => dispatch({ type: "REMOVE", id: todo.id })} >Remove</button>
        </div>
      ))}
    </div>
  );
}

export default App;