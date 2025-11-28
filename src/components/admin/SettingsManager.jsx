'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import contentManager from '@/lib/contentManager';
import {
    Download,
    Upload,
    RefreshCw,
    AlertTriangle,
    Save,
    FileJson,
    Copy,
    Check
} from 'lucide-react';

export default function SettingsManager() {
    const [activeSection, setActiveSection] = useState('data');
    const [exportData, setExportData] = useState('');
    const [importData, setImportData] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [copied, setCopied] = useState(false);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const handleExport = async () => {
        const data = await contentManager.exportContent();
        setExportData(data);
        showMessage('success', 'Content exported successfully!');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(exportData);
        setCopied(true);
        showMessage('success', 'Copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = async () => {
        const data = await contentManager.exportContent();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-content-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showMessage('success', 'Content downloaded successfully!');
    };

    const handleImport = async () => {
        try {
            if (!importData.trim()) return;

            const result = await contentManager.importContent(importData);
            if (result) {
                showMessage('success', 'Content imported successfully! Refreshing...');
                setImportData('');
                setTimeout(() => window.location.reload(), 1500);
            } else {
                showMessage('error', 'Invalid JSON format. Please check your data.');
            }
        } catch (error) {
            showMessage('error', 'Failed to import: ' + error.message);
        }
    };

    const handleReset = async () => {
        if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone!')) {
            await contentManager.resetToDefaults();
            showMessage('success', 'Content reset to defaults. Refreshing...');
            setTimeout(() => window.location.reload(), 1500);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-on-background">Settings</h2>
                    <p className="text-sm text-secondary">Manage your application data and preferences</p>
                </div>
                {message.text && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-center gap-2 rounded-full px-4 py-1 text-sm font-medium ${message.type === 'success'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-red-500/10 text-red-500'
                            }`}
                    >
                        {message.type === 'success' ? <Check size={16} /> : <AlertTriangle size={16} />}
                        {message.text}
                    </motion.div>
                )}
            </div>

            <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                {/* Sidebar Navigation */}
                <div className="space-y-2">
                    <button
                        onClick={() => setActiveSection('data')}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${activeSection === 'data'
                            ? 'bg-primary text-background shadow-lg shadow-primary/20'
                            : 'text-secondary hover:bg-surface-variant hover:text-on-background'
                            }`}
                    >
                        <FileJson size={18} />
                        Data Management
                    </button>
                    {/* Placeholder for future settings */}
                    {/* <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-secondary hover:bg-surface-variant hover:text-on-background">
                        <Settings size={18} />
                        General
                    </button> */}
                </div>

                {/* Main Content Area */}
                <div className="space-y-6">
                    {activeSection === 'data' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            {/* Export Section */}
                            <div className="rounded-xl border border-surface-variant bg-surface/50 p-6 backdrop-blur-sm">
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-on-background">Export Content</h3>
                                        <p className="text-sm text-secondary">Backup your data or transfer it to another instance</p>
                                    </div>
                                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                                        <Download size={20} />
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={handleExport}
                                        className="flex items-center gap-2 rounded-lg border border-primary text-primary px-6 py-2.5 font-semibold transition-all hover:bg-primary/10"
                                    >
                                        <FileJson size={18} />
                                        View JSON
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-semibold text-background transition-all hover:bg-primary/90"
                                    >
                                        <Download size={18} />
                                        Download File
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {exportData && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mt-6 overflow-hidden"
                                        >
                                            <div className="relative rounded-lg border border-surface-variant bg-background/50">
                                                <textarea
                                                    value={exportData}
                                                    readOnly
                                                    rows={8}
                                                    className="w-full resize-none bg-transparent p-4 font-mono text-xs text-secondary focus:outline-none"
                                                />
                                                <button
                                                    onClick={handleCopy}
                                                    className="absolute right-2 top-2 rounded-md bg-surface p-2 text-secondary hover:text-primary transition-colors"
                                                    title="Copy to clipboard"
                                                >
                                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Import Section */}
                            <div className="rounded-xl border border-surface-variant bg-surface/50 p-6 backdrop-blur-sm">
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-on-background">Import Content</h3>
                                        <p className="text-sm text-secondary">Restore data from a backup file</p>
                                    </div>
                                    <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
                                        <Upload size={20} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <textarea
                                        value={importData}
                                        onChange={(e) => setImportData(e.target.value)}
                                        rows={6}
                                        className="w-full rounded-lg border border-surface-variant bg-background/50 p-4 font-mono text-xs text-on-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="Paste your JSON content here..."
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleImport}
                                            disabled={!importData.trim()}
                                            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-semibold text-background transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Upload size={18} />
                                            Import Data
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-sm">
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-red-500">Danger Zone</h3>
                                        <p className="text-sm text-red-500/70">Irreversible actions</p>
                                    </div>
                                    <div className="rounded-full bg-red-500/10 p-2 text-red-500">
                                        <AlertTriangle size={20} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-lg border border-red-500/10 bg-background/50 p-4">
                                    <div>
                                        <h4 className="font-medium text-on-background">Reset Content</h4>
                                        <p className="text-xs text-secondary">Revert all content to original default values</p>
                                    </div>
                                    <button
                                        onClick={handleReset}
                                        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-red-600"
                                    >
                                        <RefreshCw size={16} />
                                        Reset to Defaults
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
