import Navbar from "@/components/Navbar";
import { mockBlogPosts } from "@/lib/mockData";
import Link from "next/link";
import { 
  Calendar, 
  Radio, 
  BookOpen, 
  Users,
  BarChart3,
  Settings,
  Shield,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Eye,
  Plus
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      
      {/* Admin Hero Section */}
      <section className="bg-gradient-to-r from-brand-900 to-brand-700 text-white py-16">
        <div className="section">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <Shield className="inline-block h-12 w-12 mr-4 text-brand-400" />
                Admin <span className="text-brand-400">Command Center</span>
              </h1>
              <p className="text-xl text-brand-100/90 mb-6 max-w-2xl">
                Manage the entire alumni ecosystem with powerful tools and insights at your fingertips.
              </p>
            </div>
            <div className="hidden lg:block animate-float">
              <div className="w-32 h-32 rounded-full bg-brand-400/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <main className="section py-12 -mt-8 relative z-10">
        {/* Admin Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Users, value: "10,247", label: "Total Alumni", color: "from-blue-500 to-blue-600", change: "+5.2%" },
            { icon: MessageSquare, value: "1,843", label: "Active Posts", color: "from-green-500 to-green-600", change: "+12.5%" },
            { icon: Calendar, value: "24", label: "Live Events", color: "from-purple-500 to-purple-600", change: "+8.1%" },
            { icon: Eye, value: "45.2K", label: "Monthly Views", color: "from-orange-500 to-orange-600", change: "+15.8%" }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="card text-center p-6 hover:scale-105 transition-transform">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-brand-900 mb-1">{stat.value}</div>
                <div className="text-sm text-brand-700 mb-2">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium flex items-center justify-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">Administrative Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                href: "/admin/events", 
                icon: Calendar, 
                title: "Event Management",
                desc: "Create, schedule, and manage alumni events",
                color: "from-indigo-500 to-purple-600",
                badge: "24 Active"
              },
              { 
                href: "/admin/broadcasts", 
                icon: Radio, 
                title: "Broadcast Center",
                desc: "Send announcements and newsletters",
                color: "from-pink-500 to-rose-600",
                badge: "New"
              },
              { 
                href: "/admin/blog", 
                icon: BookOpen, 
                title: "Content Management",
                desc: "Manage blog posts and featured content",
                color: "from-emerald-500 to-teal-600",
                badge: "127 Posts"
              },
              { 
                href: "/admin/analytics", 
                icon: BarChart3, 
                title: "Analytics Dashboard",
                desc: "View engagement and platform insights",
                color: "from-orange-500 to-red-500",
                badge: "Reports"
              },
              { 
                href: "/admin/users", 
                icon: Users, 
                title: "User Management",
                desc: "Manage alumni accounts and permissions",
                color: "from-blue-500 to-cyan-500",
                badge: "10.2K Users"
              },
              { 
                href: "/admin/settings", 
                icon: Settings, 
                title: "Platform Settings",
                desc: "Configure system and application settings",
                color: "from-gray-600 to-gray-700",
                badge: "Config"
              }
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <Link key={i} href={action.href} className="group">
                  <div className="card hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-3xl bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <span className="text-xs bg-brand-400/20 text-brand-700 px-2 py-1 rounded-full font-medium">
                        {action.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-900 mb-2 group-hover:text-brand-700 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-brand-700 mb-4 leading-relaxed">{action.desc}</p>
                    <div className="flex items-center text-brand-700 group-hover:text-brand-900 transition-colors">
                      <span className="text-sm font-medium">Manage</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Content Management */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-brand-900">Quick Actions</h3>
                <Plus className="h-5 w-5 text-brand-700" />
              </div>
              <div className="space-y-3">
                {[
                  { action: "Create New Event", icon: Calendar, color: "bg-purple-100 text-purple-600" },
                  { action: "Send Broadcast", icon: Radio, color: "bg-pink-100 text-pink-600" },
                  { action: "Feature Blog Post", icon: BookOpen, color: "bg-green-100 text-green-600" },
                  { action: "View Analytics", icon: BarChart3, color: "bg-orange-100 text-orange-600" }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button key={i} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brand-100/50 transition-colors text-left">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-brand-900">{item.action}</span>
                      <ArrowRight className="ml-auto h-4 w-4 text-brand-700" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Blog Posts Management */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gradient">Content Management</h3>
              <Link href="/admin/blog" className="btn-minimal">
                Manage All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="space-y-6">
              {mockBlogPosts.slice(0, 3).map((post, i) => (
                <div key={post.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-brand-900">{post.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          i === 0 ? 'bg-green-100 text-green-700' : 'bg-brand-100 text-brand-700'
                        }`}>
                          {i === 0 ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <div className="text-sm text-brand-700 mb-3">
                        by {post.author} • {post.date}
                      </div>
                      <p className="text-sm text-brand-700 leading-relaxed mb-4">
                        {post.body.substring(0, 100)}...
                      </p>
                      <div className="flex gap-2">
                        <button className="btn-minimal text-sm">Edit</button>
                        <button className="btn-minimal text-sm">{i === 0 ? 'Unfeature' : 'Feature'}</button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}