'use client';

import { useState } from 'react';
import contentManager from '@/lib/contentManager';

export default function DataManager() {
    const [exportData, setExportData] = useState('');
    const [importData, setImportData] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleExport = () => {
        const data = contentManager.exportContent();
        setExportData(data);
        showMessage('success', 'Content exported successfully!');
    };

    const handleImport = () => {
        try {
            const result = contentManager.importContent(importData);
            if (result) {
                showMessage('success', 'Content imported successfully! Refresh the page to see changes.');
                setImportData('');
            } else {
                showMessage('error', 'Invalid JSON format. Please check your data.');
            }
        } catch (error) {
            showMessage('error', 'Failed to import: ' + error.message);
        }
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone!')) {
            contentManager.resetToDefaults();
            showMessage('success', 'Content reset to defaults. Refresh the page to see changes.');
        }
    };

    const handleDownload = () => {
        const data = contentManager.exportContent();
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

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-on-background">Data Manager</h2>
                <p className="text-sm text-secondary">Export, import, or reset your content data</p>
            </div>

            {/* Message Display */}
            {message.text && (
                <div
                    className={`rounded-md p-4 ${message.type === 'success'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-red-500/10 text-red-500'
                        }`}
                >
                    {message.text}
                </div>
            )}

            {/* Export Section */}
            <div className="rounded-lg border border-surface-variant bg-background p-4">
                <h3 className="mb-3 text-lg font-semibold text-on-background">Export Content</h3>
                <p className="mb-4 text-sm text-secondary">
                    Export all your content as JSON for backup or migration
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="rounded-md bg-transparent px-6 py-2 font-semibold tracking-wide text-[var(--primary)] border-2 border-[var(--primary)] transition-colors hover:bg-primary/10"
                    >
                        Export to Text
                    </button>
                    <button
                        onClick={handleDownload}
                        className="rounded-md bg-transparent px-6 py-2 font-semibold tracking-wide text-[var(--primary)] border-2 border-[var(--primary)] transition-colors hover:bg-primary/10"
                    >
                        Download JSON File
                    </button>
                </div>
                {exportData && (
                    <div className="mt-4">
                        <textarea
                            value={exportData}
                            readOnly
                            rows={10}
                            className="w-full rounded-md border border-surface-variant bg-surface p-4 font-mono text-xs text-on-background"
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(exportData);
                                showMessage('success', 'Copied to clipboard!');
                            }}
                            className="mt-2 text-sm text-primary hover:underline"
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                )}
            </div>

            {/* Import Section */}
            <div className="rounded-lg border border-surface-variant bg-background p-4">
                <h3 className="mb-3 text-lg font-semibold text-on-background">Import Content</h3>
                <p className="mb-4 text-sm text-secondary">
                    Paste JSON content to import and replace all current data
                </p>
                <div className="space-y-3">
                    <textarea
                        value={importData}
                        onChange={(e) => setImportData(e.target.value)}
                        rows={10}
                        className="w-full rounded-md border border-surface-variant bg-surface p-4 font-mono text-xs text-on-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Paste your JSON content here..."
                    />
                    <button
                        onClick={handleImport}
                        disabled={!importData.trim()}
                        className="rounded-md bg-transparent px-6 py-2 font-semibold tracking-wide text-[var(--primary)] border-2 border-[var(--primary)] transition-colors hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Import Content
                    </button>
                </div>
            </div>

            {/* Reset Section */}
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                <h3 className="mb-3 text-lg font-semibold text-red-500">Danger Zone</h3>
                <p className="mb-4 text-sm text-secondary">
                    Reset all content to default values. This action cannot be undone!
                </p>
                <button
                    onClick={handleReset}
                    className="rounded-md bg-red-500 px-6 py-2 font-medium text-white transition-colors hover:bg-red-600"
                >
                    Reset to Defaults
                </button>
            </div>

            {/* Info Section */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <h3 className="mb-2 text-sm font-semibold text-primary">💡 Tips</h3>
                <ul className="space-y-1 text-sm text-secondary">
                    <li>• Export your content regularly as a backup</li>
                    <li>• Use the download feature to save content as a file</li>
                    <li>• Import feature is useful for migrating content between environments</li>
                    <li>• All data is stored in your browser's localStorage</li>
                </ul>
            </div>
        </div>
    );
}
