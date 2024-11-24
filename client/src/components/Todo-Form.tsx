import { type Todo } from "@/types"
import * as React from "react"
import { Input } from "./ui/input"
// import { useForm } from "react-hook-form"

interface TodoFormProps {
  onAddTodo: (value: Todo) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const inputTodoText = React.useRef<HTMLInputElement>(null)

  // const form = useForm({
  //   defaultValues: {},
  // })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredText = inputTodoText.current!.value

    const newTodos: Todo = {
      id: String(Math.floor(Math.random() * Date.now())),
      content: enteredText,
      isCompleted: false,
      title: "",
    }

    if (!enteredText) return

    onAddTodo(newTodos)

    inputTodoText.current!.value = ""
  }

  return (
    <form className="mb-4 w-full transition-all" onSubmit={submit}>
      <div className="relative w-full rounded">
        <label className="sr-only" htmlFor="todos">
          Create a new todo
        </label>
        <Input
          className="h-12 w-full text-xs transition-all md:text-base"
          placeholder="Create a new todo..."
          aria-label="Create a new todo"
          id="todos"
          type="text"
          ref={inputTodoText}
        />
      </div>
    </form>
  )
}
export default TodoForm
