export default function JsonLd() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Md Sazzad Hossain',
        alternateName: 'Sazzad',
        url: 'https://sazzad.dev',
        image: 'https://sazzad.dev/banner.png',
        jobTitle: 'Frontend Developer & Software Engineer',
        description: 'Passionate Frontend Developer and Software Engineer from Bangladesh specializing in React, Next.js, and modern web technologies.',
        knowsAbout: [
            'Frontend Development',
            'Software Engineering',
            'React',
            'Next.js',
            'JavaScript',
            'TypeScript',
            'Web Development',
            'Mobile Development',
            'UI/UX Design',
            'Tailwind CSS'
        ],
        sameAs: [
            'https://github.com/sazzad4677/',
            'https://www.linkedin.com/in/sazzad4673/',
        ],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'Bangladesh'
        },
        worksFor: {
            '@type': 'Organization',
            name: 'MyMedicalHub International'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    );
}
