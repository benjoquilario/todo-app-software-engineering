import { type Todo } from "@/types"
import * as React from "react"
import { useForm } from "react-hook-form"

const TodoForm = () => {
  const inputTodoText = React.useRef<HTMLInputElement>(null)

  const form = useForm({
    defaultValues: {},
  })

  const onHandleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredText = inputTodoText.current!.value

    const newTodos: Todo = {
      id: String(Math.floor(Math.random() * Date.now())),
      content: enteredText,
      isCompleted: false,
      title: "",
    }

    if (!enteredText) return

    // onAddTodo(newTodos)

    inputTodoText.current!.value = ""
  }

  return <div>TodoForm</div>
}
export default TodoForm
