import TodoList from "./TodoList"
import { type Todo as ITodo } from "@/types"
import * as React from "react"

interface TodoProps {
  initialTodos: ITodo[]
}
const Todo: React.FC<TodoProps> = ({ initialTodos }) => {
  const [items, setItems] = React.useState<ITodo[]>(initialTodos)
  const [filter, setFilter] = React.useState<"all" | "completed" | "active">(
    "all"
  )

  const onAddTodo = (value: ITodo) => {
    setItems((item) => [...item, value])
  }

  return (
    <TodoList filter={filter} todo={items}>
      <div>Form</div>
    </TodoList>
  )
}

export default Todo
