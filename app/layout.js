import '../src/index.css';
import '../src/App.css';
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
    title: {
        default: 'Sazzad - Full Stack Developer',
        template: '%s | Sazzad'
    },
    description: 'Sazzad is a passionate self-taught Full Stack web developer from Bangladesh who develops web applications, mobile applications and desktop applications.',
    keywords: ['Sazzad', 'Full Stack Developer', 'Web Developer', 'Bangladesh', 'Portfolio', 'React', 'Next.js'],
    authors: [{ name: 'Md Sazzad Hossain' }],
    creator: 'Md Sazzad Hossain',
    metadataBase: new URL('https://sazzad.dev'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sazzad.dev/',
        title: 'Md Sazzad Hossain - Full Stack Developer',
        description: 'Sazzad is a passionate self-taught Full Stack web developer from Bangladesh who develops web applications, mobile applications and desktop applications.',
        siteName: 'Sazzad Portfolio',
        images: [
            {
                url: '/banner.png',
                width: 1200,
                height: 630,
                alt: 'Sazzad - Full Stack Developer',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sazzad Hossain - Full Stack Developer',
        description: 'Sazzad is a passionate self-taught Full Stack web developer from Bangladesh who develops web applications, mobile applications and desktop applications.',
        creator: '@Sazzad',
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
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-background text-on-surface overflow-x-hidden">
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
