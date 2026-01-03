import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'World-Class GitHub Profile',
  description: 'AI-powered GitHub profile enhancement system for world-class developers',
  keywords: ['GitHub', 'Profile', 'Developer', 'Portfolio', 'AI'],
  authors: [{ name: 'World-Class Product Engine' }],
  openGraph: {
    title: 'World-Class GitHub Profile',
    description: 'Elevate your GitHub presence to world-class standards',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
