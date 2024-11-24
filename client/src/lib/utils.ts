import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getData = () => JSON.parse(localStorage.getItem("todos") || "")

export const setData = (key: string, value: any[]) =>
  localStorage.setItem(key, JSON.stringify(value))

type Option = {
  id: number
  name: "all" | "active" | "completed"
  label: string
}

export const option: Option[] = [
  {
    id: 1,
    name: "all",
    label: "show all todo items",
  },
  {
    id: 2,
    name: "active",
    label: "show active todo items",
  },
  {
    id: 3,
    name: "completed",
    label: "show completed todo items",
  },
]
