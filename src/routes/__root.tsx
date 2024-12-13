import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
  Outlet,
  createRootRoute,
  type ErrorComponentProps,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { ServerCrash, TriangleAlert } from "lucide-react"

export const Route = createRootRoute({
  component: RouteComponent,
  notFoundComponent: NotFound,
  errorComponent: Error,
})

function RouteComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
      <ReactQueryDevtools position="bottom" />
    </>
  )
}

function NotFound() {
  return (
    <div className="absolute left-2/4 top-2/4 flex -translate-x-2/4 -translate-y-2/4 items-center gap-x-2">
      <TriangleAlert />
      <h3 className="text-lg font-semibold">This page isn't available.</h3>
    </div>
  )
}

function Error({ error, reset }: ErrorComponentProps) {
  return (
    <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 space-y-5 text-center">
      <ServerCrash size={68} className="mx-auto" />
      <h3 className="text-xl">{error.name}</h3>
      <p className="max-w-96 text-lg">{error.message}</p>
      <Button onClick={reset}>Reset</Button>
    </div>
  )
}
