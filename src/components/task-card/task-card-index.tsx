import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useTasks from "@/stores/use-tasks"
import { Calendar } from "lucide-react"
import TaskCardDeleteBtn from "./task-card-delete-btn"
import TaskCardEditBtn from "./task-card-edit-btn"
import TaskCardImportantBtn from "./task-card-important-btn"

export type TaskType = {
  _id: number
  completed: boolean
  deadline: string
  description: string
  directory: string
  important: boolean
  title: string
}

function TaskCard(props: TaskType) {
  const setter = useTasks((state) => state.setter)

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">{props.title}</CardTitle>
        <Badge>{props.directory}</Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        <CardDescription>{props.description}</CardDescription>
        <p className="flex items-center gap-x-2 text-sm">
          <Calendar size={16} />
          <span>{props.deadline}</span>
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        {props.completed ? (
          <Badge
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setter(props._id, "completed", false)}
          >
            Completed
          </Badge>
        ) : (
          <Badge
            className="bg-yellow-600 hover:bg-yellow-700"
            onClick={() => setter(props._id, "completed", true)}
          >
            Uncompleted
          </Badge>
        )}
        <div>
          <TaskCardImportantBtn {...props} />
          <TaskCardDeleteBtn {...props} />
          <TaskCardEditBtn {...props} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard
