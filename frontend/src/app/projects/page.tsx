import React from 'react';
import { Metadata } from 'next';
import { getProjectsData } from '@/services/cms.server';
import { ProjectsClientView } from './ProjectsClientView';
import { generatePageMetadata } from '@/lib/seo/helpers';
import { resolveProjectsSeo } from '@/lib/seo/service';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seoOpts = await resolveProjectsSeo();
  return generatePageMetadata(seoOpts);
}

export default async function ProjectsPage() {
  const projects = await getProjectsData();

  return <ProjectsClientView projects={projects} />;
}

