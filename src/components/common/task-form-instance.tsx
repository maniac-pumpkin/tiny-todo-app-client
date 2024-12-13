import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormWrapper,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import useDirectories from "@/stores/use-directories"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(20, { message: "Title can't exceed 20 characters." }),
  description: z.string().max(80, {
    message: "Description can't exceed 80 characters.",
  }),
  deadline: z.date(),
  directory: z.string(),
  important: z.boolean(),
  completed: z.boolean(),
})

type SchemaType = z.infer<typeof formSchema>

export type TaskFormInstancePropsType = {
  values: SchemaType
  actionFn: (values: SchemaType) => void
  submitBtnText: string
}

function TaskFormInstance({
  values,
  actionFn,
  submitBtnText,
}: TaskFormInstancePropsType) {
  const dirNames = useDirectories((state) => state.dirNames)

  const form = useForm<SchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  })

  const onFormSubmit = (values: SchemaType) => {
    actionFn(values)
    form.reset()
  }

  return (
    <FormWrapper {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onFormSubmit)}>
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter task title (3-20 characters)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Deadline</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the task in detail (optional, up to 80 characters)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="directory"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Directory</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dirNames.map((dir) => (
                    <SelectItem value={dir} key={crypto.randomUUID()}>
                      {dir}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          name="important"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  className="h-5 w-5 rounded-md"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormControl></FormControl>
              <FormLabel>Mark as important</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          name="completed"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-center gap-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  className="h-5 w-5 rounded-md"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Mark as completed</FormLabel>
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {submitBtnText}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default TaskFormInstance
