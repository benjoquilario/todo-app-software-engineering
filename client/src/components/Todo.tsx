import { type Todo as ITodo } from "@/types"
import * as React from "react"
import TodoList from "./todo-list"
import { setData } from "@/lib/utils"
import { option } from "@/lib/utils"
import TodoForm from "./todo-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TodoProps {
  initialTodos: ITodo[]
}
const Todo: React.FC<TodoProps> = ({ initialTodos }) => {
  const [items, setItems] = React.useState<ITodo[]>(initialTodos)
  const [filter, setFilter] = React.useState<"all" | "completed" | "active">(
    "all"
  )
  const bottomRef = React.useRef<HTMLLIElement>(null)

  React.useEffect(() => {
    setData("todos", items)
  }, [items])

  const onAddTodo = React.useCallback(
    (value: ITodo) => {
      setItems((item) => [...item, value])
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    },
    [items]
  )

  const deletedItem = React.useCallback(
    (id: string) => {
      if (initialTodos) {
        setItems([...items].filter((item) => item.id !== id))
      }
    },
    [items, initialTodos]
  )

  const updateItem = (id: string) => {
    if (initialTodos) {
      const todosData = [...items]

      const todosItem = todosData.find((todo) => todo.id === id)

      if (todosItem) {
        todosItem.isCompleted = !todosItem.isCompleted
      }

      setItems(todosData)
    }
  }

  const updatedTodo = (id: string, updatedTodo: string) => {
    const index = items.findIndex((item) => item.id === id)

    const newTodos = [...items]

    newTodos[index] = {
      ...newTodos[index],
      content: updatedTodo,
    }

    setItems(newTodos)
  }

  const clearCompleted = () => {
    setItems([...items].filter((item) => !item.isCompleted))
  }

  // const updateLocalItem = (updated: ITodo[]) => {
  //   setItems(updated)
  // }

  const itemsLeft = React.useMemo(() => {
    let completedItems: number
    let totalLength = items.length
    completedItems = items.filter((item) => item.isCompleted).length

    if (completedItems === 0 && filter === "completed") {
      return completedItems
    }

    return totalLength - completedItems
  }, [items])

  return (
    <React.Fragment>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          <TodoList
            updatedTodo={updatedTodo}
            updateItem={updateItem}
            deleteItem={deletedItem}
            // updateLocalItem={updateLocalItem}
            filter={filter}
            todo={items}
            ref={bottomRef}
          >
            <TodoForm onAddTodo={onAddTodo} />
          </TodoList>
          <div className="relative mt-2 flex flex-col text-xs transition-all">
            <div className="flex items-center justify-between text-sm transition-all md:w-full">
              <span>{itemsLeft} items left</span>
              <button className="" onClick={clearCompleted}>
                Clear Completed
              </button>
            </div>
            <ul className="mt-[19px] flex items-center justify-center gap-4 transition-all md:absolute md:left-[50%] md:top-[50%] md:mt-0 md:translate-x-[-50%] md:translate-y-[-50%] md:shadow-none">
              {option.map((list) => (
                <li className="text-[12px] md:text-[14px]" key={list.id}>
                  <button
                    className="capitalize transition"
                    aria-label={list.label}
                    onClick={() => setFilter(list.name)}
                  >
                    {list.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default Todo
