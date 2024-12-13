import { create } from "zustand"
import { combine } from "zustand/middleware"

const dirNames = ["Main"]

const useDirectories = create(
  combine({ dirNames }, (set) => ({
    addDir: (name: string) =>
      set((state) => ({ ...state, dirNames: [...state.dirNames, name] })),
    removeDir: (name: string) =>
      set((state) => {
        const filteredDirs = state.dirNames.filter((each) => each !== name)
        return { ...state, dirNames: filteredDirs }
      }),
  })),
)

export default useDirectories
