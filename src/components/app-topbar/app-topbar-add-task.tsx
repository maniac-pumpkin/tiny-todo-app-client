import TaskFormInstance from "@/components/common/task-form-instance"
import RegularDialog from "@/components/dialogs/regular-dialog"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import useTasks from "@/stores/use-tasks"
import { format } from "date-fns"
import type { TaskFormInstancePropsType } from "../common/task-form-instance"

type FormValuesType = TaskFormInstancePropsType["values"]

const defaultValues: FormValuesType = {
  title: "",
  description: "",
  deadline: new Date(),
  directory: "Main",
  important: false,
  completed: false,
}

function AddTask() {
  const addTask = useTasks((state) => state.addTask)
  const isMobile = useIsMobile()

  const actionFn = (values: FormValuesType) => {
    addTask({ ...values, deadline: format(values.deadline, "MM/dd/yyyy") })
  }

  return (
    <RegularDialog
      mode="custom"
      title="Add a task"
      trigger={<Button size={isMobile ? "sm" : "default"}>Add new task</Button>}
      content={
        <TaskFormInstance
          values={defaultValues}
          actionFn={actionFn}
          submitBtnText="Add task"
        />
      }
    />
  )
}

export default AddTask
