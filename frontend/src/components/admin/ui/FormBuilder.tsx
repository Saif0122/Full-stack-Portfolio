'use client';

import React, { useState } from 'react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'boolean' | 'tags';
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: any }[];
  required?: boolean;
  description?: string;
}

interface FormBuilderProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  title?: string;
  description?: string;
  isSubmitting?: boolean;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  fields,
  onSubmit,
  onCancel,
  submitLabel = 'Save Enterprise Configuration',
  title,
  description,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    fields.forEach((f) => {
      initial[f.name] = f.defaultValue !== undefined ? f.defaultValue : (f.type === 'boolean' ? false : f.type === 'tags' ? [] : '');
    });
    return initial;
  });

  const [tagInput, setTagInput] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = (name: string) => {
    const val = tagInput[name]?.trim();
    if (!val) return;
    const currentTags = Array.isArray(formData[name]) ? formData[name] : [];
    if (!currentTags.includes(val)) {
      handleChange(name, [...currentTags, val]);
    }
    setTagInput((prev) => ({ ...prev, [name]: '' }));
  };

  const handleTagRemove = (name: string, tagToRemove: string) => {
    const currentTags = Array.isArray(formData[name]) ? formData[name] : [];
    handleChange(name, currentTags.filter((t: string) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl">
      {(title || description) && (
        <div className="border-b border-white/10 pb-5 mb-6">
          {title && <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>}
          {description && <p className="text-xs font-mono text-gray-400 mt-1">{description}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => {
          const isFullWidth = field.type === 'textarea' || field.type === 'tags';
          return (
            <div key={field.name} className={`${isFullWidth ? 'md:col-span-2' : ''} space-y-2`}>
              <label className="block text-xs font-mono uppercase font-bold text-gray-300 tracking-wider">
                {field.label} {field.required && <span className="text-rose-400">*</span>}
              </label>
              {field.description && <p className="text-[11px] text-gray-500 font-sans">{field.description}</p>}

              {field.type === 'text' || field.type === 'number' ? (
                <input
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder || ''}
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 text-white text-xs border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                />
              ) : field.type === 'textarea' ? (
                <textarea
                  rows={4}
                  required={field.required}
                  placeholder={field.placeholder || ''}
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 text-white text-xs border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono leading-relaxed"
                />
              ) : field.type === 'select' ? (
                <select
                  required={field.required}
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 text-white text-xs border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
                >
                  <option value="">Select option...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-black text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'boolean' ? (
                <button
                  type="button"
                  onClick={() => handleChange(field.name, !formData[field.name])}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-3 ${
                    formData[field.name]
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${formData[field.name] ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`} />
                  {formData[field.name] ? 'ACTIVE / ENABLED' : 'DISABLED / INACTIVE'}
                </button>
              ) : field.type === 'tags' ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add tag and hit Enter..."
                      value={tagInput[field.name] || ''}
                      onChange={(e) => setTagInput((prev) => ({ ...prev, [field.name]: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleTagAdd(field.name); } }}
                      className="flex-1 px-4 py-2 rounded-xl bg-black/60 text-white text-xs border border-white/10 focus:border-indigo-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleTagAdd(field.name)}
                      className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/30 text-xs font-mono"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(formData[field.name]) && formData[field.name].map((tag: string) => (
                      <span key={tag} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(field.name, tag)}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 text-xs font-mono font-semibold transition-all"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-xl shadow-indigo-500/20 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95"
        >
          {isSubmitting ? 'Processing Command...' : submitLabel}
        </button>
      </div>
    </form>
  );
};
