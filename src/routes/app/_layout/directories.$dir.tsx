import TaskCardWrapper from '@/components/task-card/task-card-wrapper'
import useTasks from '@/stores/use-tasks'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/_layout/directories/$dir')({
  component: RouteComponent,
})

function RouteComponent() {
  const { dir } = Route.useParams()

  const tasks = useTasks((state) => state.tasks)
  const setNumberOfTasks = useTasks((state) => state.setNumberOfTasks)

  const tasksInDirectory = tasks.filter(
    ({ directory }) => directory.toLowerCase() === dir,
  )

  useEffect(() => {
    setNumberOfTasks(tasksInDirectory.length)
  }, [setNumberOfTasks, tasksInDirectory])

  return <TaskCardWrapper tasks={tasksInDirectory} />
}
