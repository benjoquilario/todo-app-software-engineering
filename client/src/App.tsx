import { useEffect, useState } from "react"
import "./App.css"
import { type Todo as ITodo } from "./types"
import Todo from "./components/Todo"

function App() {
  const [initialTodos, setInitialTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setInitialTodos(data))
  }, [])

  return (
    <div>
      <h1>Todo App</h1>
      {/* <Todo initialTodos={initialTodos} /> */}
    </div>
  )
}

export default App
