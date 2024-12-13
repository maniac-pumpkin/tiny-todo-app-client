import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialog as ShadcnAlertDialog,
} from "@/components/ui/alert-dialog"
import type { ReactNode } from "@tanstack/react-router"

type PropsType = {
  trigger: ReactNode
  title?: string
  description: string
  actionFn: () => void
}

function AlertDialog({
  title = "Are you absolutely sure?",
  description,
  actionFn,
  trigger,
}: PropsType) {
  return (
    <ShadcnAlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={actionFn}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ShadcnAlertDialog>
  )
}

export default AlertDialog
