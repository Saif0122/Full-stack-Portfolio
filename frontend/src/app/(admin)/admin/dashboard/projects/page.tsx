'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';

interface ProjectRecord {
  _id: string;
  title: string;
  slug: string;
  category: string;
  featured: boolean;
  repoUrl: string;
  demoUrl: string;
  technologies: string[];
}

export default function ProjectsManagementPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([
    { _id: '1', title: 'AI Portfolio & Enterprise Admin Platform', slug: 'ai-portfolio', category: 'SaaS Architecture', featured: true, repoUrl: 'https://github.com/Saif0122/Full-stack-Portfolio', demoUrl: 'https://saif-portfolio.dev', technologies: ['Next.js 16', 'Three.js', 'MongoDB', 'Gemini AI'] },
    { _id: '2', title: 'MERN Autonomous Storefront Engine', slug: 'mern-store', category: 'E-Commerce', featured: true, repoUrl: 'https://github.com/Saif0122', demoUrl: 'https://store.saif-ai.dev', technologies: ['MERN Stack', 'Redux', 'Stripe', 'Redis'] },
    { _id: '3', title: '3D Galaxy Glassmorphism Studio', slug: '3d-galaxy', category: 'UI/UX Design', featured: false, repoUrl: 'https://github.com/Saif0122', demoUrl: '#', technologies: ['React Three Fiber', 'GSAP', 'WebGL'] }
  ]);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/projects', { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data && data.success && data.data?.length > 0) setProjects(data.data); })
      .catch(() => {});
  }, []);

  const columns: Column<ProjectRecord>[] = [
    { header: 'Project Showcase Title', accessorKey: 'title', cell: (p) => (
      <div>
        <div className="font-bold text-white text-sm">{p.title}</div>
        <span className="text-[10px] font-mono text-indigo-400">/{p.slug}</span>
      </div>
    )},
    { header: 'Category', accessorKey: 'category', cell: (p) => (
      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-xs">{p.category}</span>
    )},
    { header: 'Tech Stack', accessorKey: 'technologies', cell: (p) => (
      <div className="flex flex-wrap gap-1 max-w-[220px]">
        {p.technologies.map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-mono">{t}</span>)}
      </div>
    )},
    { header: 'Featured State', accessorKey: 'featured', cell: (p) => (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase ${p.featured ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-400'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${p.featured ? 'bg-emerald-400' : 'bg-gray-600'}`} />
        {p.featured ? 'Featured Live' : 'Standard'}
      </span>
    )}
  ];

  const handleDelete = () => {
    if (confirmDelete) {
      setProjects(prev => prev.filter(p => p._id !== confirmDelete));
      setConfirmDelete(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 block mb-1">Architecture Directory</span>
          <h1 className="text-3xl font-black text-white tracking-tight">Projects Showcase Studio</h1>
        </div>
        {!isEditing && (
          <button
            onClick={() => { setSelectedProject(null); setIsEditing(true); }}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
          >
            + Create New Project Architecture
          </button>
        )}
      </div>

      {isEditing ? (
        <FormBuilder
          title={selectedProject ? `Edit Project: ${selectedProject.title}` : 'Register New Engineering Project'}
          description="Configure repository deployments, technology tags, and 3D preview asset attachments."
          fields={[
            { name: 'title', label: 'Project Name', type: 'text', defaultValue: selectedProject?.title || '', required: true },
            { name: 'slug', label: 'URL Slug / Route', type: 'text', defaultValue: selectedProject?.slug || '', required: true },
            { name: 'category', label: 'Domain Category', type: 'select', defaultValue: selectedProject?.category || 'SaaS Architecture', options: [{ label: 'SaaS Architecture', value: 'SaaS Architecture' }, { label: 'E-Commerce', value: 'E-Commerce' }, { label: 'UI/UX Design', value: 'UI/UX Design' }] },
            { name: 'technologies', label: 'Technology Stack & Libraries', type: 'tags', defaultValue: selectedProject?.technologies || ['Next.js', 'TypeScript', 'MongoDB'] },
            { name: 'repoUrl', label: 'GitHub Repository URL', type: 'text', defaultValue: selectedProject?.repoUrl || '' },
            { name: 'demoUrl', label: 'Live Demo Web URL', type: 'text', defaultValue: selectedProject?.demoUrl || '' },
            { name: 'featured', label: 'Pin to Front Page Hero Showcase', type: 'boolean', defaultValue: selectedProject?.featured || false }
          ]}
          onCancel={() => setIsEditing(false)}
          onSubmit={(data) => {
            if (selectedProject) {
              setProjects(prev => prev.map(p => p._id === selectedProject._id ? { ...p, ...data } : p));
            } else {
              setProjects(prev => [{ _id: Date.now().toString(), ...data } as ProjectRecord, ...prev]);
            }
            setIsEditing(false);
          }}
          submitLabel="Deploy Showcase Record"
        />
      ) : (
        <DataTable
          data={projects}
          columns={columns}
          searchPlaceholder="Search architecture case studies by title or tech..."
          searchKey="title"
          actions={(item) => (
            <>
              <button onClick={() => { setSelectedProject(item); setIsEditing(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Edit</button>
              <button onClick={() => setConfirmDelete(item._id)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Delete</button>
            </>
          )}
        />
      )}

      <ConfirmDialog
        isOpen={!!confirmDelete}
        title="Revoke Project Showcase"
        message="Are you sure you want to delete this architectural case study? This will immediately remove it from the public portfolio feed."
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        isDestructive={true}
      />
    </AdminLayout>
  );
}
