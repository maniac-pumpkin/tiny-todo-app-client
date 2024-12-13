import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/contexts/theme"

function AppSidebarThemeSwitch() {
  const { setTheme, theme } = useTheme()

  const isDark = theme === "dark"

  const handleSwitch = () => {
    switch (theme) {
      case "dark":
        setTheme("light")
        break
      case "light":
        setTheme("dark")
        break
    }
  }

  return (
    <Label className="flex items-center justify-between">
      <span>Dark mode</span>
      <Switch checked={isDark} onCheckedChange={handleSwitch} />
    </Label>
  )
}

export default AppSidebarThemeSwitch
