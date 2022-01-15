import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

import axios from 'axios';


const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4300/api/todo')
      .then(res => {
        setContent(res.data);
      })
  }, [])

  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return content.map(todo => (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={todo.id}>
      <div></div>
      <div key={todo.id}>
        {todo.description}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;
