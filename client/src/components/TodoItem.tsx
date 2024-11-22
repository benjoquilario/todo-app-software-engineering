import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { type Todo } from "@/types"
import { Label } from "./ui/label"

interface TodoItemProps {
  todo: Todo
  index: number
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index }) => {
  return (
    <motion.div
      key={todo.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="mt-4 flex items-center justify-between"
    >
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.isCompleted}
          // onCheckedChange={() => toggleTodo(todo.id)}
        />
        <Label
          htmlFor={`todo-${todo.id}`}
          className={`${todo.isCompleted ? "text-gray-500 line-through" : ""}`}
        >
          {todo.content}
        </Label>
      </div>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}
export default TodoItem
