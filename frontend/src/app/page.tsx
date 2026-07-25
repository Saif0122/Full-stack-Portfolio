import { getPortfolioData } from '@/services/cms.server';
import HomeClient from './HomeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saiful Islam | Principal MERN Stack Architect',
  description: 'Senior MERN Stack Engineer specializing in SaaS application development and scalable web applications.',
};

export default async function Page() {
  const portfolioData = await getPortfolioData();
  
  return (
    <HomeClient initialData={portfolioData} />
  );
}
