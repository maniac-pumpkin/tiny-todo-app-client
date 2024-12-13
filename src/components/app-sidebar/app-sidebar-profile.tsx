import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SidebarHeader, SidebarMenuButton } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { signOut } from "@/lib/auth"
import { useNavigate } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import AppSidebarThemeSwitch from "./app-sidebar-theme-switch"

function AppSidebarAvatar() {
  return (
    <section className="flex items-center gap-x-3">
      <Avatar>
        <AvatarImage className="object-cover" src="" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <span className="font-semibold">User</span>
    </section>
  )
}

function AppSidebarProfile() {
  const isMobile = useIsMobile()
  const navigate = useNavigate()

  const side = isMobile ? "bottom" : "right"
  const align = isMobile ? "center" : "start"

  return (
    <SidebarHeader>
      <Popover>
        <PopoverTrigger asChild>
          <SidebarMenuButton className="py-6">
            <AppSidebarAvatar />
            <ChevronRight className="ml-auto" />
          </SidebarMenuButton>
        </PopoverTrigger>
        <PopoverContent align={align} className="w-60 space-y-4" side={side}>
          <AppSidebarThemeSwitch />
          <Button className="w-full" size="sm" variant="secondary">
            Edit credentials
          </Button>
          <Button className="w-full" size="sm" variant="destructive">
            Delete account
          </Button>
          <Button
            className="w-full"
            size="sm"
            variant="outline"
            onClick={() => {
              if (window.confirm("You sure?")) {
                signOut()
                navigate({ to: "/auth/sign-in" })
              }
            }}
          >
            Sign out
          </Button>
        </PopoverContent>
      </Popover>
    </SidebarHeader>
  )
}

export default AppSidebarProfile
