'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { adminService } from '@/services/admin.service';

export default function RedirectManager() {
  const [redirects, setRedirects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [statusCode, setStatusCode] = useState(301);

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    try {
      const data = await adminService.fetch('/redirects');
      setRedirects(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminService.create('/redirects', { source, destination, statusCode });
      setSource('');
      setDestination('');
      fetchRedirects();
    } catch (e: any) {
      alert(e.message || 'Failed to add redirect');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this redirect?')) return;
    try {
      await adminService.delete('/redirects', id);
      fetchRedirects();
    } catch (e: any) {
      alert(e.message || 'Failed to delete redirect');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Redirect Manager</h1>
      <p className="text-gray-400">Manage 301 and 302 redirects, and 410 Gone status codes.</p>

      <Card className="mb-6 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Add New Redirect</h2>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">Source Path (e.g. /old-blog)</label>
            <input 
              type="text" 
              value={source} 
              onChange={e => setSource(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white" 
              required 
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-gray-300 mb-1">Destination URL</label>
            <input 
              type="text" 
              value={destination} 
              onChange={e => setDestination(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white" 
              required 
            />
          </div>
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
            <select 
              value={statusCode} 
              onChange={e => setStatusCode(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value={301}>301 Permanent</option>
              <option value={302}>302 Temporary</option>
              <option value={410}>410 Gone (Deleted)</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md h-[42px] w-full md:w-auto transition-colors">
            Add Redirect
          </button>
        </form>
      </Card>

      <Card className="p-6 overflow-x-auto">
        <h2 className="text-xl font-bold text-white mb-4">Active Redirects</h2>
        {loading ? <p className="text-gray-400">Loading...</p> : (
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hits</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {redirects.map((r: any) => (
                <tr key={r._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{r.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{r.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.statusCode === 301 ? 'bg-green-900/30 text-green-400' : r.statusCode === 410 ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                      {r.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{r.clicks || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(r._id)} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
              {redirects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500 text-sm">No active redirects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
