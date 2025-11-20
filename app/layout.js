import '../src/index.css';
import '../src/App.css';

export const metadata = {
    title: 'Sazzad',
    description: 'Portfolio of Sazzad',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-navy text-lightSlate overflow-x-hidden">{children}</body>
        </html>
    )
}
