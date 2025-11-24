'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import contentManager from '@/lib/contentManager';

export default function ContactEditor() {
    const [formData, setFormData] = useState({
        preHeading: '',
        heading: '',
        description: '',
        email: '',
        ctaText: ''
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const contactData = contentManager.getContact();
        setFormData(contactData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        contentManager.updateContact(formData);
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
                    <h2 className="text-2xl font-bold text-on-background">Contact Section</h2>
                    <p className="text-sm text-secondary">Edit your contact information and CTA</p>
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
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Pre-Heading
                            </label>
                            <input
                                type="text"
                                name="preHeading"
                                value={formData.preHeading}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="What's Next?"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Main Heading
                            </label>
                            <input
                                type="text"
                                name="heading"
                                value={formData.heading}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Get In Touch"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Tell visitors why they should contact you..."
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-secondary">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-secondary">
                                    CTA Button Text
                                </label>
                                <input
                                    type="text"
                                    name="ctaText"
                                    value={formData.ctaText}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                    placeholder="Say Hello"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                    <div className="rounded-xl border border-surface-variant bg-surface/30 p-6 backdrop-blur-sm">
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary">
                            Live Preview
                        </h3>
                        <div className="rounded-lg border border-primary/10 bg-background p-8 text-center shadow-lg">
                            <div className="space-y-4">
                                <p className="font-mono text-sm text-primary">04. {formData.preHeading || "What's Next?"}</p>
                                <h1 className="text-4xl font-bold text-on-background">{formData.heading || "Get In Touch"}</h1>
                                <p className="mx-auto max-w-lg text-lg text-secondary">
                                    {formData.description || "Tell visitors why they should contact you..."}
                                </p>
                                <div className="pt-4">
                                    <button className="rounded-md border-2 border-primary px-6 py-3 font-mono text-sm text-primary transition-colors hover:bg-primary/10">
                                        {formData.ctaText || "Say Hello"}
                                    </button>
                                </div>
                                <p className="text-sm text-secondary">Email: {formData.email || "your@email.com"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                        <div className="flex gap-3">
                            <span className="text-xl">📬</span>
                            <p className="text-sm text-secondary">
                                <strong className="text-on-background">Contact Tip:</strong> Make sure your email is correct! This is the primary way potential clients or employers will reach you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
