import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { ThemeProvider } from "./contexts/theme"

import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

import "./styles/default.css"
import "./styles/index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
