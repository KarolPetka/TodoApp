import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
// eslint-disable-next-line
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4300/api/todo')
      .then(res => {
        setContent(res.data);
      })
  }, [])

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    
    axios.post('http://localhost:4300/api/todo/' + todo.id + "/" + todo.text);
    window.location.reload();
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    axios.put('http://localhost:4300/api/todo/' + todoId + "/" + newValue.text);
    window.location.reload();
  };

  const removeTodo = id => {
    axios.delete('http://localhost:4300/api/todo/' + id);
    window.location.reload();
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>App that helps YOU ToDo more!</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
