"use client"

import * as React from "react"
import { Moon, Sun, Palette, Settings } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ThemeCustomizer } from "@/components/theme-customizer"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()

    // We need to apply the custom colors if the theme is 'custom' on mount/update
    // This logic is duplicated from ThemeCustomizer but necessary for persistence across reloads
    React.useEffect(() => {
        if (theme === "custom") {
            const savedColors = localStorage.getItem("customThemeColors")
            if (savedColors) {
                const colors = JSON.parse(savedColors)
                const root = document.documentElement
                root.style.setProperty("--primary", colors.primary)
                root.style.setProperty("--ring", colors.primary)
                root.style.setProperty("--primary-tint", `${colors.primary}1A`)
                root.style.setProperty("--background", colors.background)
                root.style.setProperty("--foreground", colors.foreground)
                root.style.setProperty("--secondary", colors.secondary)
            }
        } else {
            // Ensure we clean up if we switch AWAY from custom via the menu
            // (ThemeCustomizer handles cleanup on cancel, but this handles menu clicks)
            const root = document.documentElement
            // We only remove if we are NOT in the middle of previewing (which is handled by Customizer)
            // But since this effect runs on theme change, it should be fine.
            root.style.removeProperty("--primary")
            root.style.removeProperty("--ring")
            root.style.removeProperty("--primary-tint")
            root.style.removeProperty("--background")
            root.style.removeProperty("--foreground")
            root.style.removeProperty("--secondary")
        }
    }, [theme])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Palette className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    Default
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("gold")}>
                    Gold
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("sage")}>
                    Sage
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("sky")}>
                    Sky
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <ThemeCustomizer>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Customize...</span>
                    </DropdownMenuItem>
                </ThemeCustomizer>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
