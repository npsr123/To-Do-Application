import React, { useState , useEffect , useReducer} from 'react';

// const TASK_ACTIONS ={
//   ADD_TASK :'ADD_TASK',
//   DELETE_TASK:'DELETE_TASK',
//   TOGGLE_STATUS:'TOGGLE_STATUS',
//   EDIT_TASK:'EDIT_TASK',
//   SET_TASK:'SET_TASK',
// };

const TodoList = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [description,setDescription] = useState('');
  const [expireDate,setExpireDate] = useState('');
  const [filterStatus,setFilterStatus] = useState('all');
  


  const [todos,setTodos] = useState(()=>{
    const saveTodos = localStorage.getItem("todos");
  return saveTodos ? JSON.parse(saveTodos) : [];
  });
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const addTodo = () => {
    if (!inputValue || !description || !expireDate) return;
    if (inputValue.trim() !== '') {
      const newTodo = {
        title: inputValue,
        description,
        expireDate,
        filterStatus,
        status:'pending',
        timestamp:new Date().toLocaleString(),
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setDescription('');
      setExpireDate('');
      setFilterStatus('');
    }
  }
  const isExpired = (date) => {
    const today = new Date();
    return new Date(date) < today;
  }
  
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((_,todo) => todo !== id);
    setTodos(updatedTodos);
  };
  
  
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos]);
 

  

  return (
    <div>
      <h2 className='heading'>ToDo App</h2>
      <div>
        <input className='inputTextTodo'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Title"
          />
          <br/>
          <br/>
        <textarea value={description} className='inputDescription'
        onChange={(e)=> setDescription(e.target.value)} placeholder='Description'
        ></textarea>
        <br/>
        <br/>
        <input type='date' className='inputDate'
        value={expireDate}
        onChange={(e) => setExpireDate(e.target.value)} 
        />
        <br/>
        <br/>
        <button className='btnAdd' onClick={addTodo}>Add Todo</button>
      </div>
      <h1 className='heading'>ToDo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className='listtodo' >
            <input type= "checkbox"/>
            
            <span className='titleStyle'><b>{todo.title}</b></span>
            <p>{todo.description}</p>
            <small className='time'>Added on: {todo.timestamp}</small>
            <small className='expireDate'>
              Expire Date: {todo.expireDate}{""}
              {isExpired(todo.expireDate) }
            </small>
            
            {/* {todos.map((todo)=>(
              <ul key ={todo.id}>
                {todo.isEditing ? (
                  <input type='text' value={editText} onChange={handleInputEditChange}/>
                ):(
                <span>{todo.text}</span>
                )}
                <button onClick={()=>todo.isEditing ? handleSaveClick(todo.id)
                  : handleInputEditChange(todo.id,todo.text)
                }>
                  {todo.isEditing ? "Save" : "Edit"}
                </button>
              </ul>
            ))} */}

             <span className='delIcons'>
            <button className=" delItemIcon fa-solid fa-trash" onClick={() => handleDelete(index)} >
             Delete</button>
            </span> 
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
