import React from 'react'
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import CircleChecked from '@mui/icons-material/CheckCircleOutline';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';

export default function Todo( {todo, toggleTodo} ) {

  function handleTodoClick() {
    toggleTodo(todo.id)
  }

  return (
    <Typography style={todo.complete ? {textDecoration: "line-through"} : null }>
        <label>
            <Checkbox icon={<CircleUnchecked />} checkedIcon={<CircleChecked />} color="secondary" checked={todo.complete} onChange={handleTodoClick} />
            {todo.name}
        </label>
    </Typography>
  )
}
