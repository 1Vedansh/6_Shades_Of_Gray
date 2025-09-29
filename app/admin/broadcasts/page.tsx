"use client";
import Navbar from "@/components/Navbar";
import BroadcastForm from "@/components/BroadcastForm";
import BroadcastCard from "@/components/BroadcastCard";
import BroadcastFilter from "@/components/BroadcastFilter";
import { useBroadcasts } from "@/context/BroadcastContext";
import { MessageSquare, Send, Users, Calendar } from "lucide-react";

export default function BroadcastsPage() {
  const { broadcasts, filteredBroadcasts, loading, error, refreshBroadcasts } = useBroadcasts();

  return (
    <>
      <Navbar />
      <main className="section py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-900 mb-2">Broadcast Management</h1>
          <p className="text-brand-700">Send targeted messages to alumni batches and manage communication history.</p>
        </div>

        {/* Broadcast Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-900">{broadcasts.length}</h3>
            <p className="text-brand-700">Total Broadcasts</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
              <Send className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-900">
              {broadcasts.filter(b => new Date(b.dateTime) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
            </h3>
            <p className="text-brand-700">Sent This Month</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-900">
              {broadcasts.reduce((total, b) => total + Math.max(1, (b.toYear - b.fromYear + 1) * 200), 0).toLocaleString()}
            </h3>
            <p className="text-brand-700">Total Recipients</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-900">
              {filteredBroadcasts.length}
            </h3>
            <p className="text-brand-700">Filtered Results</p>
          </div>
        </div>

        {/* Broadcast Creation Form */}
        <BroadcastForm />

        {/* Broadcast Filter */}
        <BroadcastFilter />

        {/* Error Message */}
        {error && (
          <div className="card bg-red-50 border-red-200 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-800">
                <MessageSquare className="h-5 w-5" />
                <span className="font-medium">Error loading broadcasts</span>
              </div>
              <button
                onClick={refreshBroadcasts}
                className="text-red-600 hover:text-red-800 text-sm underline"
              >
                Try Again
              </button>
            </div>
            <p className="text-red-600 text-sm mt-2">{error}</p>
          </div>
        )}

        {/* Broadcasts List */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-brand-900 mb-4">
            Broadcast History ({loading ? '...' : filteredBroadcasts.length})
          </h2>
          
          {loading ? (
            <div className="card text-center py-12">
              <div className="w-8 h-8 border-2 border-brand-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-brand-900 mb-2">Loading Broadcasts...</h3>
              <p className="text-brand-700">Please wait while we fetch your broadcast history.</p>
            </div>
          ) : filteredBroadcasts.length === 0 ? (
            <div className="card text-center py-12">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-brand-400" />
              <h3 className="text-xl font-semibold text-brand-900 mb-2">
                {broadcasts.length === 0 ? 'No Broadcasts Yet' : 'No Broadcasts Match Filter'}
              </h3>
              <p className="text-brand-700 mb-4">
                {broadcasts.length === 0 
                  ? 'Create your first broadcast to start communicating with alumni.' 
                  : 'Try adjusting your date filter to see more broadcasts.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBroadcasts.map(broadcast => (
                <BroadcastCard 
                  key={broadcast.id} 
                  broadcast={broadcast} 
                  showDeleteButton={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}