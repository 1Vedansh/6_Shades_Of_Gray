"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { blogService, CreateBlogData } from '@/lib/blogService';
import { BlogPost } from '@/lib/database/blogService';

interface BlogContextType {
  blogPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  addBlogPost: (post: CreateBlogData) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  refreshBlogs: () => Promise<void>;
  expandedBlogId: string | null;
  setExpandedBlogId: (id: string | null) => void;
  filterDateRange: { fromDate: string; toDate: string };
  setFilterDateRange: (range: { fromDate: string; toDate: string }) => void;
  filteredBlogPosts: BlogPost[];
}

const BlogContext = createContext<BlogContextType | null>(null);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);
  const [filterDateRange, setFilterDateRange] = useState<{ fromDate: string; toDate: string }>({
    fromDate: '',
    toDate: ''
  });

  // Load blogs on mount
  useEffect(() => {
    refreshBlogs();
  }, []);

  const refreshBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getAllBlogs(
        filterDateRange.fromDate || undefined,
        filterDateRange.toDate || undefined
      );
      setBlogPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs');
      console.error('Error loading blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const addBlogPost = async (postData: CreateBlogData) => {
    try {
      setError(null);
      const newBlog = await blogService.createBlog(postData);
      setBlogPosts(prev => [newBlog, ...prev]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create blog post';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      setError(null);
      await blogService.deleteBlog(id);
      setBlogPosts(prev => prev.filter(post => post.id !== id));
      
      // Close expanded view if the deleted post was expanded
      if (expandedBlogId === id) {
        setExpandedBlogId(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete blog post';
      setError(errorMessage);
      throw err;
    }
  };

  // Filter blog posts based on date range
  const filteredBlogPosts = blogPosts.filter(post => {
    if (!filterDateRange.fromDate && !filterDateRange.toDate) {
      return true; // No filter applied
    }
    
    const postDate = new Date(post.dateTime);
    const fromDate = filterDateRange.fromDate ? new Date(filterDateRange.fromDate) : null;
    const toDate = filterDateRange.toDate ? new Date(filterDateRange.toDate) : null;
    
    if (fromDate && toDate) {
      return postDate >= fromDate && postDate <= toDate;
    } else if (fromDate) {
      return postDate >= fromDate;
    } else if (toDate) {
      return postDate <= toDate;
    }
    
    return true;
  });

  return (
    <BlogContext.Provider value={{
      blogPosts,
      loading,
      error,
      addBlogPost,
      deleteBlogPost,
      refreshBlogs,
      expandedBlogId,
      setExpandedBlogId,
      filterDateRange,
      setFilterDateRange,
      filteredBlogPosts
    }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
}