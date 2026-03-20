import { ReactNode } from 'react';

interface StructuredDataProps {
    children?: ReactNode;
}

export default function StructuredData({ children }: StructuredDataProps) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anjanex.com';

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Anjanex',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description:
            'We partner with startups to design, develop, and launch digital products that drive real growth - Web, Mobile, AI, and beyond.',
        sameAs: [
            "https://x.com/anjanexofficial",
            "https://www.instagram.com/anjanexofficial/",
            "mailto:one@anjanex.com",
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-7977933565',
            contactType: 'Customer Service',
        },
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN',
            addressLocality: 'India',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            {children}
        </>
    );
}
