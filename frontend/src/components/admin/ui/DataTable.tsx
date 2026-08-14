'use client';

import React, { useState, useMemo } from 'react';

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: keyof T | string;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
  pageSize?: number;
  enableSelection?: boolean;
  onBulkDelete?: (selectedIds: string[]) => void;
  onBulkPublish?: (selectedIds: string[], status: boolean) => void;
  // Server-side options
  serverSide?: boolean;
  totalRecords?: number;
  onPageChange?: (page: number) => void;
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void;
  onSearchChange?: (term: string) => void;
}

export function DataTable<T extends Record<string, any>>({
  data = [],
  columns,
  searchPlaceholder = 'Search records...',
  searchKey,
  onRowClick,
  actions,
  emptyMessage = 'No enterprise records found matching your filter.',
  pageSize = 8,
  enableSelection = false,
  onBulkDelete,
  onBulkPublish,
  serverSide = false,
  totalRecords = 0,
  onPageChange,
  onSortChange,
  onSearchChange
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
    if (serverSide && onSearchChange) {
      onSearchChange(val);
    }
  };

  const handleSort = (key: string, sortable?: boolean) => {
    if (sortable === false) return;
    let newDir: 'asc' | 'desc' = 'asc';
    if (sortColumn === key) {
      newDir = sortDirection === 'asc' ? 'desc' : 'asc';
    }
    setSortColumn(key);
    setSortDirection(newDir);
    
    if (serverSide && onSortChange) {
      onSortChange(key, newDir);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (serverSide && onPageChange) {
      onPageChange(newPage);
    }
  };

  // Search & Filter execution (client-side only if not serverSide)
  const filteredData = useMemo(() => {
    if (serverSide) return data; // Server handles it
    if (!searchTerm) return data;
    return data.filter((item) => {
      if (searchKey) {
        const val = item[searchKey as string];
        return String(val || '').toLowerCase().includes(searchTerm.toLowerCase());
      }
      return Object.values(item).some((val) =>
        String(val || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [data, searchTerm, searchKey, serverSide]);

  // Sort execution (client-side only if not serverSide)
  const sortedData = useMemo(() => {
    if (serverSide) return filteredData;
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const comp = typeof aVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal));
      return sortDirection === 'asc' ? comp : -comp;
    });
  }, [filteredData, sortColumn, sortDirection, serverSide]);

  // Pagination execution (client-side only if not serverSide)
  const totalPages = serverSide ? Math.ceil(totalRecords / pageSize) || 1 : Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    if (serverSide) return sortedData; // Data from server is already paginated
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, serverSide]);

  const toggleSelectAll = () => {
    if (selectedIds.size === paginatedData.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginatedData.map((item: any) => item._id || item.id)));
    }
  };

  const toggleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="space-y-4">
      {/* Search Toolbar & Metrics Counter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/[0.02] border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-lg">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            aria-label={searchPlaceholder}
            className="w-full bg-black/60 text-white text-xs font-mono rounded-xl py-2.5 pl-9 pr-4 border border-white/10 focus:border-indigo-500 focus:outline-none transition-colors"
          />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-3 text-gray-500">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div className="text-xs font-mono text-gray-400 flex items-center gap-4">
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-indigo-400">{selectedIds.size} selected</span>
              {onBulkPublish && (
                <button onClick={() => onBulkPublish(Array.from(selectedIds), true)} className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">Publish</button>
              )}
              {onBulkDelete && (
                <button onClick={() => onBulkDelete(Array.from(selectedIds))} className="px-3 py-1 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">Delete</button>
              )}
            </div>
          )}
          <span>Showing <span className="text-white font-bold">{serverSide ? paginatedData.length : sortedData.length}</span> verified records</span>
        </div>
      </div>

      {/* Enterprise Responsive Table */}
      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.015] backdrop-blur-2xl shadow-2xl">
        <table className="w-full border-collapse text-left text-sm text-gray-300">
          <thead className="bg-black/80 border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-gray-400">
            <tr>
              {enableSelection && (
                <th className="py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && selectedIds.size === paginatedData.length}
                    onChange={toggleSelectAll}
                    className="rounded border-white/20 bg-black/50 text-indigo-500 focus:ring-indigo-500/50"
                  />
                </th>
              )}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => handleSort(col.accessorKey as string, col.sortable)}
                  className={`py-4 px-5 select-none ${col.sortable !== false ? 'cursor-pointer hover:text-white transition-colors' : ''}`}
                  role={col.sortable !== false ? 'button' : undefined}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {sortColumn === col.accessorKey && (
                      <span className="text-indigo-400 font-bold">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="py-4 px-5 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-sans">
            {paginatedData.length > 0 ? (
              paginatedData.map((item: any, rowIdx) => (
                <tr
                  key={rowIdx}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`transition-colors duration-150 ${onRowClick ? 'cursor-pointer hover:bg-indigo-500/10' : 'hover:bg-white/[0.03]'} ${selectedIds.has(item._id || item.id) ? 'bg-indigo-500/5' : ''}`}
                >
                  {enableSelection && (
                    <td className="py-4 px-4 whitespace-nowrap text-xs" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(item._id || item.id)}
                        onChange={() => toggleSelectOne(item._id || item.id)}
                        className="rounded border-white/20 bg-black/50 text-indigo-500 focus:ring-indigo-500/50"
                      />
                    </td>
                  )}
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="py-4 px-5 whitespace-nowrap text-xs">
                      {col.cell ? col.cell(item) : (item[col.accessorKey as string] !== undefined && item[col.accessorKey as string] !== null ? String(item[col.accessorKey as string]) : '—')}
                    </td>
                  ))}
                  {actions && (
                    <td className="py-4 px-5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">{actions(item)}</div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0) + (enableSelection ? 1 : 0)} className="py-12 text-center text-gray-500 font-mono text-xs">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono disabled:opacity-40 transition-colors"
          >
            &larr; Previous
          </button>
          <span className="text-xs font-mono text-gray-400">
            Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
          </span>
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono disabled:opacity-40 transition-colors"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
