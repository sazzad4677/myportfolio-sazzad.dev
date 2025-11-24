'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import contentManager from '@/lib/contentManager';

export default function SkillsManager() {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = () => {
        const skillsData = contentManager.getSkills();
        setSkills(skillsData);
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            contentManager.addSkill(newSkill.trim());
            setNewSkill('');
            loadSkills();
            showSaved();
        }
    };

    const handleUpdateSkill = (skillId) => {
        if (editingValue.trim()) {
            contentManager.updateSkill(skillId, editingValue.trim());
            setEditingId(null);
            setEditingValue('');
            loadSkills();
            showSaved();
        }
    };

    const handleDeleteSkill = (skillId) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            contentManager.deleteSkill(skillId);
            loadSkills();
            showSaved();
        }
    };

    const startEditing = (skill) => {
        setEditingId(skill.id);
        setEditingValue(skill.name);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingValue('');
    };

    const showSaved = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const moveSkill = (index, direction) => {
        const newSkills = [...skills];
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex >= 0 && newIndex < skills.length) {
            [newSkills[index], newSkills[newIndex]] = [newSkills[newIndex], newSkills[index]];
            contentManager.reorderSkills(newSkills);
            loadSkills();
            showSaved();
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
                    <h2 className="text-2xl font-bold text-on-background">Skills Manager</h2>
                    <p className="text-sm text-secondary">Manage your technical skills</p>
                </div>
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
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                {/* Main Content */}
                <div className="space-y-6">
                    {/* Add New Skill */}
                    <div className="rounded-xl border border-surface-variant bg-surface/50 p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-secondary">
                            Add New Skill
                        </h3>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                className="flex-1 rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="e.g., React, Node.js, TypeScript..."
                            />
                            <button
                                onClick={handleAddSkill}
                                disabled={!newSkill.trim()}
                                className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-background transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Skills List */}
                    <div className="rounded-xl border border-surface-variant bg-surface/30 p-6 backdrop-blur-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary">
                                Current Skills ({skills.length})
                            </h3>
                            <span className="text-xs text-secondary">Drag to reorder (coming soon)</span>
                        </div>

                        {skills.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <span className="mb-2 text-4xl">⚡</span>
                                <p className="text-secondary">No skills added yet</p>
                                <p className="text-xs text-secondary/60">Add your first skill above</p>
                            </div>
                        ) : (
                            <div className="grid gap-3 sm:grid-cols-2">
                                <AnimatePresence mode="popLayout">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="group relative flex items-center gap-3 rounded-lg border border-surface-variant bg-background/50 p-3 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                                        >
                                            {/* Reorder Controls */}
                                            <div className="flex flex-col gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                                                <button
                                                    onClick={() => moveSkill(index, 'up')}
                                                    disabled={index === 0}
                                                    className="rounded hover:bg-surface-variant p-0.5 text-[10px] text-secondary hover:text-primary disabled:opacity-20"
                                                >
                                                    ▲
                                                </button>
                                                <button
                                                    onClick={() => moveSkill(index, 'down')}
                                                    disabled={index === skills.length - 1}
                                                    className="rounded hover:bg-surface-variant p-0.5 text-[10px] text-secondary hover:text-primary disabled:opacity-20"
                                                >
                                                    ▼
                                                </button>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                {editingId === skill.id ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={editingValue}
                                                            onChange={(e) => setEditingValue(e.target.value)}
                                                            onKeyPress={(e) => e.key === 'Enter' && handleUpdateSkill(skill.id)}
                                                            className="w-full min-w-0 rounded border border-primary bg-background px-2 py-1 text-sm text-on-background focus:outline-none"
                                                            autoFocus
                                                        />
                                                        <button
                                                            onClick={() => handleUpdateSkill(skill.id)}
                                                            className="text-green-500 hover:text-green-400"
                                                        >
                                                            ✓
                                                        </button>
                                                        <button
                                                            onClick={cancelEditing}
                                                            className="text-red-500 hover:text-red-400"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-mono text-sm text-on-background">
                                                            <span className="mr-2 text-primary">▹</span>
                                                            {skill.name}
                                                        </span>
                                                        <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                                            <button
                                                                onClick={() => startEditing(skill)}
                                                                className="rounded p-1.5 text-secondary hover:bg-primary/10 hover:text-primary"
                                                                title="Edit"
                                                            >
                                                                ✎
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteSkill(skill.id)}
                                                                className="rounded p-1.5 text-secondary hover:bg-red-500/10 hover:text-red-500"
                                                                title="Delete"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview Sidebar */}
                <div className="space-y-6">
                    <div className="sticky top-24 rounded-xl border border-surface-variant bg-surface/30 p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-secondary">
                            Live Preview
                        </h3>
                        <div className="rounded-lg border border-primary/10 bg-background p-6 shadow-lg">
                            <div className="flex flex-wrap gap-x-8 gap-y-2">
                                {skills.map((skill) => (
                                    <div key={skill.id} className="font-mono text-sm text-secondary">
                                        <span className="mr-2 text-primary">▹</span>
                                        {skill.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
                            <div className="flex gap-3">
                                <span className="text-xl">💡</span>
                                <p className="text-sm text-secondary">
                                    <strong className="text-on-background">Tip:</strong> Keep your skills relevant to the roles you're applying for. Quality over quantity!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
