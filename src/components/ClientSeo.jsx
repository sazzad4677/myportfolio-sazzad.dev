'use client';

import { useEffect } from 'react';
import contentManager from '@/lib/contentManager';

export default function ClientSeo() {
    useEffect(() => {
        // Initial load
        updateMetaTags();

        // Listen for storage changes (when updated from admin)
        window.addEventListener('storage', updateMetaTags);

        // Custom event for immediate updates within same tab
        window.addEventListener('seo-update', updateMetaTags);

        return () => {
            window.removeEventListener('storage', updateMetaTags);
            window.removeEventListener('seo-update', updateMetaTags);
        };
    }, []);

    const updateMetaTags = () => {
        const seo = contentManager.getSeo();
        if (!seo) return;

        // Update Title
        if (seo.title) document.title = seo.title;

        // Update Meta Tags
        updateMeta('description', seo.description);
        updateMeta('keywords', seo.keywords);
        updateMeta('author', seo.author);

        // Open Graph
        updateMeta('og:title', seo.title);
        updateMeta('og:description', seo.description);

        // Twitter
        updateMeta('twitter:title', seo.title);
        updateMeta('twitter:description', seo.description);
        // updateMeta('twitter:creator', seo.twitterHandle); // Removed as we switched to LinkedIn
    };

    const updateMeta = (name, content) => {
        if (!content) return;

        // Try name or property (for OG tags)
        let element = document.querySelector(`meta[name="${name}"]`) ||
            document.querySelector(`meta[property="${name}"]`);

        if (!element) {
            element = document.createElement('meta');
            if (name.startsWith('og:')) {
                element.setAttribute('property', name);
            } else {
                element.setAttribute('name', name);
            }
            document.head.appendChild(element);
        }

        element.setAttribute('content', content);
    };

    return null; // This component renders nothing visible
}
