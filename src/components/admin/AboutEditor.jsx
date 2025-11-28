'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import contentManager from '@/lib/contentManager';

export default function AboutEditor() {
    const [formData, setFormData] = useState({
        paragraphs: ['', '', ''],
        skillsHeading: '',
        profileImage: ''
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Initial load
        setFormData(contentManager.getAbout());

        // Subscribe to changes
        const unsubscribe = contentManager.subscribe((content) => {
            setFormData(content.about || {
                paragraphs: ['', '', ''],
                skillsHeading: '',
                profileImage: ''
            });
        });

        return () => unsubscribe();
    }, []);

    const handleParagraphChange = (index, value) => {
        const newParagraphs = [...formData.paragraphs];
        newParagraphs[index] = value;
        setFormData(prev => ({ ...prev, paragraphs: newParagraphs }));
        setSaved(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const addParagraph = () => {
        setFormData(prev => ({
            ...prev,
            paragraphs: [...prev.paragraphs, '']
        }));
    };

    const removeParagraph = (index) => {
        const newParagraphs = formData.paragraphs.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, paragraphs: newParagraphs }));
    };

    const handleSave = () => {
        contentManager.updateAbout(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-on-background">About Section</h2>
                    <p className="text-sm text-secondary">Edit your about section and bio</p>
                </div>
                <button
                    onClick={handleSave}
                    className="group relative overflow-hidden rounded-lg bg-transparent px-6 py-2 font-semibold tracking-wide text-primary border-2 border-primary transition-all hover:bg-primary/10"
                >
                    <span className="relative z-10">{saved ? '✓ Saved!' : 'Save Changes'}</span>
                </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Edit Form */}
                <div className="rounded-xl border border-surface-variant bg-surface/50 p-6 backdrop-blur-sm">
                    <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary">
                        Edit Content
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Profile Image Path
                            </label>
                            <input
                                type="text"
                                name="profileImage"
                                value={formData.profileImage}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="/images/me.jpg"
                            />
                            <p className="mt-2 text-xs text-secondary">
                                Place your image in the public/images folder and reference it here
                            </p>
                        </div>

                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <label className="text-sm font-medium text-secondary">
                                    About Paragraphs
                                </label>
                                <button
                                    onClick={addParagraph}
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    + Add Paragraph
                                </button>
                            </div>
                            <div className="rounded-lg border border-surface-variant bg-background/30 p-4">
                                <p className="mb-4 text-xs text-secondary">
                                    Use <code className="rounded bg-surface-variant px-1 py-0.5 text-primary">&lt;span class="text-primary"&gt;text&lt;/span&gt;</code> to highlight important words
                                </p>
                                <div className="space-y-4">
                                    {formData.paragraphs.map((paragraph, index) => (
                                        <div key={index} className="group relative">
                                            <textarea
                                                value={paragraph}
                                                onChange={(e) => handleParagraphChange(index, e.target.value)}
                                                rows={3}
                                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                                placeholder={`Paragraph ${index + 1}...`}
                                            />
                                            {formData.paragraphs.length > 1 && (
                                                <button
                                                    onClick={() => removeParagraph(index)}
                                                    className="absolute right-2 top-2 rounded-md bg-surface-variant p-1.5 text-red-400 opacity-0 transition-opacity hover:bg-red-500/10 hover:text-red-500 group-hover:opacity-100"
                                                    title="Remove paragraph"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Skills Section Heading
                            </label>
                            <input
                                type="text"
                                name="skillsHeading"
                                value={formData.skillsHeading}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Here are a few technologies I've been working with recently:"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div className="rounded-xl border border-surface-variant bg-surface/30 p-6 backdrop-blur-sm">
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary">
                            Live Preview
                        </h3>
                        <div className="rounded-lg border border-primary/10 bg-background p-8 shadow-lg">
                            <div className="space-y-4">
                                {formData.paragraphs.map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-lg leading-relaxed text-secondary"
                                        dangerouslySetInnerHTML={{ __html: paragraph || 'Start typing to see your bio here...' }}
                                    />
                                ))}
                                <p className="mt-6 text-lg font-medium text-secondary">
                                    {formData.skillsHeading || 'Skills heading will appear here'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                        <div className="flex gap-3">
                            <span className="text-xl">📝</span>
                            <p className="text-sm text-secondary">
                                <strong className="text-on-background">Writing Tip:</strong> Break your bio into short, readable paragraphs. Use the highlight tag to make key skills or achievements stand out!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
