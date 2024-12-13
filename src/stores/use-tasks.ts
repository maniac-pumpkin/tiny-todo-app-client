import { create } from "zustand"
import { combine } from "zustand/middleware"

const tasks = [
  {
    _id: 1,
    title: "Project Proposal",
    description: "Complete project proposal for client meeting",
    deadline: "2023/07/15",
    directory: "Main",
    important: true,
    completed: false,
  },
  {
    _id: 2,
    title: "Grocery Shopping",
    description: "Buy groceries for the week",
    deadline: "2023/07/10",
    directory: "Main",
    important: false,
    completed: false,
  },
  {
    _id: 3,
    title: "Team Meeting Slides",
    description: "Prepare presentation slides for team meeting",
    deadline: "2023/07/08",
    directory: "Main",
    important: true,
    completed: true,
  },
  {
    _id: 4,
    title: "Dentist Appointment",
    description: "Schedule dentist appointment",
    deadline: "2023/07/20",
    directory: "Main",
    important: true,
    completed: false,
  },
  {
    _id: 5,
    title: "Website Content Update",
    description: "Review and update company website content",
    deadline: "2023/07/25",
    directory: "Main",
    important: false,
    completed: false,
  },
]

const useTasks = create(
  combine({ tasks, numberOfTasks: 0 }, (set) => ({
    setter: (
      _id: number,
      key: keyof (typeof tasks)[number],
      value: string | boolean,
    ) =>
      set((state) => ({
        tasks: state.tasks.map((each) =>
          each._id === _id
            ? {
                ...each,
                [key]: value,
              }
            : each,
        ),
      })),
    addTask: (obj: Omit<(typeof tasks)[number], "_id">) =>
      set((state) => ({
        ...state,
        tasks: [
          ...state.tasks,
          { _id: tasks[tasks.length - 1]._id + 1, ...obj },
        ],
      })),
    removeTask: (_id: number) =>
      set((state) => {
        const filteredTasks = state.tasks.filter((each) => each._id !== _id)
        return { ...state, tasks: filteredTasks }
      }),
    setNumberOfTasks: (num: number) =>
      set((state) => ({ ...state, numberOfTasks: num })),
  })),
)

export default useTasks
