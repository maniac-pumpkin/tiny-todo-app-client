import AppSidebar from "@/components/app-sidebar/app-sidebar-index"
import AppTopbar from "@/components/app-topbar/app-topbar-index"
import { SidebarProvider } from "@/components/ui/sidebar"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/app/_layout")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="container relative">
        <AppTopbar />
        <Outlet />
      </section>
    </SidebarProvider>
  )
}
