import { React, useState } from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from './new-task-form'

function ToDoList({
  todos,
  onDeleted,
  onItemDone,
  onItemEdit,
  onItemActive,
  onItemCompleted,
  clearCompleted,
  onItemAdded,
  onItemSubmit,
}) {
  const [label, setLabel] = useState('')

  const inputChange = (label) => {
    setLabel(label)
  }

  const arrItems = todos.map((el) => {
    return (
      <NewTaskForm
        {...el}
        onDeleted={() => onDeleted(el.id)}
        key={el.id}
        onItemDone={() => onItemDone(el.id)}
        onItemEdit={() => onItemEdit(el.id)}
        onItemActive={() => onItemActive(el.id)}
        onItemCompleted={() => onItemCompleted(el.id)}
        clearCompleted={() => clearCompleted(el.id)}
        onItemAdded={() => onItemAdded(el.id)}
        todos={todos}
        onItemSubmit={() => onItemSubmit(el.id, label)}
        onChange={inputChange}
      />
    )
  })
  return (
    <section className="main">
      <ul className="todo-list">{arrItems}</ul>
    </section>
  )
}
ToDoList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onItemDone: () => {},
  onItemActive: () => {},
  onItemCompleted: () => {},
  clearCompleted: () => {},
}

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onItemDone: PropTypes.func,
  onItemActive: PropTypes.func,
  onItemCompleted: PropTypes.func,
  clearCompleted: PropTypes.func,
}

export default ToDoList
