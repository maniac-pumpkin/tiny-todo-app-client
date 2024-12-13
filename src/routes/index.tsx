import { isAuthenticated } from "@/lib/auth"
import { createFileRoute, Navigate, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (!isAuthenticated())
      throw redirect({
        to: "/auth/sign-in",
      })
  },

  component: () => <Navigate to="/app" />,
})
