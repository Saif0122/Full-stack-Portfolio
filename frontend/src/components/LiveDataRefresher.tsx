"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LiveDataRefresherProps {
  isMockData: boolean;
}

export default function LiveDataRefresher({ isMockData }: LiveDataRefresherProps) {
  const router = useRouter();
  const [isWaking, setIsWaking] = useState(false);

  useEffect(() => {
    // If the data we received from the server isn't mock data, do nothing!
    if (!isMockData) return;

    let intervalId: NodeJS.Timeout;

    const checkBackend = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${API_URL}/health`, { cache: 'no-store' });
        if (res.ok) {
           // Backend is awake! Refresh the server components to get real data
           router.refresh();
           return true;
        }
      } catch (err) {
        // Still asleep
      }
      return false;
    };

    const startPolling = async () => {
       const isAwake = await checkBackend();
       if (!isAwake) {
         setIsWaking(true);
         intervalId = setInterval(async () => {
            const awakeNow = await checkBackend();
            if (awakeNow) {
               clearInterval(intervalId);
               setIsWaking(false);
            }
         }, 4000); // Check every 4 seconds
       }
    };

    startPolling();

    return () => {
       if (intervalId) clearInterval(intervalId);
    };
  }, [isMockData, router]);

  // Show a tiny unobtrusive indicator to the user if we are actively waiting for the backend
  if (!isWaking || !isMockData) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg text-sm flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      Connecting to live database...
    </div>
  );
}
