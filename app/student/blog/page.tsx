import Navbar from "@/components/Navbar";
import { mockBlogPosts } from "@/lib/mockData";
import { BookOpen, Clock, User, Heart, MessageCircle, Share, Search, Filter } from "lucide-react";

export default function StudentBlogPage() {
  return (
    <>
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-to-r from-brand-900 to-brand-700 text-white py-16">
        <div className="section text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-brand-400" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Alumni <span className="text-brand-400">Stories</span>
          </h1>
          <p className="text-xl text-brand-100/90 max-w-2xl mx-auto">
            Discover insights, career advice, and inspiring stories from our global alumni community
          </p>
        </div>
      </section>

      <main className="section py-12 -mt-8 relative z-10">
        {/* Search and Filter Bar */}
        <div className="card mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-700" />
              <input
                type="text"
                placeholder="Search articles, authors, or topics..."
                className="input pl-10 w-full"
              />
            </div>
            <div className="flex gap-3">
              <button className="btn-ghost flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <select className="input px-4 py-2 w-auto">
                <option>All Categories</option>
                <option>Career Advice</option>
                <option>Industry Insights</option>
                <option>Success Stories</option>
                <option>Networking Tips</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gradient mb-6">Featured Story</h2>
          <div className="card-featured">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-brand-400 text-brand-900 text-xs px-3 py-1 rounded-full font-bold">
                    FEATURED
                  </span>
                  <span className="text-brand-400 text-sm">Career Success</span>
                </div>
                <h3 className="text-3xl font-bold text-brand-100 mb-4">
                  {mockBlogPosts[0].title}
                </h3>
                <p className="text-brand-100/90 text-lg leading-relaxed mb-6">
                  {mockBlogPosts[0].body.substring(0, 200)}...
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-brand-400">
                      <User className="h-4 w-4" />
                      <span>{mockBlogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-400">
                      <Clock className="h-4 w-4" />
                      <span>{mockBlogPosts[0].date}</span>
                    </div>
                  </div>
                  <button className="btn-ghost">Read Full Story</button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-full h-48 bg-brand-400/20 rounded-2xl flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-brand-400/50" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gradient">Latest Articles</h2>
          <div className="text-sm text-brand-700">
            {mockBlogPosts.length - 1} more articles
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockBlogPosts.slice(1).map((post, i) => (
            <article key={post.id} className="card group cursor-pointer hover:scale-[1.02] transition-all duration-300">
              <div className="mb-4">
                <div className="w-full h-32 bg-gradient-to-r from-brand-700/20 to-brand-400/20 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-brand-700/50" />
                </div>
                <h3 className="text-lg font-bold text-brand-900 mb-2 group-hover:text-brand-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-brand-700 text-sm leading-relaxed mb-4">
                  {post.body.substring(0, 120)}...
                </p>
              </div>
              
              <div className="border-t border-brand-400/20 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm text-brand-700">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-700 to-brand-900 flex items-center justify-center text-white text-xs font-bold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{post.author}</div>
                      <div className="text-xs text-brand-700/70">{post.date}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-brand-700">
                    <button className="flex items-center gap-1 hover:text-brand-900 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">24</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-brand-900 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">8</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-brand-900 transition-colors">
                      <Share className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-xs text-brand-700 bg-brand-100 px-2 py-1 rounded-full">
                    5 min read
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-primary px-8 py-4">
            Load More Stories
          </button>
        </div>
      </main>
    </>
  );
}