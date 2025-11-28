'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import contentManager from '@/lib/contentManager';

export default function ExperienceManager() {
    const [jobs, setJobs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Initial load
        setJobs(contentManager.getExperience());

        // Subscribe to changes
        const unsubscribe = contentManager.subscribe((content) => {
            setJobs(content.experience || []);
        });

        return () => unsubscribe();
    }, []);

    const handleNewJob = () => {
        setCurrentJob({
            company: '',
            name: '',
            position: '',
            range: '',
            website: '',
            description: []
        });
        setIsEditing(true);
    };

    const handleEditJob = (job) => {
        setCurrentJob({ ...job });
        setIsEditing(true);
    };

    const handleDeleteJob = (jobId) => {
        if (confirm('Are you sure you want to delete this job?')) {
            contentManager.deleteJob(jobId);
            showSaved();
        }
    };

    const handleSaveJob = () => {
        if (currentJob.id) {
            contentManager.updateJob(currentJob.id, currentJob);
        } else {
            contentManager.addJob(currentJob);
        }
        setIsEditing(false);
        setCurrentJob(null);
        showSaved();
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentJob(null);
    };

    const showSaved = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const updateField = (field, value) => {
        setCurrentJob(prev => ({ ...prev, [field]: value }));
    };

    const addDescriptionPoint = (point) => {
        if (point.trim()) {
            setCurrentJob(prev => ({
                ...prev,
                description: [...prev.description, point.trim()]
            }));
        }
    };

    const updateDescriptionPoint = (index, value) => {
        setCurrentJob(prev => ({
            ...prev,
            description: prev.description.map((item, i) => i === index ? value : item)
        }));
    };

    const removeDescriptionPoint = (index) => {
        setCurrentJob(prev => ({
            ...prev,
            description: prev.description.filter((_, i) => i !== index)
        }));
    };

    if (isEditing) {
        return <JobForm
            job={currentJob}
            onSave={handleSaveJob}
            onCancel={handleCancel}
            updateField={updateField}
            addDescriptionPoint={addDescriptionPoint}
            updateDescriptionPoint={updateDescriptionPoint}
            removeDescriptionPoint={removeDescriptionPoint}
        />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-on-background">Experience Manager</h2>
                    <p className="text-sm text-secondary">Manage your work experience</p>
                </div>
                <div className="flex items-center gap-3">
                    {saved && (
                        <motion.span
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1 text-sm font-medium text-green-500"
                        >
                            ✓ Saved Successfully
                        </motion.span>
                    )}
                    <button
                        onClick={handleNewJob}
                        className="group relative overflow-hidden rounded-lg bg-primary px-6 py-2 font-semibold tracking-wide text-background transition-all hover:bg-primary/90"
                    >
                        <span className="relative z-10">+ New Job</span>
                    </button>
                </div>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {jobs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <span className="mb-2 text-4xl">🎯</span>
                            <p className="text-secondary">No experience added yet</p>
                            <p className="text-xs text-secondary/60">Add your first job above</p>
                        </div>
                    ) : (
                        jobs.map((job) => (
                            <motion.div
                                key={job.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="group relative overflow-hidden rounded-xl border border-surface-variant bg-surface/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-on-background">
                                                {job.position}
                                            </h3>
                                            <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">
                                                {job.range}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-secondary">
                                            <span className="font-semibold text-on-surface">{job.name}</span>
                                            {job.website && (
                                                <>
                                                    <span>•</span>
                                                    <a
                                                        href={job.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 hover:text-primary hover:underline"
                                                    >
                                                        {job.website.replace(/^https?:\/\//, '')}
                                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                    </a>
                                                </>
                                            )}
                                        </div>

                                        {job.description && job.description.length > 0 && (
                                            <ul className="mt-4 space-y-2">
                                                {job.description.slice(0, 3).map((item, index) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-secondary">
                                                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
                                                        <span className="line-clamp-2">{item}</span>
                                                    </li>
                                                ))}
                                                {job.description.length > 3 && (
                                                    <li className="pl-3.5 text-xs italic text-secondary/60">
                                                        +{job.description.length - 3} more points...
                                                    </li>
                                                )}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <button
                                            onClick={() => handleEditJob(job)}
                                            className="rounded-lg bg-surface-variant p-2 text-secondary transition-colors hover:bg-primary/10 hover:text-primary"
                                            title="Edit"
                                        >
                                            ✎
                                        </button>
                                        <button
                                            onClick={() => handleDeleteJob(job.id)}
                                            className="rounded-lg bg-surface-variant p-2 text-secondary transition-colors hover:bg-red-500/10 hover:text-red-500"
                                            title="Delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function JobForm({ job, onSave, onCancel, updateField, addDescriptionPoint, updateDescriptionPoint, removeDescriptionPoint }) {
    const [descInput, setDescInput] = useState('');

    const handleAddDescription = () => {
        if (descInput.trim()) {
            addDescriptionPoint(descInput);
            setDescInput('');
        }
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
                        {job.id ? 'Edit Experience' : 'New Experience'}
                    </h2>
                    <p className="text-sm text-secondary">Fill in the job details below</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-lg border border-surface-variant px-6 py-2 font-medium text-secondary transition-colors hover:bg-surface-variant hover:text-on-background"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="rounded-lg bg-primary px-6 py-2 font-semibold text-background transition-all hover:bg-primary/90"
                    >
                        Save Job
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Company Short Name *
                            </label>
                            <input
                                type="text"
                                value={job.company}
                                onChange={(e) => updateField('company', e.target.value)}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="ACME"
                            />
                            <p className="mt-1 text-xs text-secondary">Used in tab navigation</p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Company Full Name *
                            </label>
                            <input
                                type="text"
                                value={job.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="ACME Corporation"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Position *
                            </label>
                            <input
                                type="text"
                                value={job.position}
                                onChange={(e) => updateField('position', e.target.value)}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Senior Software Engineer"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Date Range *
                            </label>
                            <input
                                type="text"
                                value={job.range}
                                onChange={(e) => updateField('range', e.target.value)}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="January 2020 - Present"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-secondary">
                        Company Website
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-2.5 text-lg">🔗</span>
                        <input
                            type="url"
                            value={job.website}
                            onChange={(e) => updateField('website', e.target.value)}
                            className="w-full rounded-lg border border-surface-variant bg-background/50 pl-12 pr-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="https://company.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-secondary">
                        Job Description Points
                    </label>
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <textarea
                                value={descInput}
                                onChange={(e) => setDescInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && e.ctrlKey) {
                                        handleAddDescription();
                                    }
                                }}
                                rows={2}
                                className="flex-1 rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Describe your responsibilities and achievements..."
                            />
                            <button
                                onClick={handleAddDescription}
                                className="rounded-lg bg-surface-variant px-6 py-2.5 font-medium text-on-background hover:bg-primary/10 hover:text-primary"
                            >
                                Add
                            </button>
                        </div>
                        <p className="text-xs text-secondary">Press Ctrl+Enter to add</p>

                        {/* Description Points List */}
                        {job.description && job.description.length > 0 && (
                            <div className="mt-4 space-y-2 rounded-lg border border-surface-variant bg-background/30 p-4">
                                {job.description.map((point, index) => (
                                    <div
                                        key={index}
                                        className="group flex gap-3 rounded-md p-2 transition-colors hover:bg-surface-variant/50"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                        <textarea
                                            value={point}
                                            onChange={(e) => updateDescriptionPoint(index, e.target.value)}
                                            rows={2}
                                            className="flex-1 resize-none border-0 bg-transparent text-sm text-on-background focus:outline-none"
                                        />
                                        <button
                                            onClick={() => removeDescriptionPoint(index)}
                                            className="self-start opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
