import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
// import { type Todo } from "@/types"
import * as React from "react"
import { EllipsisVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "./ui/label"
import { Input } from "./ui/input"

interface TodoItemProps {
  id: string
  isCompleted: boolean
  content: string
  index: number
  deleteItem: (id: string) => void
  updateItem: (id: string) => void
  updatedTodo: (id: string, updatedTodo: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  content,
  isCompleted: completed,
  deleteItem,
  updateItem,
  updatedTodo,
}) => {
  const [isCompleted, setIsCompleted] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedTodo, setSelectedTodo] = React.useState({
    id: "",
    content: "",
    isCompleted: false,
  })
  const [isUpdating, setIsUpdating] = React.useState(false)
  const inputTodoText = React.useRef<HTMLInputElement>(null)

  const updateItemStatus = (id: string) => {
    updateItem(id)
    setIsCompleted(!isCompleted)
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const enteredText = inputTodoText.current!.value
    updatedTodo(selectedTodo.id, enteredText)
    setIsUpdating(false)
  }

  const clickEdit = () => {
    setIsUpdating(true)
    setSelectedTodo({
      id,
      content,
      isCompleted,
    })
  }

  React.useEffect(() => {
    setIsCompleted(completed)
  }, [completed])

  return (
    <>
      <li id={id} key={id}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="mr-2 mt-4 flex items-center justify-between"
        >
          <div className="flex w-full items-center space-x-2">
            {isUpdating ? (
              <form className="w-full" onSubmit={submit}>
                <Input
                  ref={inputTodoText}
                  type="text"
                  defaultValue={selectedTodo.content}
                  className="ml-0.5 h-10 w-full text-xs transition-all md:text-base"
                />
                <button
                  className="ml-2 text-xs"
                  onClick={() => setIsUpdating(false)}
                >
                  cancel
                </button>
              </form>
            ) : (
              <>
                <Checkbox
                  id={`todo-${id}`}
                  checked={isCompleted}
                  onCheckedChange={() => updateItemStatus(id)}
                />
                <Label
                  htmlFor={`todo-${id}`}
                  className={`${isCompleted ? "text-gray-500 line-through" : ""}`}
                >
                  {content}
                </Label>
              </>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Button
                  onClick={clickEdit}
                  className="w-full"
                  variant="ghost"
                  size="sm"
                >
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="w-full"
                  variant="ghost"
                  size="sm"
                >
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      </li>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              todo list and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={() => deleteItem(id)}>Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default React.memo(TodoItem)
