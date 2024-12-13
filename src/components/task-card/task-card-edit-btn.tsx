import TaskFormInstance, {
  TaskFormInstancePropsType,
} from "@/components/common/task-form-instance"
import RegularDialog from "@/components/dialogs/regular-dialog"
import { Button } from "@/components/ui/button"
import useTasks from "@/stores/use-tasks"
import { format } from "date-fns"
import { Pencil } from "lucide-react"
import type { TaskType } from "./task-card-index"

type SchemaType = TaskFormInstancePropsType["values"]

function TaskCardEditBtn(props: TaskType) {
  const tasks = useTasks((state) => state.tasks)
  const addTask = useTasks((state) => state.addTask)
  const removeTask = useTasks((state) => state.removeTask)

  const defaultValues = tasks.find(({ _id }) => _id === props._id)

  const actionFn = (values: SchemaType) => {
    removeTask(props._id)
    addTask({ ...values, deadline: format(values.deadline, "MM/dd/yyyy") })
  }

  return (
    <RegularDialog
      mode="custom"
      title="Edit this task"
      trigger={
        <Button size="icon" variant="ghost">
          <Pencil />
        </Button>
      }
      content={
        <TaskFormInstance
          // @ts-expect-error Don't worry
          values={defaultValues}
          actionFn={actionFn}
          submitBtnText="Edit task"
        />
      }
    />
  )
}

export default TaskCardEditBtn
