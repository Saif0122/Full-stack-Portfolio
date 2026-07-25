'use client';

import React, { useState } from 'react';
import { AdminLayout, FormBuilder, FormField, ConfirmDialog } from '@/components/admin/ui';

export default function PortfolioManagementPage() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [notification, setNotification] = useState<string | null>(null);

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
          { name: 'headline', label: 'Primary Hero Headline', type: 'text', defaultValue: 'Principal Software Architect & Full-Stack MERN Engineer', required: true },
          { name: 'subtext', label: 'Hero Subtitle Text', type: 'textarea', defaultValue: 'Architecting next-generation AI platforms, immersive 3D digital storefronts, and ultra-scalable production systems.', required: true },
          { name: 'ctaText', label: 'Primary Call To Action Button', type: 'text', defaultValue: 'Explore Store Studio & SaaS Ecosystem' },
          { name: 'enable3d', label: 'Interactive 3D Background Visualizer', type: 'boolean', defaultValue: true }
        ];
      case 'skills':
        return [
          { name: 'coreTech', label: 'Core Architecture Technologies', type: 'tags', defaultValue: ['Next.js 16', 'React Three Fiber', 'MERN Stack', 'TypeScript', 'MongoDB', 'Gemini AI', 'TailwindCSS', 'GSAP'] },
          { name: 'aiTools', label: 'AI & Machine Learning Ecosystem', type: 'tags', defaultValue: ['Google GenAI SDK', 'LangChain', 'OpenAI', 'Autonomous Agents', 'Vector Embeddings'] },
          { name: 'cloudDevops', label: 'DevOps & Enterprise Infrastructure', type: 'tags', defaultValue: ['Docker', 'Kubernetes', 'AWS EC2', 'Vercel Edge', 'Strict CSP Security', 'Redis'] }
        ];
      case 'statistics':
        return [
          { name: 'commits', label: 'Total GitHub Commits Tracked', type: 'number', defaultValue: 14820 },
          { name: 'projectsDeployed', label: 'Enterprise Projects Completed', type: 'number', defaultValue: 48 },
          { name: 'awards', label: 'Design & Architecture Recognition Awards', type: 'number', defaultValue: 14 },
          { name: 'uptime', label: 'Average Platform Service Uptime (%)', type: 'number', defaultValue: 99.99 }
        ];
      default:
        return [
          { name: 'title', label: `${sections.find(s => s.id === activeSection)?.label} Section Title`, type: 'text', defaultValue: `Explore My ${sections.find(s => s.id === activeSection)?.label}` },
          { name: 'content', label: 'Section Content & Markdown Payload', type: 'textarea', defaultValue: 'Production-ready architecture engineered with high performance and clean modular code design.' },
          { name: 'isPublic', label: 'Publish Section to Public Portfolio', type: 'boolean', defaultValue: true }
        ];
    }
  };

  const handleSave = async (formData: Record<string, any>) => {
    // Send configuration update to clean architecture setting service
    await fetch('/api/settings/portfolio_' + activeSection, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'portfolio_' + activeSection, value: formData, group: 'portfolio' })
    });
    setNotification(`Successfully synchronized [${activeSection.toUpperCase()}] portfolio configurations across edge cluster!`);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 block mb-1">Content Engine CMS</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Portfolio Management</h1>
        </div>
        {notification && (
          <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-mono text-xs animate-in fade-in">
            ✓ {notification}
          </div>
        )}
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
        <FormBuilder
          title={`Edit ${sections.find(s => s.id === activeSection)?.label}`}
          description={sections.find(s => s.id === activeSection)?.desc}
          fields={getFormFields()}
          onSubmit={handleSave}
          submitLabel="Deploy Section Changes to Edge"
        />
      </div>
    </AdminLayout>
  );
}
