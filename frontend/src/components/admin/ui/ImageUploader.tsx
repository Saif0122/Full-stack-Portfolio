'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '@/services/api.client';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (err: Error) => void;
  previewUrl?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess, onUploadError, previewUrl }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>(previewUrl || '');
  const [urlInput, setUrlInput] = useState<string>(previewUrl || '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (previewUrl) {
      setCurrentUrl(previewUrl);
      setUrlInput(previewUrl);
    }
  }, [previewUrl]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    
    // Create immediate local preview
    const objectUrl = URL.createObjectURL(file);
    setCurrentUrl(objectUrl);
    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const res = await api.post('/media', {
          file: reader.result,
          originalName: file.name,
          folder: 'portfolio_media'
        });

        const uploadedUrl = res.data?.data?.url;
        if (uploadedUrl) {
          setCurrentUrl(uploadedUrl);
          setUrlInput(uploadedUrl);
          onUploadSuccess(uploadedUrl);
        } else {
          throw new Error('Upload succeeded but no URL returned');
        }
      } catch (err: any) {
        if (onUploadError) onUploadError(err);
        setCurrentUrl(previewUrl || '');
        setUrlInput(previewUrl || '');
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      setIsUploading(false);
      setCurrentUrl(previewUrl || '');
      if (onUploadError) onUploadError(new Error('Failed to read file for upload'));
    };
  }, [onUploadSuccess, onUploadError, previewUrl]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (trimmed) {
      setCurrentUrl(trimmed);
      onUploadSuccess(trimmed);
    }
  };

  const handleUrlChange = (value: string) => {
    setUrlInput(value);
    const trimmed = value.trim();
    if (trimmed && (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/'))) {
      setCurrentUrl(trimmed);
      onUploadSuccess(trimmed);
    }
  };

  const handleClear = () => {
    setCurrentUrl('');
    setUrlInput('');
    onUploadSuccess('');
  };

  const handleCopy = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    disabled: isUploading
  });

  return (
    <div className="space-y-4 rounded-2xl bg-white/[0.02] border border-white/10 p-5 backdrop-blur-xl">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload File (Cloudinary)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Paste Image URL
          </button>
        </div>

        {currentUrl && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] font-mono text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 transition-all"
          >
            Clear Image
          </button>
        )}
      </div>

      {/* Tab 1: Upload via Drag & Drop */}
      {activeTab === 'upload' && (
        <div 
          {...getRootProps()} 
          className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
            isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/15 hover:border-white/30 bg-white/[0.02]'
          }`}
        >
          <input {...getInputProps()} />
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3">
            {isUploading ? (
              <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            )}
          </div>
          <p className="text-xs font-mono text-gray-300 text-center font-semibold">
            {isUploading
              ? "Streaming image directly to Cloudinary..."
              : isDragActive
              ? "Drop image here..."
              : "Drag & drop image here, or click to browse"}
          </p>
          <p className="text-[10px] font-mono text-gray-500 mt-1">PNG, JPG, WEBP, AVIF up to 10MB</p>
        </div>
      )}

      {/* Tab 2: Direct URL Input */}
      {activeTab === 'url' && (
        <form onSubmit={handleUrlSubmit} className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
              value={urlInput}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 text-white text-xs border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 text-xs font-mono font-semibold transition-all"
            >
              Apply
            </button>
          </div>
          <p className="text-[10px] font-mono text-gray-500">Paste any public HTTPS image link or Cloudinary URL.</p>
        </form>
      )}

      {/* Current Image Preview & Meta Info */}
      {currentUrl && (
        <div className="rounded-xl border border-white/10 bg-black/40 p-3 space-y-2">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/5 bg-black/80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={currentUrl} 
              alt="Uploaded Preview" 
              className="w-full h-full object-cover"
              onError={() => {
                // If invalid URL is entered, don't crash
              }}
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] font-mono text-indigo-300">Uploading to Cloudinary...</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-[10px] font-mono text-gray-400 truncate max-w-[280px]" title={currentUrl}>
              {currentUrl}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 transition-all"
              >
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-[10px] font-mono text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 transition-all"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
