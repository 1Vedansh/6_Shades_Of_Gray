"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { mockBlogPosts } from "@/lib/mockData";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [form, setForm] = useState({ title: "", body: "" });

  function addPost() {
    if (!form.title || !form.body) return;
    setPosts([
      {
        id: "bp" + (posts.length + 1),
        author: "You (Admin)",
        title: form.title,
        date: new Date().toISOString().slice(0, 10),
        body: form.body
      },
      ...posts
    ]);
    setForm({ title: "", body: "" });
  }

  return (
    <>
      <Navbar />
      <main className="section py-10">
        <h1 className="text-3xl font-bold mb-6">Alumni & Career Blog</h1>
        <div className="card mb-6">
          <div className="font-semibold">Add New Post</div>
          <input className="input mt-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea className="input mt-2 h-24" placeholder="Body" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
          <button className="btn-primary mt-2" onClick={addPost}>Add Post</button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map(post => (
            <div key={post.id} className="card">
              <div className="text-lg font-semibold">{post.title}</div>
              <div className="text-sm text-brand-700 mb-1">by {post.author} • {post.date}</div>
              <div className="mt-2">{post.body}</div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}