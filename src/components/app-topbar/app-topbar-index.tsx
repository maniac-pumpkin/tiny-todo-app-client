import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import pathnameToString from "@/lib/pathname-to-string"
import useTasks from "@/stores/use-tasks"
import { useLocation } from "@tanstack/react-router"
import { format } from "date-fns"
import AddTask from "./app-topbar-add-task"
import AppTopbarFilter from "./app-topbar-filter"

function AppTopbar() {
  const { pathname } = useLocation()
  const numberOfTasks = useTasks((state) => state.numberOfTasks)
  // const navigate = useNavigate()
  // const search = useSearch({ strict: false })

  const currentDate = format(new Date(), "MMMM dd, yyyy")

  // const handleOnSearchInput = (e: FormEvent<HTMLInputElement>) => {
  //   const value = e.currentTarget.value || ""
  //   navigate({ search: { search: value } })
  // }

  return (
    <header className="my-5 space-y-8">
      <nav className="flex items-center justify-between gap-x-2">
        <SidebarTrigger className="md:hidden" />
        <Input
          className="hidden w-1/4 lg:block"
          placeholder="Search for tasks"
          type="search"
          // value={search.search}
          // onInput={handleOnSearchInput}
        />
        <span className="text-sm sm:text-base">{currentDate}</span>
        <AddTask />
      </nav>
      <Input
        className="lg:hidden"
        placeholder="Search for tasks"
        type="search"
        // value={search.search}
        // onInput={handleOnSearchInput}
      />
      <h1 className="mb-8 text-center text-xl font-bold sm:text-left sm:text-2xl">
        {pathnameToString(pathname === "/" ? "All" : pathname)} tasks (
        {numberOfTasks})
      </h1>
      <AppTopbarFilter />
    </header>
  )
}

export default AppTopbar
