"use client";
import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { CreateBlogData } from '@/lib/blogService';

interface BlogFormProps {
  onClose: () => void;
}

export default function BlogForm({ onClose }: BlogFormProps) {
  const { addBlogPost, error: contextError } = useBlog();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateBlogData>({
    title: '',
    body: '',
    fromYear: 2020,
    toYear: 2024
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.body.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.fromYear > formData.toYear) {
      setError('From Year cannot be greater than To Year');
      return;
    }

    if (formData.title.trim().length < 3) {
      setError('Title must be at least 3 characters long');
      return;
    }

    if (formData.body.trim().length < 10) {
      setError('Blog content must be at least 10 characters long');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await addBlogPost(formData);
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        body: '',
        fromYear: 2020,
        toYear: 2024
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setFormData({
      title: '',
      body: '',
      fromYear: 2020,
      toYear: 2024
    });
    onClose();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2010 + 5 }, (_, i) => 2010 + i);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create New Blog Post</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              disabled={isLoading}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter an engaging blog title..."
                required
              />
            </div>

            {/* Target Batch Years */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Year *
                </label>
                <select
                  value={formData.fromYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, fromYear: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Year *
                </label>
                <select
                  value={formData.toYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, toYear: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Body Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Content *
              </label>
              <textarea
                value={formData.body}
                onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Write your blog content here... You can use formatting characters like:

• Bullet points
* Italic text *
** Bold text **

Include:
- Personal experiences
- Practical tips
- Actionable advice
- Relevant examples

Make it engaging and valuable for your target audience!"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Tip: Use clear headings, bullet points, and examples to make your blog engaging and easy to read.
              </p>
            </div>

            {/* Error Message */}
            {(error || contextError) && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800 font-medium">
                  <span>⚠️ Error</span>
                </div>
                <div className="text-red-600 text-sm mt-1">
                  {error || contextError}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </span>
                ) : (
                  'Publish Blog Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}