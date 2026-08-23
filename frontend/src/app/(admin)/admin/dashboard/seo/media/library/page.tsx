'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, AlertTriangle, Image as ImageIcon } from 'lucide-react';

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/media-seo/library')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMedia(data.data);
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <ImageIcon className="text-pink-500" /> Media Library
          </h1>
        </div>
        <Link href="/admin/dashboard/seo/media" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-sm font-semibold rounded-lg text-white transition-colors">
          Back to Dashboard
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search media by title or alt text..."
            className="w-full bg-gray-900 border border-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white hover:bg-gray-800">
          <Filter size={18} /> Filters
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 text-center py-12">Loading library...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {media.map((item: any) => (
            <div key={item._id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden group">
              <div className="aspect-square bg-gray-800 relative">
                {item.mimetype.startsWith('image/') ? (
                  <img src={item.url} alt={item.altText || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">Video</div>
                )}
                {item.isMissingAlt && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg" title="Missing Alt Text">
                    <AlertTriangle size={14} />
                  </div>
                )}
                {item.isDuplicate && (
                  <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-0.5 rounded text-xs font-bold shadow-lg">
                    Duplicate
                  </div>
                )}
              </div>
              <div className="p-3 space-y-1">
                <div className="font-semibold text-white truncate text-sm" title={item.originalName}>{item.originalName}</div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{(item.size / 1024).toFixed(1)} KB</span>
                  <span className={item.overallReadinessScore > 80 ? 'text-emerald-400' : 'text-yellow-400'}>
                    Score: {item.overallReadinessScore}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {media.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No media found in the library.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
