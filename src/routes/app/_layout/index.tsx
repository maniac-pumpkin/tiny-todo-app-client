import TaskCardWrapper from "@/components/task-card/task-card-wrapper"
import { isAuthenticated } from "@/lib/auth"
import useTasks from "@/stores/use-tasks"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createFileRoute("/app/_layout/")({
  beforeLoad: () => {
    if (!isAuthenticated())
      throw redirect({
        to: "/auth/sign-in",
      })
  },

  component: RouteComponent,
})

function RouteComponent() {
  const tasks = useTasks((state) => state.tasks)
  const setNumberOfTasks = useTasks((state) => state.setNumberOfTasks)

  useEffect(() => {
    setNumberOfTasks(tasks.length)
  }, [setNumberOfTasks, tasks])

  return (
    <>
      <TaskCardWrapper tasks={tasks} />
    </>
  )
}
