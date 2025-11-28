'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import contentManager from '@/lib/contentManager';

export default function ProjectsManager() {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Initial load
        setProjects(contentManager.getProjects());

        // Subscribe to changes
        const unsubscribe = contentManager.subscribe((content) => {
            setProjects(content.projects || []);
        });

        return () => unsubscribe();
    }, []);

    const handleNewProject = () => {
        setCurrentProject({
            title: '',
            description: '',
            technologies: [],
            links: { github: '', external: '' },
            image: { url: '' },
            featured: true
        });
        setIsEditing(true);
    };

    const handleEditProject = (project) => {
        setCurrentProject({ ...project });
        setIsEditing(true);
    };

    const handleDeleteProject = (projectId) => {
        if (confirm('Are you sure you want to delete this project?')) {
            contentManager.deleteProject(projectId);
            showSaved();
        }
    };

    const handleSaveProject = () => {
        if (currentProject.id) {
            contentManager.updateProject(currentProject.id, currentProject);
        } else {
            contentManager.addProject(currentProject);
        }
        setIsEditing(false);
        setCurrentProject(null);
        showSaved();
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentProject(null);
    };

    const showSaved = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const updateField = (field, value) => {
        setCurrentProject(prev => ({ ...prev, [field]: value }));
    };

    const updateNestedField = (parent, field, value) => {
        setCurrentProject(prev => ({
            ...prev,
            [parent]: { ...prev[parent], [field]: value }
        }));
    };

    const addTechnology = (tech) => {
        if (tech.trim() && !currentProject.technologies.includes(tech.trim())) {
            setCurrentProject(prev => ({
                ...prev,
                technologies: [...prev.technologies, tech.trim()]
            }));
        }
    };

    const removeTechnology = (tech) => {
        setCurrentProject(prev => ({
            ...prev,
            technologies: prev.technologies.filter(t => t !== tech)
        }));
    };

    if (isEditing) {
        return <ProjectForm
            project={currentProject}
            onSave={handleSaveProject}
            onCancel={handleCancel}
            updateField={updateField}
            updateNestedField={updateNestedField}
            addTechnology={addTechnology}
            removeTechnology={removeTechnology}
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
                    <h2 className="text-2xl font-bold text-on-background">Projects Manager</h2>
                    <p className="text-sm text-secondary">Manage your portfolio projects</p>
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
                        onClick={handleNewProject}
                        className="group relative overflow-hidden rounded-lg bg-primary px-6 py-2 font-semibold tracking-wide text-background transition-all hover:bg-primary/90"
                    >
                        <span className="relative z-10">+ New Project</span>
                    </button>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {projects.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                            <span className="mb-2 text-4xl">💼</span>
                            <p className="text-secondary">No projects added yet</p>
                            <p className="text-xs text-secondary/60">Create your first project above</p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative flex flex-col overflow-hidden rounded-xl border border-surface-variant bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                            >
                                {/* Project Image */}
                                <div className="relative h-48 w-full overflow-hidden bg-surface-variant/50">
                                    {project.image?.url ? (
                                        <img
                                            src={`/images/${project.image.url}`}
                                            alt={project.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-4xl text-surface-variant">
                                            🖼️
                                        </div>
                                    )}
                                    {project.featured && (
                                        <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
                                            Featured
                                        </div>
                                    )}
                                </div>

                                {/* Project Info */}
                                <div className="flex flex-1 flex-col p-5">
                                    <h3 className="text-lg font-bold text-on-background group-hover:text-primary">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm text-secondary">
                                        {project.description}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="rounded-md bg-surface-variant/50 px-2 py-1 font-mono text-[10px] text-secondary"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="rounded-md bg-surface-variant/50 px-2 py-1 font-mono text-[10px] text-secondary">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-surface-variant/50">
                                        <div className="flex gap-3">
                                            {project.links?.github && (
                                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary">
                                                    <span className="sr-only">GitHub</span>
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                </a>
                                            )}
                                            {project.links?.external && (
                                                <a href={project.links.external} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary">
                                                    <span className="sr-only">Live Demo</span>
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditProject(project)}
                                                className="rounded p-1.5 text-secondary hover:bg-primary/10 hover:text-primary"
                                                title="Edit"
                                            >
                                                ✎
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="rounded p-1.5 text-secondary hover:bg-red-500/10 hover:text-red-500"
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
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

function ProjectForm({ project, onSave, onCancel, updateField, updateNestedField, addTechnology, removeTechnology }) {
    const [techInput, setTechInput] = useState('');

    const handleAddTech = () => {
        if (techInput.trim()) {
            addTechnology(techInput);
            setTechInput('');
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
                        {project.id ? 'Edit Project' : 'New Project'}
                    </h2>
                    <p className="text-sm text-secondary">Fill in the project details below</p>
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
                        Save Project
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Project Title *
                            </label>
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="My Awesome Project"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Description *
                            </label>
                            <textarea
                                value={project.description}
                                onChange={(e) => updateField('description', e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Describe your project..."
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-secondary">
                                Image Filename
                            </label>
                            <input
                                type="text"
                                value={project.image?.url || ''}
                                onChange={(e) => updateNestedField('image', 'url', e.target.value)}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="project-image.png"
                            />
                            <p className="mt-2 text-xs text-secondary">
                                Place your image in public/images/ and enter the filename here
                            </p>
                        </div>

                        <div className="rounded-lg border border-surface-variant bg-background/30 p-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={project.featured}
                                    onChange={(e) => updateField('featured', e.target.checked)}
                                    className="h-5 w-5 rounded border-surface-variant bg-background text-primary focus:ring-primary"
                                />
                                <label htmlFor="featured" className="cursor-pointer text-sm font-medium text-on-background">
                                    Feature this project on home page
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-secondary">
                        Technologies
                    </label>
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTech()}
                            className="flex-1 rounded-lg border border-surface-variant bg-background/50 px-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="e.g., React, Node.js..."
                        />
                        <button
                            onClick={handleAddTech}
                            className="rounded-lg bg-surface-variant px-6 py-2.5 font-medium text-on-background hover:bg-primary/10 hover:text-primary"
                        >
                            Add
                        </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 font-mono text-sm text-primary"
                            >
                                {tech}
                                <button
                                    onClick={() => removeTechnology(tech)}
                                    className="ml-1 text-primary/50 hover:text-primary"
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-secondary">
                            GitHub URL
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-2.5 text-lg">🐙</span>
                            <input
                                type="url"
                                value={project.links?.github || ''}
                                onChange={(e) => updateNestedField('links', 'github', e.target.value)}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 pl-12 pr-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-secondary">
                            Live Demo URL
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-2.5 text-lg">🔗</span>
                            <input
                                type="url"
                                value={project.links?.external || ''}
                                onChange={(e) => updateNestedField('links', 'external', e.target.value)}
                                className="w-full rounded-lg border border-surface-variant bg-background/50 pl-12 pr-4 py-2.5 text-on-background transition-all focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
