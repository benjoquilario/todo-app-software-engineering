import { type Todo } from "@/types"
import { AnimatePresence } from "framer-motion"
import * as React from "react"
import TodoItem from "./todo-item"

interface TodoListProps {
  todo: Todo[]
  filter: "all" | "active" | "completed"
  deleteItem: (id: string) => void
  updateItem: (id: string) => void
  updatedTodo: (id: string, updatedTodo: string) => void
  // updateLocalItem: (data: any) => void
  children: React.ReactNode
}

const TodoList = React.forwardRef<HTMLLIElement, TodoListProps>(
  (
    {
      todo: items,
      filter,
      deleteItem,
      updateItem,
      // updateLocalItem,
      updatedTodo,
      children,
    },
    ref
  ) => {
    const rendered = (
      id: string,
      content: string,
      isCompleted: boolean,
      index: number
    ) => {
      return (
        <TodoItem
          updatedTodo={updatedTodo}
          updateItem={updateItem}
          deleteItem={deleteItem}
          index={index}
          id={id}
          key={id}
          content={content}
          isCompleted={isCompleted}
        />
      )
    }

    const renderedList = items.map(({ id, content, isCompleted }, index) => {
      return rendered(id, content, isCompleted, index)
    })

    const renderedListActive = items.map(
      ({ id, content, isCompleted }, index) => {
        if (isCompleted) return ""

        return rendered(id, content, isCompleted, index)
      }
    )

    const renderedListCompleted = items.map(
      ({ id, content, isCompleted }, index) => {
        if (!isCompleted) return ""
        return rendered(id, content, isCompleted, index)
      }
    )

    const renderedFilteredList = () => {
      if (filter === "active") return renderedListActive
      else if (filter === "completed") return renderedListCompleted
      else return renderedList
    }

    // const onHandleOnDragEnd = (result: any) => {
    //   if (!result.destination) return
    //   const updatedList = Array.from(items)
    //   const [reorderedItem] = updatedList.splice(result.source.index, 1)
    //   updatedList.splice(result.destination.index, 0, reorderedItem)
    //   updateLocalItem(updatedList)
    // }

    return (
      <React.Fragment>
        <div className="flex w-full space-x-2">{children}</div>
        <div className="h-auto transition-all">
          <AnimatePresence>
            <ul className="todos max-h-64 overflow-auto">
              {items.length === 0 ? (
                <div>Create Todo</div>
              ) : (
                renderedFilteredList()
              )}

              <li className="pt-12" ref={ref} />
            </ul>
          </AnimatePresence>
        </div>
      </React.Fragment>
    )
  }
)

export default TodoList
