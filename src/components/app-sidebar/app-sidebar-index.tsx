import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import AppSidebarDirs from "./app-sidebar-dirs"
import AppSidebarLinks from "./app-sidebar-links"
import AppSidebarProfile from "./app-sidebar-profile"
import AppSidebarProgress from "./app-sidebar-progress"

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <AppSidebarProfile />
        <AppSidebarProgress />
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <AppSidebarLinks />
              <SidebarSeparator />
              <AppSidebarDirs />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
