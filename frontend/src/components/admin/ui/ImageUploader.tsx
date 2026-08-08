'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { adminService } from '@/services/admin.service';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (err: Error) => void;
  previewUrl?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess, onUploadError, previewUrl }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(previewUrl || null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    
    // Create local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // NOTE: Using a custom fetch because adminService.create uses JSON
      const API_URL = typeof window !== 'undefined' ? '/api/v1' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');
      
      const res = await fetch(`${API_URL}/media/upload`, {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) throw new Error('Upload failed');
      const json = await res.json();
      
      onUploadSuccess(json.data.url);
    } catch (err: any) {
      if (onUploadError) onUploadError(err);
      setLocalPreview(previewUrl || null); // Revert
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess, onUploadError, previewUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
        isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/20 hover:border-white/40 bg-white/5'
      }`}
    >
      <input {...getInputProps()} />
      {localPreview ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 border border-white/10 shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={localPreview} alt="Preview" className="w-full h-full object-cover" />
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
      )}
      <p className="text-sm font-mono text-gray-300 text-center">
        {isDragActive ? "Drop image here..." : "Drag & drop an image, or click to select"}
      </p>
    </div>
  );
};
