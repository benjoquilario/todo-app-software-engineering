import { User } from "@/types"
import * as React from "react"

interface Session {
  status: "authenticated" | "loading" | "unauthenticated"
  accessToken: string | null
  user: User | null
}

const sessionDefaultValue: Session = {
  status: "loading",
  accessToken: null,
  user: null,
}

export const AuthContext = React.createContext<{
  session: Session
  setSession: React.Dispatch<React.SetStateAction<Session>>
}>({
  session: sessionDefaultValue,
  setSession: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState(sessionDefaultValue)

  const refreshSession = async () => {
    const res = await fetch("http://localhost:5000/auth/refresh", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      setSession({ status: "unauthenticated", accessToken: null, user: null })
      return
    }

    const data = await res.json()

    setSession({ ...data, status: "authenticated" })
  }

  React.useEffect(() => {
    if (session.accessToken || session.user) return

    refreshSession()

    const interval = setInterval(refreshSession, 14 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  )
}
