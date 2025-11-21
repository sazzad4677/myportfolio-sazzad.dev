"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function ThemeCustomizer({ children }) {
    const { theme, setTheme } = useTheme()
    const [open, setOpen] = React.useState(false)
    const iframeRef = React.useRef(null)

    // Initial colors
    const [colors, setColors] = React.useState({
        primary: "#fde047",
        background: "#0a192f",
        foreground: "#ccd6f6",
        secondary: "#8892b0",
    })

    // Drag state
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = React.useState(false)
    const dragStartRef = React.useRef({ x: 0, y: 0 })
    const initialPosRef = React.useRef({ x: 0, y: 0 })

    // Load saved custom colors on mount
    React.useEffect(() => {
        const savedColors = localStorage.getItem("customThemeColors")
        if (savedColors) {
            setColors(JSON.parse(savedColors))
        }
    }, [])

    // Reset position when closed
    React.useEffect(() => {
        if (!open) {
            setPosition({ x: 0, y: 0 })
        }
    }, [open])

    // Global drag listeners
    React.useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return

            const dx = e.clientX - dragStartRef.current.x
            const dy = e.clientY - dragStartRef.current.y

            setPosition({
                x: initialPosRef.current.x + dx,
                y: initialPosRef.current.y + dy
            })
        }

        const handleMouseUp = () => {
            setIsDragging(false)
        }

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    // Apply colors to iframe preview
    const applyColorsToIframe = React.useCallback((colorValues) => {
        if (iframeRef.current?.contentDocument) {
            const iframeRoot = iframeRef.current.contentDocument.documentElement
            iframeRoot.style.setProperty("--primary", colorValues.primary)
            iframeRoot.style.setProperty("--ring", colorValues.primary)
            iframeRoot.style.setProperty("--primary-tint", `${colorValues.primary}1A`)
            iframeRoot.style.setProperty("--background", colorValues.background)
            iframeRoot.style.setProperty("--foreground", colorValues.foreground)
            iframeRoot.style.setProperty("--secondary", colorValues.secondary)
        }
    }, [])

    // Preview effect: Apply colors only to iframe when dialog is open
    React.useEffect(() => {
        if (open) {
            // Only apply to iframe, not to the main document
            applyColorsToIframe(colors)
        }
    }, [open, colors, applyColorsToIframe])

    const handleIframeLoad = () => {
        // Apply colors when iframe loads
        applyColorsToIframe(colors)
    }

    const handleDragStart = (e) => {
        // Only allow dragging from the header area, not from buttons or inputs
        if (e.target.closest('button') || e.target.closest('input')) return

        setIsDragging(true)
        dragStartRef.current = { x: e.clientX, y: e.clientY }
        initialPosRef.current = { ...position }
    }

    const handleColorChange = (key, value) => {
        setColors(prev => ({ ...prev, [key]: value }))
    }

    const handleSave = () => {
        localStorage.setItem("customThemeColors", JSON.stringify(colors))
        setTheme("custom")
        setOpen(false)

        // Apply to main site on save
        const root = document.documentElement
        root.style.setProperty("--primary", colors.primary)
        root.style.setProperty("--ring", colors.primary)
        root.style.setProperty("--primary-tint", `${colors.primary}1A`)
        root.style.setProperty("--background", colors.background)
        root.style.setProperty("--foreground", colors.foreground)
        root.style.setProperty("--secondary", colors.secondary)
    }

    const handleCancel = () => {
        setOpen(false)
        // Reset colors to saved state if on custom theme
        if (theme === 'custom') {
            const savedColors = localStorage.getItem("customThemeColors")
            if (savedColors) {
                setColors(JSON.parse(savedColors))
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={(val) => !val && handleCancel()}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                {children}
            </DialogTrigger>
            <DialogContent
                className="max-w-6xl w-[90vw] h-[80vh] flex flex-col"
                style={{
                    marginLeft: position.x,
                    marginTop: position.y,
                    transition: isDragging ? 'none' : undefined
                }}
            >
                <DialogHeader
                    className="cursor-move select-none flex-shrink-0"
                    onMouseDown={handleDragStart}
                >
                    <DialogTitle>Customize Theme</DialogTitle>
                    <DialogDescription>
                        Drag to move. Pick your colors and see live preview.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-hidden">
                    {/* Left: Color Controls */}
                    <div className="flex flex-col gap-4 overflow-y-auto pr-2">
                        <div className="grid gap-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="primary" className="text-right">
                                    Primary
                                </Label>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Input
                                        id="primary"
                                        type="color"
                                        value={colors.primary}
                                        onChange={(e) => handleColorChange("primary", e.target.value)}
                                        className="h-10 w-full cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="background" className="text-right">
                                    Background
                                </Label>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Input
                                        id="background"
                                        type="color"
                                        value={colors.background}
                                        onChange={(e) => handleColorChange("background", e.target.value)}
                                        className="h-10 w-full cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="foreground" className="text-right">
                                    Text
                                </Label>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Input
                                        id="foreground"
                                        type="color"
                                        value={colors.foreground}
                                        onChange={(e) => handleColorChange("foreground", e.target.value)}
                                        className="h-10 w-full cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="secondary" className="text-right">
                                    Secondary
                                </Label>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Input
                                        id="secondary"
                                        type="color"
                                        value={colors.secondary}
                                        onChange={(e) => handleColorChange("secondary", e.target.value)}
                                        className="h-10 w-full cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="mt-auto pt-4">
                            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleSave}>Save Changes</Button>
                        </DialogFooter>
                    </div>

                    {/* Right: Live Preview */}
                    <div className="flex flex-col gap-2 overflow-hidden">
                        <div className="text-sm font-medium text-muted-foreground">Live Preview</div>
                        <div className="flex-1 border rounded-lg overflow-hidden bg-background">
                            <iframe
                                ref={iframeRef}
                                src="/"
                                onLoad={handleIframeLoad}
                                className="w-full h-full border-0"
                                title="Theme Preview"
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
