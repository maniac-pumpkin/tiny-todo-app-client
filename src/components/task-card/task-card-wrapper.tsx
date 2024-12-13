import { ScrollArea } from "@/components/ui/scroll-area"
import useTopbarFilter from "@/stores/use-topbar-filter"
import { CircleSlash2 } from "lucide-react"
import type { TaskType } from "./task-card-index"
import TaskCard from "./task-card-index"

type PropsType = {
  tasks: TaskType[]
}

function TaskCardWrapper({ tasks }: PropsType) {
  const renderMode = useTopbarFilter((state) => state.renderMode)
  const sortBy = useTopbarFilter((state) => state.sortBy)

  const sortedTasks = structuredClone(tasks).sort((a, b) => {
    switch (sortBy) {
      case "Order added":
        return a._id - b._id
      case "Earlier first":
        return +new Date(a.deadline) - +new Date(b.deadline)
      case "Later first":
        return +new Date(b.deadline) - +new Date(a.deadline)
      default:
        return b._id - a._id
    }
  })

  const wrapperClassName =
    renderMode === "grid"
      ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      : "flex flex-col gap-y-5"

  return (
    <ScrollArea className="h-[calc(100vh-304px)] lg:h-[calc(100vh-236px)]">
      {sortedTasks.length === 0 ? (
        <div className="absolute left-2/4 top-2/4 flex -translate-x-2/4 -translate-y-2/4 items-center gap-x-2">
          <CircleSlash2 />
          <h3 className="text-lg font-semibold">Empty.</h3>
        </div>
      ) : (
        <div className={wrapperClassName}>
          {sortedTasks.map((task) => (
            <TaskCard key={crypto.randomUUID()} {...task} />
          ))}
        </div>
      )}
    </ScrollArea>
  )
}

export default TaskCardWrapper
