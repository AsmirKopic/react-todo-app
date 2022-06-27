import { useRef, useState, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4() , name: name, complete: false}]
    })
    console.log(name)
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }


  // testing with time change
  const time = new Date();
  const curretTime = time.getHours();

  let msg;
  
  const customStyle = {
    color: ""
  }

  if (curretTime < 12) {
    msg = "Good morning"
    customStyle.color = "blue"
  } else if (curretTime > 21) {
    msg = "Good night!!"
    customStyle.color = "red"
  } else {
    msg = "Good DAY"
    customStyle.color = "yellow"
  }

  console.log(curretTime)

  return (
    <>
      <TodoList todos = {todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={handleClearTodos}>Clear completed todos</button>
      <div>
        {todos.filter(todo => !todo.complete).length} left to do.
      </div>

      <img className="todo-img" alt='todo' src='https://camo.githubusercontent.com/c43d969d9d071c8342e9a69cdd6acb433c541f431127738974ce22290c46f2b8/68747470733a2f2f692e696d6775722e636f6d2f4f764d5a4273392e6a7067'/>

      <h1 style={customStyle}>{msg}</h1>
    </>
  );
}

export default App;
