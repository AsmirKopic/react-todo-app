import { useRef, useState, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {

  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    console.log(name)
    todoNameRef.current.value = null
    setIsExpanded(false)
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  // add button show/hide
  const [isExpanded, setIsExpanded] = useState(false);

  function showAddButton() {
    setIsExpanded(true)
  }


  // testing with time change
  const time = new Date();
  const curretTime = time.getHours();

  let msg;

  if (curretTime < 12) {
    msg = "Good morning."
  } else if (curretTime >= 20) {
    msg = "Good night."
  } else {
    msg = "Good day."
  }

  return (
    <>
      <Typography variant="h2" >
        {msg}
      </Typography>
      <Typography gutterBottom>
        {format(new Date(), 'do MMMM Y')}
      </Typography>
      <br></br>

      <TextField
        sx={{ width: 300 }}
        id="standard-basic"
        label="Write a task name"
        variant="standard"
        onClick={showAddButton}
        inputRef={todoNameRef} />

      <Zoom in={isExpanded}>
        <Fab onClick={handleAddTodo} size="small" color="secondary">
          <AddIcon fontSize="small" />
        </Fab>
      </Zoom>

      <br /><br />

      <TodoList todos={todos} toggleTodo={toggleTodo} />

      <br /><br />
      <Button
        startIcon={<DeleteSweepIcon />}
        color="secondary" size="small"
        onClick={handleClearTodos}>Clear completed</Button>

      <Typography color="secondary">
        {todos.filter(todo => !todo.complete).length} left to do.
      </Typography>
    </>
  );
}

export default App;
