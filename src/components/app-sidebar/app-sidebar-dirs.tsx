import AlertDialog from "@/components/dialogs/alert-dialog"
import RegularDialog from "@/components/dialogs/regular-dialog"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import useControlInput from "@/hooks/use-control-input"
import { useToast } from "@/hooks/use-toast"
import useDirectories from "@/stores/use-directories"
import useTasks from "@/stores/use-tasks"
import { Link, useParams } from "@tanstack/react-router"
import {
  ChevronsUpDown,
  Folders,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash,
} from "lucide-react"

function EditDirectory({ dir }: { dir: string }) {
  const inputRef = useControlInput()

  const removeDir = useDirectories((state) => state.removeDir)
  const addDir = useDirectories((state) => state.addDir)
  const setter = useTasks((state) => state.setter)
  const tasks = useTasks((state) => state.tasks)

  const handleAction = () => {
    const value = inputRef.current?.value
    if (!value) return

    removeDir(dir)
    addDir(value)

    tasks.forEach(({ directory, _id }) => {
      if (directory === dir) setter(_id, "directory", value)
    })
  }

  return (
    <RegularDialog
      title="Edit current directory name"
      description="Write a capitalized directory name, up to 15 characters in length."
      actionBtn={{ text: "Edit directory", fn: handleAction }}
      trigger={
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
      }
      content={
        <Label className="block space-y-5">
          <span>Directory name</span>
          <Input ref={inputRef} type="text" placeholder="ex: financial" />
        </Label>
      }
    />
  )
}

function DeleteDirectory({ dir }: { dir: string }) {
  const removeDir = useDirectories((state) => state.removeDir)
  const removeTask = useTasks((state) => state.removeTask)
  const tasks = useTasks((state) => state.tasks)

  const handleAction = () => {
    removeDir(dir)
    tasks.forEach(({ directory, _id }) => {
      if (directory === dir) removeTask(_id)
    })
  }

  return (
    <AlertDialog
      description="This action will delete the directory and all its tasks."
      actionFn={handleAction}
      trigger={
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      }
    />
  )
}

function CreateDirectory() {
  const dirNames = useDirectories((state) => state.dirNames)
  const addDir = useDirectories((state) => state.addDir)
  const inputRef = useControlInput()
  const { toast } = useToast()

  const handleAction = () => {
    const inputValue = inputRef.current?.value || ""

    const isEmpty = inputValue.length === 0
    const isMoreThan15 = inputValue.length > 15
    const isTaken = dirNames.find(
      (each) => each.toLowerCase() === inputValue.trim().toLowerCase(),
    )

    if (isEmpty || isMoreThan15 || isTaken) {
      toast({
        description: "Directory was not created.",
        variant: "destructive",
      })
      return
    }

    toast({ description: "Directory created." })
    addDir(inputValue.trim())
  }

  return (
    <RegularDialog
      title="Create directory"
      description="Write a capitalized directory name, up to 15 characters in length."
      actionBtn={{ text: "Create directory", fn: handleAction }}
      trigger={
        <SidebarMenuButton className="w-8 justify-center">
          <Plus />
        </SidebarMenuButton>
      }
      content={
        <Label className="block space-y-5">
          <span>Directory name</span>
          <Input ref={inputRef} type="text" placeholder="ex: financial" />
        </Label>
      }
    />
  )
}

function DropDown({ dir }: { dir: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <EditDirectory dir={dir} />
        <DeleteDirectory dir={dir} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Directories() {
  const { dir } = useParams({ strict: false })
  const dirNames = useDirectories((state) => state.dirNames)

  return dirNames.map((dirName) => (
    <SidebarMenuSub key={crypto.randomUUID()}>
      <SidebarMenuSubItem className="flex">
        <SidebarMenuButton isActive={dirName.toLowerCase() === dir} asChild>
          <Link
            from="/"
            to="/directories/$dir"
            params={{ dir: dirName.toLowerCase() }}
            search
          >
            {dirName}
          </Link>
        </SidebarMenuButton>
        {dirName !== "Main" && <DropDown dir={dirName} />}
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  ))
}

function AppSidebarDirs() {
  return (
    <Collapsible>
      <SidebarMenuItem>
        <section className="flex">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <Folders />
              <span>Directories</span>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CreateDirectory />
        </section>
        <CollapsibleContent>
          <Directories />
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

export default AppSidebarDirs
