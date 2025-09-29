"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { broadcastService, CreateBroadcastData } from '@/lib/broadcastService';
import { Broadcast } from '@/lib/database/broadcastService';

interface BroadcastContextType {
  broadcasts: Broadcast[];
  loading: boolean;
  error: string | null;
  addBroadcast: (broadcast: CreateBroadcastData) => Promise<void>;
  deleteBroadcast: (id: string) => Promise<void>;
  refreshBroadcasts: () => Promise<void>;
  expandedBroadcastId: string | null;
  setExpandedBroadcastId: (id: string | null) => void;
  filterDateRange: { fromDate: string; toDate: string };
  setFilterDateRange: (range: { fromDate: string; toDate: string }) => void;
  filteredBroadcasts: Broadcast[];
}

const BroadcastContext = createContext<BroadcastContextType | null>(null);

export function BroadcastProvider({ children }: { children: ReactNode }) {
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBroadcastId, setExpandedBroadcastId] = useState<string | null>(null);
  const [filterDateRange, setFilterDateRange] = useState<{ fromDate: string; toDate: string }>({
    fromDate: '',
    toDate: ''
  });

  // Load broadcasts on mount
  useEffect(() => {
    refreshBroadcasts();
  }, []);

  const refreshBroadcasts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await broadcastService.getAllBroadcasts(
        filterDateRange.fromDate || undefined,
        filterDateRange.toDate || undefined
      );
      setBroadcasts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load broadcasts');
      console.error('Error loading broadcasts:', err);
    } finally {
      setLoading(false);
    }
  };

  const addBroadcast = async (broadcastData: CreateBroadcastData) => {
    try {
      setError(null);
      const newBroadcast = await broadcastService.createBroadcast(broadcastData);
      setBroadcasts(prev => [newBroadcast, ...prev]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create broadcast';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteBroadcast = async (id: string) => {
    try {
      setError(null);
      await broadcastService.deleteBroadcast(id);
      setBroadcasts(prev => prev.filter(broadcast => broadcast.id !== id));
      
      // Close expanded view if the deleted broadcast was expanded
      if (expandedBroadcastId === id) {
        setExpandedBroadcastId(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete broadcast';
      setError(errorMessage);
      throw err;
    }
  };

  // Filter broadcasts based on date range
  const filteredBroadcasts = broadcasts.filter(broadcast => {
    if (!filterDateRange.fromDate && !filterDateRange.toDate) {
      return true; // No filter applied
    }
    
    const broadcastDate = new Date(broadcast.dateTime);
    const fromDate = filterDateRange.fromDate ? new Date(filterDateRange.fromDate) : null;
    const toDate = filterDateRange.toDate ? new Date(filterDateRange.toDate) : null;
    
    if (fromDate && toDate) {
      return broadcastDate >= fromDate && broadcastDate <= toDate;
    } else if (fromDate) {
      return broadcastDate >= fromDate;
    } else if (toDate) {
      return broadcastDate <= toDate;
    }
    
    return true;
  });

  return (
    <BroadcastContext.Provider value={{
      broadcasts,
      loading,
      error,
      addBroadcast,
      deleteBroadcast,
      refreshBroadcasts,
      expandedBroadcastId,
      setExpandedBroadcastId,
      filterDateRange,
      setFilterDateRange,
      filteredBroadcasts
    }}>
      {children}
    </BroadcastContext.Provider>
  );
}

export function useBroadcasts() {
  const context = useContext(BroadcastContext);
  if (!context) {
    throw new Error('useBroadcasts must be used within BroadcastProvider');
  }
  return context;
}