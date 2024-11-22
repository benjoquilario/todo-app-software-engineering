export interface User {
  id: string
  email: string
  name: string
  password: string
}

export interface Todo {
  id: string
  title: string
  content: string
  isCompleted: boolean
}
