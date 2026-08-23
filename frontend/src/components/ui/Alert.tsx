import React from 'react';

export const Alert = ({ 
  children, 
  variant = 'info' 
}: { 
  children: React.ReactNode; 
  variant?: 'info' | 'success' | 'warning' | 'error' 
}) => {
  const styles = {
    info: 'bg-blue-900/30 text-blue-400 border-blue-500/30',
    success: 'bg-green-900/30 text-green-400 border-green-500/30',
    warning: 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-900/30 text-red-400 border-red-500/30',
  };

  return (
    <div className={`p-4 rounded-lg border ${styles[variant]} mb-4`}>
      {children}
    </div>
  );
};
