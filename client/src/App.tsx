import Home from "@/routes/home"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useSession } from "./hooks/useSession"
import SignIn from "./routes/sign-in"
import SignUp from "./routes/sign-up"

function App() {
  const { accessToken } = useSession()

  console.log(accessToken)

  return (
    <div>
      <h1 className="sr-only">Todo App</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home accessToken={accessToken!} />} />
          <Route
            path="/sign-in"
            element={<SignIn accessToken={accessToken!} />}
          />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
