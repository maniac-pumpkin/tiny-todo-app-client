import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Link, useLocation } from "@tanstack/react-router"
import { CircleCheck, CircleX, LayoutGrid, Star } from "lucide-react"

const links = [
  {
    title: "All tasks",
    icon: <LayoutGrid />,
    url: "/",
  },
  {
    title: "Important tasks",
    icon: <Star />,
    url: "/important",
  },
  {
    title: "Completed tasks",
    icon: <CircleCheck />,
    url: "/completed",
  },
  {
    title: "Uncompleted tasks",
    icon: <CircleX />,
    url: "/uncompleted",
  },
]

function AppSidebarLinks() {
  const { pathname } = useLocation()

  return links.map(({ title, icon, url }) => (
    <SidebarMenuItem key={crypto.randomUUID()}>
      <SidebarMenuButton asChild isActive={pathname === url}>
        <Link to={url}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))
}

export default AppSidebarLinks
