import { Metadata } from 'next';
import Head from 'next/head';

interface DynamicLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function DynamicLayout({ children, title, description }: DynamicLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {children} 
    </>
  );
}
