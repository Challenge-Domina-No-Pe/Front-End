import { createContext, useContext, useMemo, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null)
  const [token, setToken] = useState(null)
  const canEdit = role === "admin"

  const value = useMemo(() => ({
    role, token, canEdit,
    signin: ({ role, token }) => { setRole(role); setToken(token) },
    signout: () => { setRole(null); setToken(null) }
  }), [role, token, canEdit])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
