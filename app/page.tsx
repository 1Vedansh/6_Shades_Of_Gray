import Navbar from "@/components/Navbar";
import { mockBlogPosts } from "@/lib/mockData";
import Link from "next/link";
import { ArrowRight, Users, BookOpen, Calendar, Award } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="section relative z-10 text-center text-white py-20">
          <div className="animate-float">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Alumni <span className="text-brand-400">Nexus</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-brand-100/90 max-w-3xl mx-auto leading-relaxed">
              Where connections flourish, knowledge flows, and futures are built. Join the ultimate alumni engagement platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login" className="btn-primary text-lg px-8 py-4 group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#features" className="btn-ghost text-lg px-8 py-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-pulse-soft">
          <div className="w-20 h-20 rounded-full bg-brand-400/20 blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse-soft" style={{animationDelay: '1s'}}>
          <div className="w-32 h-32 rounded-full bg-brand-700/20 blur-xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-brand-700 max-w-2xl mx-auto">
            Powerful features designed to strengthen alumni connections and foster meaningful relationships
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Users, title: "Alumni Directory", desc: "Connect with graduates across all years and industries" },
            { icon: BookOpen, title: "Knowledge Sharing", desc: "Share insights through blogs and discussions" },
            { icon: Calendar, title: "Events & Meetups", desc: "Join exclusive alumni events and networking sessions" },
            { icon: Award, title: "Mentorship", desc: "Guide and be guided by fellow alumni" }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="card text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-brand-700">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/login" className="btn-primary text-lg px-8 py-4">
            Join Alumni Nexus Today
          </Link>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="section py-20">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gradient mb-2">Featured Stories</h2>
            <p className="text-xl text-brand-700">Latest insights from our alumni community</p>
          </div>
          <Link href="/login" className="btn-minimal">
            View All Stories <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockBlogPosts.slice(0, 3).map((post, i) => (
            <div key={post.id} className={i === 0 ? "card-featured md:col-span-2 lg:col-span-1" : "card"}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-2 ${i === 0 ? 'text-brand-100' : 'text-brand-900'}`}>
                    {post.title}
                  </h3>
                  <div className={`text-sm mb-3 ${i === 0 ? 'text-brand-400' : 'text-brand-700'}`}>
                    by {post.author} • {post.date}
                  </div>
                </div>
              </div>
              <p className={`leading-relaxed ${i === 0 ? 'text-brand-100/90' : 'text-brand-700'}`}>
                {post.body}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <button className={i === 0 ? "btn-ghost" : "btn-minimal"}>
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-brand-900 to-brand-700 text-brand-100 py-12">
        <div className="section text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Alumni Nexus</h3>
            <p className="text-brand-400 max-w-2xl mx-auto">
              Building bridges between past, present, and future generations of graduates.
            </p>
          </div>
          <div className="border-t border-brand-700/30 pt-8">
            <p className="text-brand-400">
              © {new Date().getFullYear()} Alumni Nexus. Crafted with ❤️ for our community.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}