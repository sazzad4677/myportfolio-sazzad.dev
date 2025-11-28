'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import contentManager from '@/lib/contentManager';
import { Palette, Plus, Edit2, Trash2, Check } from 'lucide-react';

const PREDEFINED_THEMES = [
    {
        id: 'system',
        name: 'Navy',
        colors: {
            primary: '#64ffda',
            background: '#0a192f',
            foreground: '#ccd6f6',
            secondary: '#8892b0'
        }
    },
    {
        id: 'gold',
        name: 'Gold',
        colors: {
            primary: '#fde047',
            background: '#0a192f',
            foreground: '#ccd6f6',
            secondary: '#8892b0'
        }
    },
    {
        id: 'sage',
        name: 'Sage',
        colors: {
            primary: '#86efac',
            background: '#0a192f',
            foreground: '#ccd6f6',
            secondary: '#8892b0'
        }
    },
    {
        id: 'sky',
        name: 'Sky',
        colors: {
            primary: '#7dd3fc',
            background: '#0a192f',
            foreground: '#ccd6f6',
            secondary: '#8892b0'
        }
    }
];

export default function ThemeManager() {
    const { setTheme } = useTheme();
    const [themeConfig, setThemeConfig] = useState({
        defaultTheme: 'system',
        customThemes: []
    });
    const [saved, setSaved] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [editingTheme, setEditingTheme] = useState(null);

    useEffect(() => {
        // Initial load
        const currentTheme = contentManager.getTheme();
        setThemeConfig(currentTheme);

        // Subscribe to changes
        const unsubscribe = contentManager.subscribe((content) => {
            if (content.theme) {
                setThemeConfig(content.theme);
            }
        });

        return () => unsubscribe();
    }, []);

    const showSaved = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleSetDefaultTheme = async (themeName) => {
        // Apply immediately for instant feedback
        setTheme(themeName);

        try {
            await contentManager.updateDefaultTheme(themeName);
            showSaved();
        } catch (error) {
            console.error('Error setting default theme:', error);
            alert('Failed to set default theme. Please try again.');
        }
    };

    const handleDeleteCustomTheme = async (themeId) => {
        if (confirm('Are you sure you want to delete this custom theme?')) {
            await contentManager.deleteCustomTheme(themeId);
            showSaved();
        }
    };

    const handleCreateTheme = () => {
        setEditingTheme({
            name: '',
            colors: {
                primary: '#64ffda',
                background: '#0a192f',
                foreground: '#ccd6f6',
                secondary: '#8892b0'
            }
        });
        setIsCreating(true);
    };

    const handleSaveCustomTheme = async () => {
        if (!editingTheme.name.trim()) {
            alert('Please enter a theme name');
            return;
        }

        if (editingTheme.id) {
            await contentManager.updateCustomTheme(editingTheme.id, editingTheme);
        } else {
            await contentManager.addCustomTheme(editingTheme);
        }

        setIsCreating(false);
        setEditingTheme(null);
        showSaved();
    };

    const handleEditCustomTheme = (theme) => {
        setEditingTheme({ ...theme });
        setIsCreating(true);
    };

    if (isCreating) {
        return (
            <ThemeEditor
                theme={editingTheme}
                onSave={handleSaveCustomTheme}
                onCancel={() => {
                    setIsCreating(false);
                    setEditingTheme(null);
                }}
                onChange={setEditingTheme}
            />
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-on-background">Theme Manager</h2>
                    <p className="text-sm text-secondary">Manage your portfolio's default theme and custom themes</p>
                </div>
                <div className="flex items-center gap-3">
                    {saved && (
                        <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1 text-sm font-medium text-green-500"
                        >
                            <Check size={16} />
                            Saved Successfully
                        </motion.span>
                    )}
                    <button
                        onClick={handleCreateTheme}
                        className="flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-2 font-semibold text-primary transition-all hover:bg-primary/10"
                    >
                        <Plus size={18} />
                        Create Custom Theme
                    </button>
                </div>
            </div>

            {/* Current Default Theme */}
            <div className="rounded-xl border border-surface-variant bg-surface/30 p-6">
                <h3 className="mb-4 text-lg font-semibold text-on-background">
                    Current Default Theme: <span className="text-primary">{themeConfig.defaultTheme}</span>
                </h3>
                <p className="text-sm text-secondary">
                    This is the theme visitors will see when they first visit your portfolio.
                </p>
            </div>

            {/* Predefined Themes */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-on-background">Predefined Themes</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {PREDEFINED_THEMES.map((theme) => (
                        <ThemeCard
                            key={theme.id}
                            theme={theme}
                            isDefault={themeConfig.defaultTheme === theme.id}
                            onSetDefault={() => handleSetDefaultTheme(theme.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Custom Themes */}
            {themeConfig.customThemes && themeConfig.customThemes.length > 0 && (
                <div>
                    <h3 className="mb-4 text-lg font-semibold text-on-background">Custom Themes</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {themeConfig.customThemes.map((theme) => (
                            <ThemeCard
                                key={theme.id}
                                theme={theme}
                                isDefault={themeConfig.defaultTheme === theme.id}
                                isCustom
                                onSetDefault={() => handleSetDefaultTheme(theme.id)}
                                onEdit={() => handleEditCustomTheme(theme)}
                                onDelete={() => handleDeleteCustomTheme(theme.id)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

function ThemeCard({ theme, isDefault, isCustom, onSetDefault, onEdit, onDelete }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`group relative overflow-hidden rounded-xl border transition-all ${isDefault
                ? 'border-primary bg-primary/5'
                : 'border-surface-variant bg-surface/50 hover:border-primary/30'
                }`}
        >
            {/* Color Preview */}
            <div className="flex h-24 gap-1 p-2">
                <div
                    className="flex-1 rounded"
                    style={{ backgroundColor: theme.colors.primary }}
                    title="Primary"
                />
                <div
                    className="flex-1 rounded"
                    style={{ backgroundColor: theme.colors.background }}
                    title="Background"
                />
                <div
                    className="flex-1 rounded"
                    style={{ backgroundColor: theme.colors.foreground }}
                    title="Foreground"
                />
                <div
                    className="flex-1 rounded"
                    style={{ backgroundColor: theme.colors.secondary }}
                    title="Secondary"
                />
            </div>

            {/* Theme Info */}
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-on-background">{theme.name}</h4>
                    {isDefault && (
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                            Default
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="mt-3 flex gap-2">
                    {!isDefault && (
                        <button
                            onClick={onSetDefault}
                            className="flex-1 rounded-lg border-2 border-primary px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                        >
                            Set as Default
                        </button>
                    )}
                    {isCustom && (
                        <>
                            <button
                                onClick={onEdit}
                                className="rounded-lg border-2 border-surface-variant p-1.5 text-secondary transition-colors hover:border-primary hover:text-primary"
                                title="Edit"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={onDelete}
                                className="rounded-lg border-2 border-surface-variant p-1.5 text-secondary transition-colors hover:border-red-500 hover:text-red-500"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function ThemeEditor({ theme, onSave, onCancel, onChange }) {
    const handleColorChange = (key, value) => {
        onChange({
            ...theme,
            colors: {
                ...theme.colors,
                [key]: value
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-3xl rounded-xl border border-surface-variant bg-surface/50 p-8 backdrop-blur-sm"
        >
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-on-background">
                        {theme.id ? 'Edit Custom Theme' : 'Create Custom Theme'}
                    </h2>
                    <p className="text-sm text-secondary">Customize your theme colors</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border-2 border-surface-variant px-6 py-2 font-medium text-secondary transition-colors hover:bg-surface-variant hover:text-on-background"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="rounded-lg border-2 border-primary px-6 py-2 font-semibold text-primary transition-all hover:bg-primary/10"
                    >
                        Save Theme
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Theme Name */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-secondary">
                        Theme Name *
                    </label>
                    <input
                        type="text"
                        value={theme.name}
                        onChange={(e) => onChange({ ...theme, name: e.target.value })}
                        className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="My Custom Theme"
                    />
                </div>

                {/* Color Pickers */}
                <div className="grid gap-6 md:grid-cols-2">
                    <ColorPicker
                        label="Primary Color"
                        value={theme.colors.primary}
                        onChange={(value) => handleColorChange('primary', value)}
                        description="Main accent color"
                    />
                    <ColorPicker
                        label="Background Color"
                        value={theme.colors.background}
                        onChange={(value) => handleColorChange('background', value)}
                        description="Main background"
                    />
                    <ColorPicker
                        label="Foreground Color"
                        value={theme.colors.foreground}
                        onChange={(value) => handleColorChange('foreground', value)}
                        description="Main text color"
                    />
                    <ColorPicker
                        label="Secondary Color"
                        value={theme.colors.secondary}
                        onChange={(value) => handleColorChange('secondary', value)}
                        description="Secondary text"
                    />
                </div>

                {/* Preview */}
                <div className="rounded-lg border border-surface-variant p-6" style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.foreground
                }}>
                    <h3 className="mb-2 text-xl font-bold">Preview</h3>
                    <p className="mb-4" style={{ color: theme.colors.secondary }}>
                        This is how your theme will look with secondary text.
                    </p>
                    <button
                        className="rounded-lg px-4 py-2 font-semibold"
                        style={{
                            backgroundColor: theme.colors.primary,
                            color: theme.colors.background
                        }}
                    >
                        Primary Button
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function ColorPicker({ label, value, onChange, description }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-secondary">
                {label}
            </label>
            <div className="flex items-center gap-3">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-12 w-20 cursor-pointer rounded-lg border border-surface-variant"
                />
                <div className="flex-1">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2 font-mono text-sm text-on-background transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    {description && (
                        <p className="mt-1 text-xs text-secondary">{description}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
