import { Button } from "@/components/ui/button"
import useTasks from "@/stores/use-tasks"
import { Star } from "lucide-react"
import type { TaskType } from "./task-card-index"

function TaskCardImportantBtn(props: TaskType) {
  const setter = useTasks((state) => state.setter)

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setter(props._id, "important", !props.important)}
    >
      <Star fill={props.important ? "hsl(var(--foreground))" : "transparent"} />
    </Button>
  )
}

export default TaskCardImportantBtn
