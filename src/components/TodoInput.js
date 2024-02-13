import React, { useState } from 'react';

const TodoList = (props) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        title: inputValue,
        date: dateValue
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setDateValue('');
    }
  }
  const handleDelete = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };
  return (
    <div>
      <h2 className='heading'>ToDo</h2>
      <div>
        <input className='inputTextTodo'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter todo..."
        />
        <input className='dateInput'
          type="date"
          value={dateValue}
          onChange={handleDateChange}
        />
        <br/>
        <br/>
        <button className='btnAdd' onClick={addTodo}>Add Todo</button>
      </div>
      <h1 className='heading'>ToDo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span className='titleStyle'><b>{todo.title}</b></span>
            <span className='dateStyle'>{todo.date}</span>
            <span className='delIcons'>
            <i className=" delItemIcon fa-solid fa-trash" onClick={() => handleDelete(todo.id)} ></i>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
