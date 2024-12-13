import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, type ReactNode } from "react"

type PropsType = {
  mode?: "default" | "custom"
  trigger: ReactNode
  content: ReactNode
  title: string
  description?: string
  actionBtn?: {
    text: string
    fn: () => void
  }
}

function RegularDialog({
  mode = "default",
  title,
  description,
  actionBtn,
  trigger,
  content,
}: PropsType) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    actionBtn?.fn()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        {mode === "default" && (
          <DialogFooter>
            <Button onClick={handleClick}>{actionBtn?.text}</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default RegularDialog
