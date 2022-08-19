import React from 'react'
import Typography from '@mui/material/Typography';


export default function Todo( {todo, toggleTodo} ) {

  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <Typography style={todo.complete ? {textDecoration: "line-through"} : null }>
        <label>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            {todo.name}
        </label>
    </Typography>
  )
}
