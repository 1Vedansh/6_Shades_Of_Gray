import Navbar from "@/components/Navbar";
import { mockBlogPosts } from "@/lib/mockData";
import Link from "next/link";
import { 
  Users, 
  Heart, 
  Calendar, 
  BookOpen, 
  TrendingUp,
  MessageCircle,
  Star,
  ArrowRight,
  Bell,
  Search
} from "lucide-react";

export default function StudentDashboard() {
  return (
    <>
      <Navbar />
      
      {/* Hero Welcome Section */}
      <section className="bg-gradient-to-r from-brand-900 to-brand-700 text-white py-16">
        <div className="section">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome back, <span className="text-brand-400">Scholar!</span>
              </h1>
              <p className="text-xl text-brand-100/90 mb-6 max-w-2xl">
                Your gateway to endless opportunities, meaningful connections, and knowledge sharing.
              </p>
            </div>
            <div className="hidden lg:block animate-float">
              <div className="w-32 h-32 rounded-full bg-brand-400/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      <main className="section py-12 -mt-8 relative z-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Users, value: "2.4K", label: "Alumni Connected", color: "from-blue-500 to-blue-600" },
            { icon: MessageCircle, value: "156", label: "Messages", color: "from-green-500 to-green-600" },
            { icon: Calendar, value: "8", label: "Events Joined", color: "from-purple-500 to-purple-600" },
            { icon: Star, value: "12", label: "Achievements", color: "from-yellow-500 to-yellow-600" }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="card text-center p-6">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-brand-900 mb-1">{stat.value}</div>
                <div className="text-sm text-brand-700">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-8 text-center">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                href: "/student/directory", 
                icon: Users, 
                title: "Alumni Directory",
                desc: "Connect with 10,000+ graduates",
                color: "from-brand-700 to-brand-900"
              },
              { 
                href: "/student/mentorship", 
                icon: Heart, 
                title: "Find a Mentor",
                desc: "Get guidance from experienced alumni",
                color: "from-pink-500 to-rose-500"
              },
              { 
                href: "/student/events", 
                icon: Calendar, 
                title: "Upcoming Events",
                desc: "Join networking sessions & workshops",
                color: "from-indigo-500 to-purple-500"
              },
              { 
                href: "/student/blog", 
                icon: BookOpen, 
                title: "Community Blog",
                desc: "Share insights and learn from others",
                color: "from-emerald-500 to-teal-500"
              }
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <Link key={i} href={action.href} className="group">
                  <div className="card hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                    <div className={`w-16 h-16 mb-4 rounded-3xl bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-900 mb-2 group-hover:text-brand-700 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-brand-700 mb-4 leading-relaxed">{action.desc}</p>
                    <div className="flex items-center text-brand-700 group-hover:text-brand-900 transition-colors">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Featured Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-brand-900">Recent Activity</h3>
                <Bell className="h-5 w-5 text-brand-700" />
              </div>
              <div className="space-y-4">
                {[
                  { action: "New connection", name: "Sarah Johnson", time: "2h ago", type: "connection" },
                  { action: "Event invitation", name: "Tech Talk 2024", time: "5h ago", type: "event" },
                  { action: "Blog published", name: "AI in Healthcare", time: "1d ago", type: "blog" },
                  { action: "Mentorship match", name: "Dr. Mike Chen", time: "2d ago", type: "mentor" }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-brand-100/50 transition-colors cursor-pointer">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'connection' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'event' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'blog' ? 'bg-green-100 text-green-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {activity.type === 'connection' && <Users className="h-5 w-5" />}
                      {activity.type === 'event' && <Calendar className="h-5 w-5" />}
                      {activity.type === 'blog' && <BookOpen className="h-5 w-5" />}
                      {activity.type === 'mentor' && <Heart className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-brand-900">{activity.action}</div>
                      <div className="text-sm text-brand-700">{activity.name}</div>
                    </div>
                    <div className="text-xs text-brand-700">{activity.time}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 btn-ghost">View All Activity</button>
            </div>
          </div>

          {/* Featured Blog Posts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gradient">Latest Community Stories</h3>
              <Link href="/student/blog" className="btn-minimal">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="space-y-6">
              {mockBlogPosts.slice(0, 3).map((post, i) => (
                <div key={post.id} className={i === 0 ? "card-featured" : "card"}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                      i === 0 ? 'bg-brand-400 text-brand-900' : 'bg-gradient-to-r from-brand-700 to-brand-900 text-white'
                    }`}>
                      {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-lg font-bold mb-2 ${i === 0 ? 'text-brand-100' : 'text-brand-900'}`}>
                        {post.title}
                      </h4>
                      <div className={`text-sm mb-3 ${i === 0 ? 'text-brand-400' : 'text-brand-700'}`}>
                        by {post.author} • {post.date}
                      </div>
                      <p className={`text-sm leading-relaxed ${i === 0 ? 'text-brand-100/90' : 'text-brand-700'}`}>
                        {post.body.substring(0, 120)}...
                      </p>
                      <button className={`mt-3 ${i === 0 ? 'btn-ghost' : 'btn-minimal'} text-sm`}>
                        Read More <ArrowRight className="ml-1 h-3 w-3" />
                      </button>
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