import axios from "axios"
const baseUrl = "http://localhost:5000"

export const API = axios.create({
  baseURL: baseUrl,
})

async function delay() {
  await new Promise((res) => setTimeout(res, Math.random() * 1000))
}

export async function createNote({ accessToken }: { accessToken: string }) {
  await delay()

  const res = await API.post(`todo/create`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return res.data
}
