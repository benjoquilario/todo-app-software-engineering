import Todo from "@/components/todo"
import { type Todo as ITodo } from "@/types"
import * as React from "react"
import { getData } from "@/lib/utils"

interface HomeProps {
  accessToken: string
}

const Home: React.FC<HomeProps> = ({ accessToken }) => {
  const [initialTodos, setInitialTodos] = React.useState<ITodo[]>([])
  const myTodo = localStorage.getItem("todos") ? getData() : []

  console.log(initialTodos)

  React.useEffect(() => {
    fetch("http://localhost:5000/todo/user/todos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setInitialTodos(data))
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Todo initialTodos={myTodo} />
    </div>
  )
}
export default Home
