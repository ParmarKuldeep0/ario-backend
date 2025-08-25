import "./globals.css";
import Header from "./components/Header";
import logo from '../../public/logo.png'
import Footer from "./components/footer";
import Loader from "./components/loader/loader";
import EmailFloat from "./components/whatsapp";

export const metadata = {
  title: "Ario Shipping & Logistics | Global Freight Forwarding & Customs Clearance",
  description: "Ario Shipping & Logistics offers trusted Freight Forwarding (FCL/LCL – Sea & Air), Coastal Movement, Customs Clearance, Transportation, Marine Insurance & DAP/DDP shipments. Your dedicated logistics partner for transparent global trade solutions.",
  keywords: [
    'shipping and logistics company India',
    'freight forwarding services',
    "FCL LCL shipping",
    'customs clearance India', 
    'coastal cargo movement', 
    'marine insurance',
    'DDP shipments',
    'DAP shipments',
    'logistics partner Mumbai', 
    'international shipping India',
    'air freight services',
    'sea freight services',
    'supply chain solutions',
    'cargo insurance',
    'import export logistics'
  ],
  authors: [{ name: "Ario Shipping & Logistics" }],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: [
      { url: '/logo.png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png' }
    ],
  },
  openGraph: {
    title: "Ario Shipping & Logistics | Global Freight Forwarding Experts",
    description: "Trusted logistics partner offering FCL/LCL shipping, customs clearance, marine insurance, and end-to-end supply chain solutions for global trade.",
    url: "https://arioshipping.com/",
    siteName: "Ario Shipping & Logistics",
    images: [
      {
        url: "/og-image.png", // Consider creating a dedicated OG image
        width: 1200,
        height: 630,
        alt: "Ario Shipping & Logistics - Your Global Trade Partner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ario Shipping & Logistics | Global Freight Forwarding",
    description: "Expert logistics solutions: FCL/LCL shipping, customs clearance, marine insurance & global supply chain management.",
    images: ["/twitter-image.png"], // Consider creating a dedicated Twitter image
    site: "@arioshipping", // Add your actual Twitter handle
  },
  metadataBase: new URL("https://arioshipping.com/"),
  alternates: {
    canonical: "/",
  },
};

// JSON-LD Structured Data for better SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ShippingCompany',
  name: 'Ario Shipping & Logistics',
  url: 'https://arioshipping.com/',
  logo: 'https://arioshipping.com/logo.png',
  description: 'Global shipping and logistics solutions provider specializing in freight forwarding, customs clearance, and supply chain management.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '', // Add your actual address
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '', // Add your postal code
    addressCountry: 'IN'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '', // Add your phone number
    contactType: 'customer service',
    email: '', // Add your email
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi']
  },
  sameAs: [
    // Add your social media profiles
  ],
  serviceType: [
    'Freight Forwarding',
    'Customs Clearance',
    'Marine Insurance',
    'Logistics Management',
    'Supply Chain Solutions'
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Loader>
          <Header />
          {children}
          <EmailFloat />
          <Footer className="h-20 bg-gray-100" />
        </Loader>
      </body>
    </html>
  );
}