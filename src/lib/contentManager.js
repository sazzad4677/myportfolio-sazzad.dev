// Content Manager - Handles all CRUD operations for portfolio content
// Uses localStorage for data persistence

import { defaultContent } from './defaultContent';

const STORAGE_KEY = 'portfolio_content';

class ContentManager {
    constructor() {
        if (typeof window !== 'undefined') {
            this.initializeContent();
        }
    }

    // Initialize content from localStorage or use defaults
    initializeContent() {
        if (typeof window === 'undefined') return;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) {
                this.saveAllContent(defaultContent);
            }
        } catch (error) {
            console.error('Error initializing content:', error);
        }
    }

    // Get all content
    getAllContent() {
        if (typeof window === 'undefined') return defaultContent;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : defaultContent;
        } catch (error) {
            console.error('Error getting content:', error);
            return defaultContent;
        }
    }

    // Save all content
    saveAllContent(content) {
        if (typeof window === 'undefined') return content;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
            return content;
        } catch (error) {
            console.error('Error saving content:', error);
            return content;
        }
    }

    // Hero Section
    getHero() {
        return this.getAllContent().hero;
    }

    updateHero(heroData) {
        const content = this.getAllContent();
        content.hero = { ...content.hero, ...heroData };
        return this.saveAllContent(content);
    }

    // About Section
    getAbout() {
        return this.getAllContent().about;
    }

    updateAbout(aboutData) {
        const content = this.getAllContent();
        content.about = { ...content.about, ...aboutData };
        return this.saveAllContent(content);
    }

    // Skills
    getSkills() {
        return this.getAllContent().skills;
    }

    addSkill(skillName) {
        const content = this.getAllContent();
        const newId = Math.max(...content.skills.map(s => s.id), 0) + 1;
        content.skills.push({ id: newId, name: skillName });
        return this.saveAllContent(content);
    }

    updateSkill(skillId, skillName) {
        const content = this.getAllContent();
        const skillIndex = content.skills.findIndex(s => s.id === skillId);
        if (skillIndex !== -1) {
            content.skills[skillIndex].name = skillName;
            return this.saveAllContent(content);
        }
        return content;
    }

    deleteSkill(skillId) {
        const content = this.getAllContent();
        content.skills = content.skills.filter(s => s.id !== skillId);
        return this.saveAllContent(content);
    }

    reorderSkills(skills) {
        const content = this.getAllContent();
        content.skills = skills;
        return this.saveAllContent(content);
    }

    // Projects
    getProjects() {
        return this.getAllContent().projects;
    }

    getProject(projectId) {
        const projects = this.getProjects();
        return projects.find(p => p.id === projectId);
    }

    addProject(projectData) {
        const content = this.getAllContent();
        const newId = Math.max(...content.projects.map(p => p.id), 0) + 1;
        const newProject = {
            id: newId,
            title: projectData.title || '',
            description: projectData.description || '',
            technologies: projectData.technologies || [],
            links: projectData.links || { github: '', external: '' },
            image: projectData.image || { url: '' },
            featured: projectData.featured || false
        };
        content.projects.push(newProject);
        return this.saveAllContent(content);
    }

    updateProject(projectId, projectData) {
        const content = this.getAllContent();
        const projectIndex = content.projects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
            content.projects[projectIndex] = {
                ...content.projects[projectIndex],
                ...projectData,
                id: projectId // Ensure ID doesn't change
            };
            return this.saveAllContent(content);
        }
        return content;
    }

    deleteProject(projectId) {
        const content = this.getAllContent();
        content.projects = content.projects.filter(p => p.id !== projectId);
        return this.saveAllContent(content);
    }

    // Experience
    getExperience() {
        return this.getAllContent().experience;
    }

    getJob(jobId) {
        const experience = this.getExperience();
        return experience.find(j => j.id === jobId);
    }

    addJob(jobData) {
        const content = this.getAllContent();
        const newId = Math.max(...content.experience.map(j => j.id), 0) + 1;
        const newJob = {
            id: newId,
            company: jobData.company || '',
            name: jobData.name || '',
            position: jobData.position || '',
            range: jobData.range || '',
            website: jobData.website || '',
            description: jobData.description || []
        };
        content.experience.push(newJob);
        return this.saveAllContent(content);
    }

    updateJob(jobId, jobData) {
        const content = this.getAllContent();
        const jobIndex = content.experience.findIndex(j => j.id === jobId);
        if (jobIndex !== -1) {
            content.experience[jobIndex] = {
                ...content.experience[jobIndex],
                ...jobData,
                id: jobId // Ensure ID doesn't change
            };
            return this.saveAllContent(content);
        }
        return content;
    }

    deleteJob(jobId) {
        const content = this.getAllContent();
        content.experience = content.experience.filter(j => j.id !== jobId);
        return this.saveAllContent(content);
    }

    // Contact
    getContact() {
        return this.getAllContent().contact;
    }

    updateContact(contactData) {
        const content = this.getAllContent();
        content.contact = { ...content.contact, ...contactData };
        return this.saveAllContent(content);
    }

    // Media Library
    getMedia() {
        const content = this.getAllContent();
        return content.media || [];
    }

    addMedia(mediaItem) {
        const content = this.getAllContent();
        if (!content.media) content.media = [];

        const newId = Math.max(...content.media.map(m => m.id), 0) + 1;
        const newMedia = {
            id: newId,
            url: mediaItem.url,
            name: mediaItem.name || 'Untitled',
            type: mediaItem.type || 'url', // 'url' or 'base64'
            date: new Date().toISOString()
        };

        content.media.unshift(newMedia); // Add to beginning
        return this.saveAllContent(content);
    }

    deleteMedia(mediaId) {
        const content = this.getAllContent();
        if (!content.media) return content;

        content.media = content.media.filter(m => m.id !== mediaId);
        return this.saveAllContent(content);
    }

    // SEO Manager
    getSeo() {
        const content = this.getAllContent();
        return content.seo || {
            title: 'Sazzad - Frontend Developer',
            description: 'Portfolio of Sazzad, a Frontend Developer & Software Engineer.',
            keywords: 'frontend, developer, react, next.js, portfolio',
            author: 'Md Sazzad Hossain',
            linkedin: 'https://linkedin.com/in/sazzad'
        };
    }

    updateSeo(seoData) {
        const content = this.getAllContent();
        content.seo = { ...content.seo, ...seoData };
        const result = this.saveAllContent(content);

        // Dispatch event for ClientSeo to pick up changes immediately
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('seo-update'));
        }

        return result;
    }

    // Utility methods
    exportContent() {
        return JSON.stringify(this.getAllContent(), null, 2);
    }

    importContent(jsonString) {
        try {
            const content = JSON.parse(jsonString);
            return this.saveAllContent(content);
        } catch (error) {
            console.error('Invalid JSON format:', error);
            return null;
        }
    }

    resetToDefaults() {
        return this.saveAllContent(defaultContent);
    }
}

// Create a singleton instance
const contentManager = new ContentManager();

export default contentManager;
