import '../src/index.css';
import '../src/App.css';
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
    title: 'Sazzad',
    description: 'Portfolio of Sazzad',
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
