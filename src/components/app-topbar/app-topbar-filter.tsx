import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useTopbarFilter, {
  type RenderModeType,
  type SortType,
} from "@/stores/use-topbar-filter"
import { LayoutList, List } from "lucide-react"

const selectOptions = ["Order added", "Earlier first", "Later first"]

function AppTopbarFilter() {
  const store = useTopbarFilter()

  return (
    <div className="flex justify-between">
      <ToggleGroup
        className="hidden sm:block"
        type="single"
        value={store.renderMode}
        onValueChange={(value: RenderModeType) =>
          value && store.setRenderMode(value)
        }
      >
        <ToggleGroupItem value="grid">
          <LayoutList />
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <List />
        </ToggleGroupItem>
      </ToggleGroup>
      <Select
        value={store.sortBy}
        onValueChange={(value: SortType) => store.setSortOption(value)}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option) => (
            <SelectItem key={crypto.randomUUID()} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default AppTopbarFilter
