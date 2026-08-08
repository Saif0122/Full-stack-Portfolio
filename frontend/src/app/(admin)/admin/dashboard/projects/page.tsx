'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout, DataTable, Column, FormBuilder, ConfirmDialog } from '@/components/admin/ui';
import { adminService } from '@/services/admin.service';
import { PROJECT_CATEGORIES } from '@/constants/projects';
import { useToast } from '@/providers/ToastProvider';

interface ProjectRecord {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  isFeatured: boolean;
  githubUrl: string;
  liveUrl: string;
  technologies: string[];
  summary?: string;
  image?: string;
  markdownContent?: string;
  metrics?: any[];
  challenges?: any;
  technicalSpecs?: any;
  stack?: any[];
  mediaGallery?: any[];
}

export default function ProjectsManagementPage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => adminService.fetch('/projects')
  });

  const createMutation = useMutation({
    mutationFn: (newProject: any) => adminService.create('/projects', newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast('Project created successfully', 'success');
      setIsEditing(false);
    },
    onError: () => toast('Failed to create project', 'error')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => adminService.update('/projects', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast('Project updated successfully', 'success');
      setIsEditing(false);
    },
    onError: () => toast('Failed to update project', 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.delete('/projects', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast('Project deleted successfully', 'success');
      setConfirmDelete(null);
    },
    onError: () => toast('Failed to delete project', 'error')
  });

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
        {p.technologies?.map((t: string) => <span key={t} className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-mono">{t}</span>)}
      </div>
    )},
    { header: 'Featured State', accessorKey: 'isFeatured', cell: (p) => (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase ${p.isFeatured ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-400'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${p.isFeatured ? 'bg-emerald-400' : 'bg-gray-600'}`} />
        {p.isFeatured ? 'Featured Live' : 'Standard'}
      </span>
    )}
  ];

  const handleDelete = () => {
    if (confirmDelete) {
      deleteMutation.mutate(confirmDelete);
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
            { name: 'description', label: 'Short Description', type: 'text', defaultValue: selectedProject?.description || '', required: true },
            { name: 'category', label: 'Domain Category', type: 'select', defaultValue: selectedProject?.category || 'SaaS Architecture', options: PROJECT_CATEGORIES.map(c => ({ label: c, value: c })) },
            { name: 'summary', label: 'Summary', type: 'textarea', defaultValue: selectedProject?.summary || '' },
            { name: 'image', label: 'Main Image', type: 'image', defaultValue: selectedProject?.image || '' },
            { name: 'technologies', label: 'Tags', type: 'tags', defaultValue: selectedProject?.technologies || [] },
            { name: 'metrics', label: 'Metrics (JSON)', type: 'textarea', defaultValue: selectedProject?.metrics ? JSON.stringify(selectedProject.metrics, null, 2) : '[\n  { "label": "", "value": "", "description": "" }\n]' },
            { name: 'stack', label: 'Stack (JSON)', type: 'textarea', defaultValue: selectedProject?.stack ? JSON.stringify(selectedProject.stack, null, 2) : '[\n  { "name": "", "category": "", "benefit": "", "version": "" }\n]' },
            { name: 'challenges', label: 'Challenges (JSON)', type: 'textarea', defaultValue: selectedProject?.challenges ? JSON.stringify(selectedProject.challenges, null, 2) : '{\n  "problem": "",\n  "solution": "",\n  "architecture": ""\n}' },
            { name: 'technicalSpecs', label: 'Tech Specs (JSON)', type: 'textarea', defaultValue: selectedProject?.technicalSpecs ? JSON.stringify(selectedProject.technicalSpecs, null, 2) : '{\n  "backendStructure": "",\n  "databaseSchema": ""\n}' },
            { name: 'mediaGallery', label: 'Media Gallery (JSON)', type: 'textarea', defaultValue: selectedProject?.mediaGallery ? JSON.stringify(selectedProject.mediaGallery, null, 2) : '[\n  { "type": "image", "url": "", "caption": "" }\n]' },
            { name: 'markdownContent', label: 'Markdown Content', type: 'markdown', defaultValue: selectedProject?.markdownContent || '' },
            { name: 'githubUrl', label: 'GitHub Repository URL', type: 'text', defaultValue: selectedProject?.githubUrl || '' },
            { name: 'liveUrl', label: 'Live Demo Web URL', type: 'text', defaultValue: selectedProject?.liveUrl || '' },
            { name: 'isFeatured', label: 'Pin to Front Page Hero Showcase', type: 'boolean', defaultValue: selectedProject?.isFeatured || false }
          ]}
          onCancel={() => setIsEditing(false)}
          onSubmit={(data) => {
            const payload = { ...data };
            const jsonFields = ['metrics', 'stack', 'challenges', 'technicalSpecs', 'mediaGallery'];
            jsonFields.forEach(field => {
              if (typeof payload[field] === 'string' && payload[field].trim().length > 0) {
                try {
                  payload[field] = JSON.parse(payload[field]);
                } catch (e) {
                  console.error(`Invalid JSON in ${field}`);
                  payload[field] = undefined;
                }
              } else {
                payload[field] = undefined;
              }
            });

            if (selectedProject && selectedProject._id) {
              updateMutation.mutate({ id: selectedProject._id, data: payload });
            } else {
              createMutation.mutate(payload);
            }
          }}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
          submitLabel="Deploy Showcase Record"
        />
      ) : isLoading ? (
        <div className="py-20 flex justify-center"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <DataTable
          data={projects}
          columns={columns}
          searchPlaceholder="Search architecture case studies by title or tech..."
          searchKey="title"
          actions={(item) => (
            <>
              <button onClick={() => { setSelectedProject(item); setIsEditing(true); }} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-xs border border-white/5">Edit</button>
              <button onClick={() => setConfirmDelete(item._id!)} className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono text-xs border border-rose-500/20">Delete</button>
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
