'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import contentManager from '@/lib/contentManager';
import {
    Image as ImageIcon,
    Link as LinkIcon,
    Upload,
    Trash2,
    Copy,
    Check,
    Plus,
    X
} from 'lucide-react';

export default function MediaManager() {
    const [media, setMedia] = useState([]);
    const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' or 'add'
    const [urlInput, setUrlInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [copiedId, setCopiedId] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Initial load
        setMedia(contentManager.getMedia());

        // Subscribe to changes
        const unsubscribe = contentManager.subscribe((content) => {
            setMedia(content.media || []);
        });

        return () => unsubscribe();
    }, []);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleAddUrl = () => {
        if (urlInput.trim()) {
            contentManager.addMedia({
                url: urlInput.trim(),
                name: nameInput.trim() || 'External Image',
                type: 'url'
            });
            setUrlInput('');
            setNameInput('');
            setActiveTab('gallery');
            showMessage('success', 'Image URL added successfully!');
        }
    };

    const handleFileUpload = (files) => {
        if (files && files[0]) {
            const file = files[0];

            // Check file size (limit to 500KB for localStorage)
            if (file.size > 500 * 1024) {
                showMessage('error', 'Image too large! Max 500KB for local storage.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                contentManager.addMedia({
                    url: reader.result,
                    name: file.name,
                    type: 'base64'
                });
                setActiveTab('gallery');
                showMessage('success', 'Image uploaded successfully!');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this image?')) {
            contentManager.deleteMedia(id);
            showMessage('success', 'Image deleted successfully');
        }
    };

    const handleCopy = (url, id) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
        showMessage('success', 'URL copied to clipboard!');
    };

    // Drag and drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files);
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
                    <h2 className="text-2xl font-bold text-on-background">Media Library</h2>
                    <p className="text-sm text-secondary">Manage your images and assets</p>
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
                        {message.type === 'success' ? <Check size={16} /> : <X size={16} />}
                        {message.text}
                    </motion.div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-surface-variant">
                <button
                    onClick={() => setActiveTab('gallery')}
                    className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === 'gallery'
                        ? 'text-primary'
                        : 'text-secondary hover:text-on-background'
                        }`}
                >
                    Gallery ({media.length})
                    {activeTab === 'gallery' && (
                        <motion.div
                            layoutId="activeTabMedia"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('add')}
                    className={`relative pb-3 text-sm font-medium transition-colors ${activeTab === 'add'
                        ? 'text-primary'
                        : 'text-secondary hover:text-on-background'
                        }`}
                >
                    Add New
                    {activeTab === 'add' && (
                        <motion.div
                            layoutId="activeTabMedia"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                    )}
                </button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'gallery' ? (
                    <motion.div
                        key="gallery"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    >
                        {media.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                                <ImageIcon size={48} className="mb-4 text-surface-variant" />
                                <p className="text-secondary">No media items found</p>
                                <button
                                    onClick={() => setActiveTab('add')}
                                    className="mt-4 text-sm text-primary hover:underline"
                                >
                                    Add your first image
                                </button>
                            </div>
                        ) : (
                            media.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="group relative overflow-hidden rounded-xl border border-surface-variant bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg"
                                >
                                    <div className="aspect-video w-full overflow-hidden bg-surface-variant/30">
                                        <img
                                            src={item.url}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/300?text=Error';
                                            }}
                                        />
                                    </div>
                                    <div className="p-3">
                                        <p className="truncate text-sm font-medium text-on-background" title={item.name}>
                                            {item.name}
                                        </p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-[10px] uppercase tracking-wider text-secondary">
                                                {item.type}
                                            </span>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleCopy(item.url, item.id)}
                                                    className="rounded p-1.5 text-secondary hover:bg-primary/10 hover:text-primary"
                                                    title="Copy URL"
                                                >
                                                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="rounded p-1.5 text-secondary hover:bg-red-500/10 hover:text-red-500"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="add"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid gap-8 lg:grid-cols-2"
                    >
                        {/* Add URL */}
                        <div className="rounded-xl border border-surface-variant bg-surface/50 p-6 backdrop-blur-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-full bg-primary/10 p-2 text-primary">
                                    <LinkIcon size={20} />
                                </div>
                                <h3 className="font-semibold text-on-background">Add External URL</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm text-secondary">Image Name (Optional)</label>
                                    <input
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="My Image"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm text-secondary">Image URL</label>
                                    <input
                                        type="url"
                                        value={urlInput}
                                        onChange={(e) => setUrlInput(e.target.value)}
                                        className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                                <button
                                    onClick={handleAddUrl}
                                    disabled={!urlInput.trim()}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-semibold text-background transition-all hover:bg-primary/90 disabled:opacity-50"
                                >
                                    <Plus size={18} />
                                    Add to Library
                                </button>
                            </div>
                        </div>

                        {/* Upload File */}
                        <div className="rounded-xl border border-surface-variant bg-surface/50 p-6 backdrop-blur-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
                                    <Upload size={20} />
                                </div>
                                <h3 className="font-semibold text-on-background">Upload Image</h3>
                            </div>

                            <div
                                className={`relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${dragActive
                                    ? 'border-primary bg-primary/5'
                                    : 'border-surface-variant bg-background/30 hover:border-primary/50 hover:bg-surface-variant/30'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(e.target.files)}
                                />
                                <Upload size={48} className={`mb-4 ${dragActive ? 'text-primary' : 'text-secondary'}`} />
                                <p className="text-sm font-medium text-on-background">
                                    Click to upload or drag and drop
                                </p>
                                <p className="mt-2 text-xs text-secondary">
                                    Max file size: 500KB (Stored locally)
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
