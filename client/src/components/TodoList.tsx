import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TodoItem from "./TodoItem"
import { type Todo } from "@/types"
import { useMemo } from "react"
import { AnimatePresence } from "framer-motion"

interface TodoListProps {
  todo: Todo[]
  filter: "all" | "active" | "completed"
  children: React.ReactNode
}

const TodoList: React.FC<TodoListProps> = ({
  todo: items,
  filter,
  children,
}) => {
  const rendered = (
    id: string,
    todo: string,
    isCompleted: boolean,
    index: number
  ) => {
    return (
      <TodoItem
        index={index}
        todo={{ id, content: todo, isCompleted, title: "" }}
      />
    )
  }

  const renderedList = useMemo(
    () =>
      items.map(({ id, content, isCompleted }, index) => {
        return rendered(id, content, isCompleted, index)
      }),
    [items]
  )

  const renderedListActive = useMemo(
    () =>
      items.map(({ id, content, isCompleted }, index) => {
        if (isCompleted) return ""

        return rendered(id, content, isCompleted, index)
      }),
    [items]
  )

  const renderedListCompleted = useMemo(
    () =>
      items.map(({ id, content, isCompleted }, index) => {
        if (!isCompleted) return ""
        return rendered(id, content, isCompleted, index)
      }),
    [items]
  )

  const renderedFilteredList = () => {
    if (filter === "active") return renderedListActive
    else if (filter === "completed") return renderedListCompleted
    else return renderedList
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">{children}</div>
        <AnimatePresence>{renderedFilteredList()}</AnimatePresence>
      </CardContent>
    </Card>
  )
}

export default TodoList
