'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import contentManager from '@/lib/contentManager';

export default function ThemeSynchronizer() {
    const { theme, setTheme } = useTheme();

    // Helper to calculate contrast color (black or white)
    const getContrastColor = (hexColor) => {
        // Convert hex to RGB
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);

        // Calculate luminance
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

        // Return black or white based on luminance
        return (yiq >= 128) ? '#000000' : '#ffffff';
    };

    useEffect(() => {
        // Function to apply custom theme colors if needed
        const applyCustomThemeColors = (themeId, customThemes) => {
            const customTheme = customThemes?.find(t => t.id === themeId);
            if (customTheme) {
                const root = document.documentElement;
                Object.entries(customTheme.colors).forEach(([key, value]) => {
                    root.style.setProperty(`--${key}`, value);
                });

                // Automatically set primary-foreground based on primary color contrast
                if (customTheme.colors.primary) {
                    const contrastColor = getContrastColor(customTheme.colors.primary);
                    root.style.setProperty('--primary-foreground', contrastColor);
                }
            } else {
                // Clear inline styles to revert to CSS variables from stylesheets
                const root = document.documentElement;
                ['primary', 'background', 'foreground', 'secondary', 'primary-foreground'].forEach(key => {
                    root.style.removeProperty(`--${key}`);
                });
            }
        };

        // Initial sync
        const syncTheme = () => {
            // Don't sync if not initialized yet to avoid overriding with default 'system'
            if (!contentManager.isInitialized) return;

            const { theme: themeConfig } = contentManager.getAllContent();
            if (themeConfig?.defaultTheme) {
                // Update theme if different from current
                if (themeConfig.defaultTheme !== theme) {
                    setTheme(themeConfig.defaultTheme);
                }

                // Apply custom colors if needed
                if (themeConfig.customThemes) {
                    applyCustomThemeColors(themeConfig.defaultTheme, themeConfig.customThemes);
                }
            }
        };

        // Subscribe to changes
        const unsubscribe = contentManager.subscribe((content) => {
            // Only apply updates if initialized
            if (!contentManager.isInitialized) return;

            if (content.theme?.defaultTheme) {
                setTheme(content.theme.defaultTheme);
                applyCustomThemeColors(content.theme.defaultTheme, content.theme.customThemes);
            }
        });

        // Run initial sync
        syncTheme();

        return () => unsubscribe();
    }, []); // Run once on mount

    // Listen to manual theme changes to apply custom colors
    useEffect(() => {
        const { theme: themeConfig } = contentManager.getAllContent();
        if (themeConfig?.customThemes) {
            const customTheme = themeConfig.customThemes.find(t => t.id === theme);
            if (customTheme) {
                const root = document.documentElement;
                Object.entries(customTheme.colors).forEach(([key, value]) => {
                    root.style.setProperty(`--${key}`, value);
                });

                // Automatically set primary-foreground based on primary color contrast
                if (customTheme.colors.primary) {
                    const contrastColor = getContrastColor(customTheme.colors.primary);
                    root.style.setProperty('--primary-foreground', contrastColor);
                }
            } else {
                const root = document.documentElement;
                ['primary', 'background', 'foreground', 'secondary', 'primary-foreground'].forEach(key => {
                    root.style.removeProperty(`--${key}`);
                });
            }
        }
    }, [theme]);

    return null;
}
