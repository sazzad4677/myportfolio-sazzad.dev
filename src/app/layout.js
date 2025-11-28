import '../index.css';
import '../App.css';
import { ThemeProvider } from "@/components/theme-provider"
import JsonLd from './json-ld'
import ClientSeo from "@/components/ClientSeo";
import ThemeSynchronizer from "@/components/ThemeSynchronizer";

export const metadata = {
    title: {
        default: 'Sazzad - Frontend Developer & Software Engineer',
        template: '%s | Sazzad - Frontend Developer'
    },
    description: 'Sazzad is a passionate self-taught Frontend Developer and Software Engineer from Bangladesh specializing in web applications, mobile applications, and desktop applications. Expert in React, Next.js, and modern web technologies.',
    keywords: [
        'frontend developer',
        'software engineer',
        'Sazzad',
        'Md Sazzad Hossain',
        'Full Stack Developer',
        'Web Developer',
        'React Developer',
        'Next.js Developer',
        'JavaScript Developer',
        'Bangladesh',
        'Portfolio',
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Web Development',
        'Mobile Development',
        'UI/UX',
        'Frontend Engineering'
    ],
    authors: [{ name: 'Md Sazzad Hossain', url: 'https://sazzad.dev' }],
    creator: 'Md Sazzad Hossain',
    publisher: 'Md Sazzad Hossain',
    metadataBase: new URL('https://sazzad.dev'),
    alternates: {
        canonical: 'https://sazzad.dev',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sazzad.dev/',
        title: 'Md Sazzad Hossain - Frontend Developer & Software Engineer',
        description: 'Passionate Frontend Developer and Software Engineer from Bangladesh specializing in React, Next.js, and modern web technologies. Building exceptional web applications, mobile apps, and desktop solutions.',
        siteName: 'Sazzad - Frontend Developer Portfolio',
        images: [
            {
                url: '/banner.png',
                width: 1200,
                height: 630,
                alt: 'Sazzad - Frontend Developer & Software Engineer Portfolio',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sazzad - Frontend Developer & Software Engineer',
        description: 'Passionate Frontend Developer and Software Engineer specializing in React, Next.js, and modern web technologies. Building exceptional digital experiences.',
        images: ['/banner.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
        other: [
            { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
            { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
        ],
    },
    manifest: '/manifest.json',
    category: 'technology',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <JsonLd />
            </head>
            <body className="bg-background text-on-surface overflow-x-hidden">
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ThemeSynchronizer />
                    <ClientSeo />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
