import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/constants/projects';
import { ProjectMetricsGrid } from '@/components/Projects/ProjectMetricsGrid';
import { TechBadge } from '@/components/Projects/TechBadge';

// Future: This would be dynamic via MongoDB: async ({ params }: { params: { slug: string } }) => ...
export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find(p => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 selection:bg-primary/30 selection:text-primary">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16 relative">
        <Link href="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 text-xs font-mono uppercase tracking-widest">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Projects
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2">
            <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] block mb-4 border border-primary/20 bg-primary/5 px-3 py-1 rounded-full w-fit">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter mb-6 uppercase">
              {project.title}
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
              {project.description}
            </p>
            
            <div className="flex gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all">
                  View Live Site
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/5 text-white border border-white/10 font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                  Source Code
                </a>
              )}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <Image src={project.image} width={1200} height={800} alt={project.title} className="w-full h-full object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <ProjectMetricsGrid metrics={project.metrics} />
        </section>
      )}

      {/* 3. Deep Dive Content */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* The Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-primary text-xs font-black uppercase tracking-widest mb-4">The Challenge</h3>
                <p className="text-gray-400 font-light leading-relaxed">{project.challenges.problem}</p>
              </div>
              <div>
                <h3 className="text-purple-400 text-xs font-black uppercase tracking-widest mb-4">The Solution</h3>
                <p className="text-gray-400 font-light leading-relaxed">{project.challenges.solution}</p>
              </div>
            </div>

            {/* Markdown Content Block */}
            {project.markdownContent && (
              <div className="prose prose-invert prose-p:text-gray-400 prose-headings:text-white prose-a:text-primary max-w-none">
                {/* Future: Replaced with an actual MDX/Markdown renderer like next-mdx-remote */}
                <div dangerouslySetInnerHTML={{ __html: project.markdownContent.replace(/\n/g, '<br />') }} />
              </div>
            )}

            {/* Media Gallery */}
            {project.mediaGallery && project.mediaGallery.length > 0 && (
              <div>
                <h3 className="text-white text-xs font-black uppercase tracking-widest mb-6">Gallery & Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.mediaGallery.map((media, idx) => (
                    <div key={idx} className="aspect-video rounded-2xl overflow-hidden border border-white/10 group relative">
                       {media.type === 'image' && (
                         <Image src={media.url} width={600} height={400} alt={media.caption || 'Project media'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                       )}
                       {media.caption && (
                         <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-3 text-xs text-gray-300 font-mono">
                           {media.caption}
                         </div>
                       )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Tech Stack */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl sticky top-32">
              <h3 className="text-primary text-xs font-black uppercase tracking-widest mb-6">Technology Stack</h3>
              <div className="flex flex-col gap-4">
                {project.stack.map((tech, idx) => (
                  <TechBadge key={idx} tech={tech} />
                ))}
              </div>
            </div>

            {/* Technical Specs Summary */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <h3 className="text-white text-xs font-black uppercase tracking-widest mb-6">System Blueprint</h3>
              <ul className="space-y-4">
                <SpecItem label="Backend" value={project.technicalSpecs.backendStructure} />
                <SpecItem label="Database" value={project.technicalSpecs.databaseSchema} />
                <SpecItem label="Scaling" value={project.technicalSpecs.scalingStrategy} />
                <SpecItem label="Security" value={project.technicalSpecs.securityMeasures} />
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

const SpecItem = ({ label, value }: { label: string, value: string }) => (
  <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">{label}</span>
    <span className="text-gray-300 text-sm font-light">{value}</span>
  </li>
);
