"use client";
import { useState } from 'react';
import { Plus, TrendingUp, Users, BookOpen, Calendar, Loader2, AlertCircle } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import BlogCard from '../../../components/BlogCard';
import BlogForm from '../../../components/BlogForm';
import BlogFilter from '../../../components/BlogFilter';
import { useBlog } from '../../../context/BlogContext';

export default function AdminBlogPage() {
  const { blogPosts, filteredBlogPosts, loading, error } = useBlog();
  const [showForm, setShowForm] = useState(false);

  // Calculate statistics
  const totalPosts = blogPosts.length;
  const thisMonthPosts = blogPosts.filter(post => {
    const postDate = new Date(post.dateTime);
    const now = new Date();
    return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
  }).length;

  const getUniqueAuthors = () => {
    const authors = new Set(blogPosts.map(post => post.author));
    return authors.size;
  };

  const getAverageTargetRange = () => {
    if (blogPosts.length === 0) return 0;
    const totalRange = blogPosts.reduce((sum, post) => sum + (post.toYear - post.fromYear + 1), 0);
    return Math.round(totalRange / blogPosts.length);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Blog Management
                </h1>
                <p className="text-gray-600">
                  Create and manage alumni blog posts with targeted content for different graduation years
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <Plus className="w-5 h-5" />
                New Blog Post
              </button>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-3xl font-bold text-gray-900">{totalPosts}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                All time
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-gray-900">{thisMonthPosts}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                Recent activity
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Authors</p>
                  <p className="text-3xl font-bold text-gray-900">{getUniqueAuthors()}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1 text-purple-500" />
                Contributors
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Target Range</p>
                  <p className="text-3xl font-bold text-gray-900">{getAverageTargetRange()}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1 text-orange-500" />
                Years targeted
              </div>
            </div>
          </div>

          {/* Filter Component */}
          <BlogFilter />

          {/* Blog Posts List */}
          <div className="space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-600">Loading blog posts...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Posts</h3>
                <p className="text-gray-600 mb-4 text-center">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredBlogPosts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {blogPosts.length === 0 ? 'No blog posts yet' : 'No posts match your filters'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {blogPosts.length === 0 
                    ? 'Get started by creating your first blog post to share valuable insights with alumni.'
                    : 'Try adjusting your date filters to see more blog posts.'
                  }
                </p>
                {blogPosts.length === 0 && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Create First Post
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Blog Posts ({filteredBlogPosts.length})
                  </h2>
                  <div className="text-sm text-gray-600">
                    Showing {filteredBlogPosts.length} of {totalPosts} posts
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredBlogPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Blog Form Modal */}
        {showForm && (
          <BlogForm onClose={() => setShowForm(false)} />
        )}
      </main>
    </>
  );
}