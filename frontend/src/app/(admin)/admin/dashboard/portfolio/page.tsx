'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout, FormBuilder, FormField } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';

export default function PortfolioManagementPage() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: sectionData, isLoading } = useQuery({
    queryKey: ['portfolio', activeSection],
    queryFn: () => adminService.fetch('/settings/portfolio_' + activeSection)
      .then(res => res?.value || null)
      .catch(() => null)
  });

  const saveMutation = useMutation({
    mutationFn: async (formData: Record<string, any>) => {
      try {
        await adminService.update('/settings', 'portfolio_' + activeSection, {
          key: 'portfolio_' + activeSection,
          value: formData,
          group: 'portfolio'
        });
      } catch (err) {
        await adminService.create('/settings', {
          key: 'portfolio_' + activeSection,
          value: formData,
          group: 'portfolio'
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio', activeSection] });
      toast(`Successfully synchronized [${activeSection.toUpperCase()}] portfolio configurations!`, 'success');
    },
    onError: () => toast(`Failed to save [${activeSection.toUpperCase()}] configurations`, 'error')
  });

  const sections = [
    { id: 'hero', label: 'Hero & Headlines', desc: 'Main interactive 3D landing title, professional headline, and CTAs.' },
    { id: 'about', label: 'About & Bio', desc: 'Executive biography, architect profile, and core philosophy.' },
    { id: 'skills', label: 'Skills & Tech Stack', desc: 'MERN stack technologies, AI framework proficiency, and Cloud DevOps tools.' },
    { id: 'experience', label: 'Work Experience', desc: 'Enterprise career timeline, architectural positions, and major achievements.' },
    { id: 'resume', label: 'Resume & CV File', desc: 'Downloadable PDF link, versioning tag, and distribution controls.' },
    { id: 'contact', label: 'Contact & Socials', desc: 'Direct email, GitHub, Twitter/X, LinkedIn, and scheduling links.' },
    { id: 'testimonials', label: 'Testimonials & Reviews', desc: 'Client endorsements, peer feedback, and executive recommendations.' },
    { id: 'statistics', label: 'Live Statistics Counter', desc: 'GitHub commits, lines of code written, awards, and deployed applications.' },
    { id: 'timeline', label: 'Future Roadmap Timeline', desc: 'Upcoming releases, phase evolutions, and AI research goals.' }
  ];

  const getFormFields = (): FormField[] => {
    switch (activeSection) {
      case 'hero':
        return [
          { name: 'headline', label: 'Primary Hero Headline', type: 'text', defaultValue: sectionData?.headline ?? 'Principal Software Architect & Full-Stack MERN Engineer', required: true },
          { name: 'subtext', label: 'Hero Subtitle Text', type: 'textarea', defaultValue: sectionData?.subtext ?? 'Architecting next-generation AI platforms, immersive 3D digital storefronts, and ultra-scalable production systems.', required: true },
          { name: 'ctaText', label: 'Primary Call To Action Button', type: 'text', defaultValue: sectionData?.ctaText ?? 'Explore Store Studio & SaaS Ecosystem' },
          { name: 'enable3d', label: 'Interactive 3D Background Visualizer', type: 'boolean', defaultValue: sectionData?.enable3d ?? true }
        ];
      case 'skills':
        return [
          { name: 'coreTech', label: 'Core Architecture Technologies', type: 'tags', defaultValue: sectionData?.coreTech ?? ['Next.js 16', 'React Three Fiber', 'MERN Stack', 'TypeScript', 'MongoDB', 'Gemini AI', 'TailwindCSS', 'GSAP'] },
          { name: 'aiTools', label: 'AI & Machine Learning Ecosystem', type: 'tags', defaultValue: sectionData?.aiTools ?? ['Google GenAI SDK', 'LangChain', 'OpenAI', 'Autonomous Agents', 'Vector Embeddings'] },
          { name: 'cloudDevops', label: 'DevOps & Enterprise Infrastructure', type: 'tags', defaultValue: sectionData?.cloudDevops ?? ['Docker', 'Kubernetes', 'AWS EC2', 'Vercel Edge', 'Strict CSP Security', 'Redis'] }
        ];
      case 'statistics':
        return [
          { name: 'commits', label: 'Total GitHub Commits Tracked', type: 'number', defaultValue: sectionData?.commits ?? 14820 },
          { name: 'projectsDeployed', label: 'Enterprise Projects Completed', type: 'number', defaultValue: sectionData?.projectsDeployed ?? 48 },
          { name: 'awards', label: 'Design & Architecture Recognition Awards', type: 'number', defaultValue: sectionData?.awards ?? 14 },
          { name: 'uptime', label: 'Average Platform Service Uptime (%)', type: 'number', defaultValue: sectionData?.uptime ?? 99.99 }
        ];
      default:
        return [
          { name: 'title', label: `${sections.find(s => s.id === activeSection)?.label} Section Title`, type: 'text', defaultValue: sectionData?.title ?? `Explore My ${sections.find(s => s.id === activeSection)?.label}` },
          { name: 'content', label: 'Section Content & Markdown Payload', type: 'textarea', defaultValue: sectionData?.content ?? 'Production-ready architecture engineered with high performance and clean modular code design.' },
          { name: 'isPublic', label: 'Publish Section to Public Portfolio', type: 'boolean', defaultValue: sectionData?.isPublic ?? true }
        ];
    }
  };

  const handleSave = (formData: Record<string, any>) => {
    saveMutation.mutate(formData);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 block mb-1">Content Engine CMS</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Portfolio Management</h1>
        </div>
      </div>

      {/* Navigation Tabs Stream */}
      <div className="flex flex-wrap gap-2 pb-4">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-4 py-2.5 rounded-2xl font-mono text-xs transition-all duration-200 ${
              activeSection === sec.id
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/20 scale-105'
                : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Editor Surface */}
      <div className="mt-4">
        {isLoading ? (
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl flex items-center justify-center min-h-[400px]">
            <span className="text-gray-400 font-mono text-sm animate-pulse">Synchronizing Data Payload...</span>
          </div>
        ) : (
          <FormBuilder
            key={activeSection + (sectionData ? '_loaded' : '_new')}
            title={`Edit ${sections.find(s => s.id === activeSection)?.label}`}
            description={sections.find(s => s.id === activeSection)?.desc}
            fields={getFormFields()}
            onSubmit={handleSave}
            isSubmitting={saveMutation.isPending}
            submitLabel="Deploy Section Changes to Edge"
          />
        )}
      </div>
    </AdminLayout>
  );
}
