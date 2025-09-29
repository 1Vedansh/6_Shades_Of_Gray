"use client";
import React from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export default function BlogFilter() {
  const { filterDateRange, setFilterDateRange, filteredBlogPosts, blogPosts } = useBlog();

  const handleFromDateChange = (date: string) => {
    setFilterDateRange({
      ...filterDateRange,
      fromDate: date
    });
  };

  const handleToDateChange = (date: string) => {
    setFilterDateRange({
      ...filterDateRange,
      toDate: date
    });
  };

  const clearFilters = () => {
    setFilterDateRange({
      fromDate: '',
      toDate: ''
    });
  };

  const hasActiveFilters = filterDateRange.fromDate || filterDateRange.toDate;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filter Blog Posts</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        {/* From Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={filterDateRange.fromDate}
              onChange={(e) => handleFromDateChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={filterDateRange.toDate}
              onChange={(e) => handleToDateChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="text-center md:text-left">
          <div className="text-sm text-gray-600 mb-1">Results</div>
          <div className="text-lg font-semibold text-blue-600">
            {filteredBlogPosts.length} of {blogPosts.length} posts
          </div>
          {hasActiveFilters && (
            <div className="text-xs text-green-600 mt-1">
              Filter active
            </div>
          )}
        </div>
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-600 mr-2">Quick filters:</span>
        
        <button
          onClick={() => {
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 7);
            setFilterDateRange({
              fromDate: lastWeek.toISOString().split('T')[0],
              toDate: new Date().toISOString().split('T')[0]
            });
          }}
          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
        >
          Last 7 days
        </button>

        <button
          onClick={() => {
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            setFilterDateRange({
              fromDate: lastMonth.toISOString().split('T')[0],
              toDate: new Date().toISOString().split('T')[0]
            });
          }}
          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
        >
          Last 30 days
        </button>

        <button
          onClick={() => {
            const lastThreeMonths = new Date();
            lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);
            setFilterDateRange({
              fromDate: lastThreeMonths.toISOString().split('T')[0],
              toDate: new Date().toISOString().split('T')[0]
            });
          }}
          className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
        >
          Last 3 months
        </button>

        <button
          onClick={() => {
            const thisYear = new Date();
            setFilterDateRange({
              fromDate: `${thisYear.getFullYear()}-01-01`,
              toDate: new Date().toISOString().split('T')[0]
            });
          }}
          className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors"
        >
          This year
        </button>
      </div>
    </div>
  );
}