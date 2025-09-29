"use client";
import React from 'react';
import { Filter, X, Calendar } from 'lucide-react';
import { useBroadcasts } from '@/context/BroadcastContext';

export default function BroadcastFilter() {
  const { filterDateRange, setFilterDateRange, broadcasts, filteredBroadcasts } = useBroadcasts();

  const handleFromDateChange = (date: string) => {
    setFilterDateRange({ ...filterDateRange, fromDate: date });
  };

  const handleToDateChange = (date: string) => {
    setFilterDateRange({ ...filterDateRange, toDate: date });
  };

  const clearFilters = () => {
    setFilterDateRange({ fromDate: '', toDate: '' });
  };

  const hasActiveFilter = filterDateRange.fromDate || filterDateRange.toDate;

  return (
    <div className="card mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Filter className="h-5 w-5 text-brand-700" />
        <h3 className="font-semibold text-brand-900">Filter Broadcasts</h3>
        {hasActiveFilter && (
          <button
            onClick={clearFilters}
            className="text-sm text-brand-600 hover:text-brand-800 flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">
            From Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-half translate-y-neg-half h-4 w-4 text-brand-500" />
            <input
              type="date"
              className="input pl-10"
              value={filterDateRange.fromDate}
              onChange={(e) => handleFromDateChange(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">
            To Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-half translate-y-neg-half h-4 w-4 text-brand-500" />
            <input
              type="date"
              className="input pl-10"
              value={filterDateRange.toDate}
              onChange={(e) => handleToDateChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filter Results Summary */}
      <div className="flex items-center justify-between p-3 bg-brand-50 rounded-lg">
        <div className="text-sm text-brand-700">
          {hasActiveFilter ? (
            <>
              Showing <strong>{filteredBroadcasts.length}</strong> of <strong>{broadcasts.length}</strong> broadcasts
              {filterDateRange.fromDate && filterDateRange.toDate && (
                <span className="ml-1">
                  from {new Date(filterDateRange.fromDate).toLocaleDateString()} to {new Date(filterDateRange.toDate).toLocaleDateString()}
                </span>
              )}
              {filterDateRange.fromDate && !filterDateRange.toDate && (
                <span className="ml-1">from {new Date(filterDateRange.fromDate).toLocaleDateString()}</span>
              )}
              {!filterDateRange.fromDate && filterDateRange.toDate && (
                <span className="ml-1">until {new Date(filterDateRange.toDate).toLocaleDateString()}</span>
              )}
            </>
          ) : (
            <>Showing all <strong>{broadcasts.length}</strong> broadcasts</>
          )}
        </div>
        
        {hasActiveFilter && filteredBroadcasts.length === 0 && (
          <div className="text-sm text-orange-600">
            No broadcasts match the selected date range
          </div>
        )}
      </div>
    </div>
  );
}