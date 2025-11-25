'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import contentManager from '@/lib/contentManager';

export default function ThemeSynchronizer() {
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        // Function to apply custom theme colors if needed
        const applyCustomThemeColors = (themeId, customThemes) => {
            const customTheme = customThemes?.find(t => t.id === themeId);
            if (customTheme) {
                const root = document.documentElement;
                Object.entries(customTheme.colors).forEach(([key, value]) => {
                    root.style.setProperty(`--${key}`, value);
                });
            } else {
                // Clear inline styles to revert to CSS variables from stylesheets
                const root = document.documentElement;
                ['primary', 'background', 'foreground', 'secondary'].forEach(key => {
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
            } else {
                const root = document.documentElement;
                ['primary', 'background', 'foreground', 'secondary'].forEach(key => {
                    root.style.removeProperty(`--${key}`);
                });
            }
        }
    }, [theme]);

    return null;
}
