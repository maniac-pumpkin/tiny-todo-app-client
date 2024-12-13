import { create } from "zustand"
import { combine } from "zustand/middleware"

export type RenderModeType = "grid" | "list"
export type SortType = "Order added" | "Later first" | "Earlier first"

const useTopbarFilter = create(
  combine(
    {
      renderMode: "grid",
      sortBy: "Order added",
    },
    (set) => ({
      setSortOption: (option: SortType) =>
        set((state) => ({ ...state, sortBy: option })),
      setRenderMode: (mode: RenderModeType) =>
        set((state) => ({ ...state, renderMode: mode })),
    }),
  ),
)

export default useTopbarFilter
