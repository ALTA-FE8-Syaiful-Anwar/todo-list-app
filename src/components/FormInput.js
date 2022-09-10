import React, { useState, useContext, useRef, useEffect } from 'react';

const FormInput = () => {
  const [todos, setTodos] = useState();
  const [todoName, setTodoName] = useState();
  const todoInput = useRef();

  const addTodo = e => {
    e.preventDefault();
    setTodos([...todos, {name: todoName, complete: false}])
    setTodoName('');
    todoInput.current.focus();
  }

  useEffect(() =>{
    todoInput.current.focus();
  },[])

  return (
    <div>
        <form autoComplete="off" onSubmit={addTodo}>
            <input type="text" name="todos" id="todos" ref={todoInput} required placeholder="What needs to be done?" value={todoName} onChange={e => setTodoName(e.target.value.toLowerCase())} />
            <button type="submit">Create</button>
        </form>
    </div>
  )
}

export default FormInput;