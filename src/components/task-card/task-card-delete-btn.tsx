import AlertDialog from "@/components/dialogs/alert-dialog"
import { Button } from "@/components/ui/button"
import useTasks from "@/stores/use-tasks"
import { Trash } from "lucide-react"
import type { TaskType } from "./task-card-index"

function TaskCardDeleteBtn(props: TaskType) {
  const removeTask = useTasks((state) => state.removeTask)

  const handleAction = () => removeTask(props._id)

  return (
    <AlertDialog
      description="This action will permanently delete the task."
      actionFn={handleAction}
      trigger={
        <Button size="icon" variant="ghost">
          <Trash />
        </Button>
      }
    />
  )
}

export default TaskCardDeleteBtn
