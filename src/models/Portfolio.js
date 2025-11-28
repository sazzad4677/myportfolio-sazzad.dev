import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    hero: {
        greeting: String,
        name: String,
        tagline: String,
        description: String,
        ctaText: String,
        ctaLink: String,
    },
    about: {
        paragraphs: [String],
        skillsHeading: String,
        profileImage: String,
    },
    skills: [{
        id: Number,
        name: String,
    }],
    projects: [{
        id: Number,
        title: String,
        description: String,
        technologies: [String],
        links: {
            github: String,
            external: String,
            admin: String,
        },
        image: {
            url: String,
        },
        featured: Boolean,
    }],
    experience: [{
        id: Number,
        company: String,
        name: String,
        position: String,
        range: String,
        website: String,
        description: [String],
    }],
    contact: {
        preHeading: String,
        heading: String,
        description: String,
        email: String,
        ctaText: String,
    },
    media: [{
        id: Number,
        url: String,
        name: String,
        type: String,
        date: String,
    }],
    seo: {
        title: String,
        description: String,
        keywords: String,
        author: String,
        linkedin: String,
    },
    theme: {
        defaultTheme: {
            type: String,
            default: 'system'
        },
        customThemes: [{
            id: { type: String, required: true },
            name: { type: String, required: true },
            colors: {
                primary: { type: String, required: true },
                background: { type: String, required: true },
                foreground: { type: String, required: true },
                secondary: { type: String, required: true },
                surface: String,
                surfaceVariant: String,
                onBackground: String,
                onSurface: String,
                onSurfaceVariant: String,
                shadow: String
            },
            createdAt: { type: Date, default: Date.now }
        }]
    }
}, { timestamps: true });

// Prevent recompilation of model in development, but force it if schema changed
if (process.env.NODE_ENV === 'development' && mongoose.models.Portfolio) {
    delete mongoose.models.Portfolio;
}

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
