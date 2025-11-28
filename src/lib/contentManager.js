// Content Manager - Handles all CRUD operations for portfolio content
// Uses MongoDB via API for data persistence

import { defaultContent } from './defaultContent';

class ContentManager {
    constructor() {
        this.content = defaultContent;
        this.listeners = new Set();
        this.initialized = false;

        if (typeof window !== 'undefined') {
            this.initializeContent();
        }
    }

    get isInitialized() {
        return this.initialized;
    }

    // Initialize content from API
    async initializeContent() {
        if (typeof window === 'undefined') return;

        try {
            const response = await fetch(`/api/portfolio?t=${Date.now()}`, { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                this.content = data;
                this.initialized = true;
                this.notifyListeners();
            } else {
                console.error('Failed to fetch initial content');
            }
        } catch (error) {
            console.error('Error initializing content:', error);
        }
    }

    // Subscribe to changes
    subscribe(listener) {
        this.listeners.add(listener);
        // Call immediately with current content
        listener(this.content);
        return () => this.listeners.delete(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.content));
        // Also dispatch window event for legacy support if needed
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('seo-update'));
        }
    }

    // Get all content (synchronous accessor for current state)
    getAllContent() {
        return this.content;
    }

    // Save all content
    async saveAllContent(newContent) {
        // Optimistic update
        this.content = newContent;
        this.notifyListeners();

        try {
            const response = await fetch('/api/portfolio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContent),
            });

            if (!response.ok) {
                throw new Error('Failed to save content');
            }

            const savedData = await response.json();
            // Update with server response to ensure consistency (e.g. IDs)
            this.content = savedData;
            this.notifyListeners();
            return savedData;
        } catch (error) {
            console.error('Error saving content:', error);
            throw error;
        }
    }

    // Hero Section
    getHero() {
        return this.getAllContent().hero || defaultContent.hero;
    }

    async updateHero(heroData) {
        const content = { ...this.getAllContent() };
        content.hero = { ...content.hero, ...heroData };
        return this.saveAllContent(content);
    }

    // About Section
    getAbout() {
        return this.getAllContent().about || defaultContent.about;
    }

    async updateAbout(aboutData) {
        const content = { ...this.getAllContent() };
        content.about = { ...content.about, ...aboutData };
        return this.saveAllContent(content);
    }

    // Skills
    getSkills() {
        return this.getAllContent().skills || [];
    }

    async addSkill(skillName) {
        const content = { ...this.getAllContent() };
        const skills = content.skills || [];
        const newId = Math.max(...skills.map(s => s.id), 0) + 1;

        if (!content.skills) content.skills = [];
        content.skills.push({ id: newId, name: skillName });

        return this.saveAllContent(content);
    }

    async updateSkill(skillId, skillName) {
        const content = { ...this.getAllContent() };
        if (!content.skills) return content;

        const skillIndex = content.skills.findIndex(s => s.id === skillId);
        if (skillIndex !== -1) {
            content.skills[skillIndex].name = skillName;
            return this.saveAllContent(content);
        }
        return content;
    }

    async deleteSkill(skillId) {
        const content = { ...this.getAllContent() };
        if (!content.skills) return content;

        content.skills = content.skills.filter(s => s.id !== skillId);
        return this.saveAllContent(content);
    }

    async reorderSkills(skills) {
        const content = { ...this.getAllContent() };
        content.skills = skills;
        return this.saveAllContent(content);
    }

    // Projects
    getProjects() {
        return this.getAllContent().projects || [];
    }

    getProject(projectId) {
        const projects = this.getProjects();
        return projects.find(p => p.id === projectId);
    }

    async addProject(projectData) {
        const content = { ...this.getAllContent() };
        const projects = content.projects || [];
        const newId = Math.max(...projects.map(p => p.id), 0) + 1;

        const newProject = {
            id: newId,
            title: projectData.title || '',
            description: projectData.description || '',
            technologies: projectData.technologies || [],
            links: projectData.links || { github: '', external: '', admin: '' },
            image: projectData.image || { url: '' },
            featured: projectData.featured || false
        };

        if (!content.projects) content.projects = [];
        content.projects.push(newProject);
        return this.saveAllContent(content);
    }

    async updateProject(projectId, projectData) {
        const content = { ...this.getAllContent() };
        if (!content.projects) return content;

        const projectIndex = content.projects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
            content.projects[projectIndex] = {
                ...content.projects[projectIndex],
                ...projectData,
                id: projectId
            };
            return this.saveAllContent(content);
        }
        return content;
    }

    async deleteProject(projectId) {
        const content = { ...this.getAllContent() };
        if (!content.projects) return content;

        content.projects = content.projects.filter(p => p.id !== projectId);
        return this.saveAllContent(content);
    }

    // Experience
    getExperience() {
        return this.getAllContent().experience || [];
    }

    getJob(jobId) {
        const experience = this.getExperience();
        return experience.find(j => j.id === jobId);
    }

    async addJob(jobData) {
        const content = { ...this.getAllContent() };
        const experience = content.experience || [];
        const newId = Math.max(...experience.map(j => j.id), 0) + 1;

        const newJob = {
            id: newId,
            company: jobData.company || '',
            name: jobData.name || '',
            position: jobData.position || '',
            range: jobData.range || '',
            website: jobData.website || '',
            description: jobData.description || []
        };

        if (!content.experience) content.experience = [];
        content.experience.push(newJob);
        return this.saveAllContent(content);
    }

    async updateJob(jobId, jobData) {
        const content = { ...this.getAllContent() };
        if (!content.experience) return content;

        const jobIndex = content.experience.findIndex(j => j.id === jobId);
        if (jobIndex !== -1) {
            content.experience[jobIndex] = {
                ...content.experience[jobIndex],
                ...jobData,
                id: jobId
            };
            return this.saveAllContent(content);
        }
        return content;
    }

    async deleteJob(jobId) {
        const content = { ...this.getAllContent() };
        if (!content.experience) return content;

        content.experience = content.experience.filter(j => j.id !== jobId);
        return this.saveAllContent(content);
    }

    // Contact
    getContact() {
        return this.getAllContent().contact || defaultContent.contact;
    }

    async updateContact(contactData) {
        const content = { ...this.getAllContent() };
        content.contact = { ...content.contact, ...contactData };
        return this.saveAllContent(content);
    }

    // Media Library
    getMedia() {
        const content = this.getAllContent();
        return content.media || [];
    }

    async addMedia(mediaItem) {
        const content = { ...this.getAllContent() };
        if (!content.media) content.media = [];

        const newId = Math.max(...content.media.map(m => m.id), 0) + 1;
        const newMedia = {
            id: newId,
            url: mediaItem.url,
            name: mediaItem.name || 'Untitled',
            type: mediaItem.type || 'url',
            date: new Date().toISOString()
        };

        content.media.unshift(newMedia);
        return this.saveAllContent(content);
    }

    async deleteMedia(mediaId) {
        const content = { ...this.getAllContent() };
        if (!content.media) return content;

        content.media = content.media.filter(m => m.id !== mediaId);
        return this.saveAllContent(content);
    }

    // SEO
    getSeo() {
        return this.getAllContent().seo || {
            title: '',
            description: '',
            keywords: '',
            author: '',
            linkedin: ''
        };
    }

    async updateSeo(seoData) {
        const content = { ...this.getAllContent() };
        content.seo = { ...content.seo, ...seoData };
        return this.saveAllContent(content);
    }

    // Theme Management
    getTheme() {
        return this.getAllContent().theme || {
            defaultTheme: 'system',
            customThemes: []
        };
    }

    async updateDefaultTheme(themeName) {
        const content = { ...this.getAllContent() };
        if (!content.theme) {
            content.theme = { defaultTheme: 'system', customThemes: [] };
        }
        console.log('Updating default theme to:', themeName);
        console.log('Current theme config before update:', content.theme);
        content.theme.defaultTheme = themeName;
        console.log('Theme config after update:', content.theme);
        const result = await this.saveAllContent(content);
        console.log('Save result:', result.theme);
        return result;
    }

    async addCustomTheme(theme) {
        const content = { ...this.getAllContent() };
        if (!content.theme) {
            content.theme = { defaultTheme: 'system', customThemes: [] };
        }
        if (!content.theme.customThemes) {
            content.theme.customThemes = [];
        }

        const newId = Date.now().toString();
        const newTheme = {
            id: newId,
            name: theme.name,
            colors: theme.colors,
            createdAt: new Date()
        };

        content.theme.customThemes.push(newTheme);
        return this.saveAllContent(content);
    }

    async updateCustomTheme(themeId, themeData) {
        const content = { ...this.getAllContent() };
        if (!content.theme || !content.theme.customThemes) return content;

        const themeIndex = content.theme.customThemes.findIndex(t => t.id === themeId);
        if (themeIndex !== -1) {
            content.theme.customThemes[themeIndex] = {
                ...content.theme.customThemes[themeIndex],
                ...themeData,
                id: themeId
            };
            return this.saveAllContent(content);
        }
        return content;
    }

    async deleteCustomTheme(themeId) {
        const content = { ...this.getAllContent() };
        if (!content.theme || !content.theme.customThemes) return content;

        content.theme.customThemes = content.theme.customThemes.filter(t => t.id !== themeId);
        return this.saveAllContent(content);
    }
}

// Create and export a singleton instance
const contentManager = new ContentManager();
export default contentManager;
