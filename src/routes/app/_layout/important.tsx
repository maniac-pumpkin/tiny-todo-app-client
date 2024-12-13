import TaskCardWrapper from '@/components/task-card/task-card-wrapper'
import useTasks from '@/stores/use-tasks'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/_layout/important')({
  component: RouteComponent,
})

function RouteComponent() {
  const tasks = useTasks((state) => state.tasks)
  const setNumberOfTasks = useTasks((state) => state.setNumberOfTasks)

  const importantTasks = tasks.filter(({ important }) => important)

  useEffect(() => {
    setNumberOfTasks(importantTasks.length)
  }, [setNumberOfTasks, importantTasks])

  return <TaskCardWrapper tasks={importantTasks} />
}
