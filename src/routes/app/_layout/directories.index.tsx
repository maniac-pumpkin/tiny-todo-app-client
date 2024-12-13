import { createFileRoute, Navigate } from "@tanstack/react-router"

export const Route = createFileRoute("/app/_layout/directories/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to="/app/directories/$dir" params={{ dir: "main" }} />
}
