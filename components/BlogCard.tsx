"use client";
import React, { useState } from 'react';
import { Calendar, User, Edit3, Trash2, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { BlogPost } from '@/lib/database/blogService';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { deleteBlogPost, expandedBlogId, setExpandedBlogId } = useBlog();
  const [isDeleting, setIsDeleting] = useState(false);
  const isExpanded = expandedBlogId === post.id;

  const handleToggleExpanded = () => {
    setExpandedBlogId(isExpanded ? null : post.id);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the blog post "${post.title}"?`)) {
      setIsDeleting(true);
      try {
        await deleteBlogPost(post.id);
      } catch (error) {
        console.error('Failed to delete blog post:', error);
        alert('Failed to delete blog post. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatBlogBody = (body: string) => {
    // Simple formatting for blog display
    return body.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Handle bullet points
      if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('*')) {
        return (
          <li key={index} className="ml-4">
            {paragraph.replace(/^[•*]\s*/, '')}
          </li>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\./.test(paragraph.trim())) {
        return (
          <li key={index} className="ml-4 list-decimal">
            {paragraph.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      
      // Handle headers (lines that end with :)
      if (paragraph.trim().endsWith(':') && paragraph.length < 100) {
        return (
          <h4 key={index} className="font-semibold text-gray-800 mt-4 mb-2">
            {paragraph}
          </h4>
        );
      }
      
      // Regular paragraphs
      return (
        <p key={index} className="mb-3">
          {paragraph}
        </p>
      );
    }).filter(Boolean);
  };

  const getPreviewText = (body: string, maxLength: number = 200) => {
    const plainText = body.replace(/[•*]/g, '').replace(/\n+/g, ' ');
    return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
              {post.title}
            </h3>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.dateTime)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Edit3 className="w-4 h-4" />
                <span>Target: {post.fromYear}-{post.toYear}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={handleToggleExpanded}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Delete Blog Post"
            >
              {isDeleting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Preview or Full Content */}
        <div className="text-gray-700 leading-relaxed">
          {isExpanded ? (
            <div className="prose max-w-none">
              {formatBlogBody(post.body)}
            </div>
          ) : (
            <p className="text-gray-600">
              {getPreviewText(post.body)}
            </p>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>Batch Years: {post.fromYear} - {post.toYear}</span>
            <span>•</span>
            <span>Published: {new Date(post.dateTime).toLocaleDateString()}</span>
          </div>
          {isExpanded && (
            <div className="text-blue-600 font-medium">
              Full article displayed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}