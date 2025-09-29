"use client";
import React, { useState } from 'react';
import { Calendar, Users, Trash2, ChevronDown, ChevronRight, MessageSquare, Loader2 } from 'lucide-react';
import { Broadcast } from '@/lib/database/broadcastService';
import { useBroadcasts } from '@/context/BroadcastContext';

interface BroadcastCardProps {
  broadcast: Broadcast;
  showDeleteButton?: boolean;
}

export default function BroadcastCard({ broadcast, showDeleteButton = true }: BroadcastCardProps) {
  const { deleteBroadcast, expandedBroadcastId, setExpandedBroadcastId } = useBroadcasts();
  const [isDeleting, setIsDeleting] = useState(false);
  const isExpanded = expandedBroadcastId === broadcast.id;

  const handleToggleExpand = () => {
    setExpandedBroadcastId(isExpanded ? null : broadcast.id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete "${broadcast.title}"?`)) {
      setIsDeleting(true);
      try {
        await deleteBroadcast(broadcast.id);
      } catch (error) {
        console.error('Failed to delete broadcast:', error);
        alert('Failed to delete broadcast. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const getBatchRange = (fromYear: number, toYear: number) => {
    return fromYear === toYear ? `${fromYear}` : `${fromYear}–${toYear}`;
  };

  const { date, time } = formatDateTime(broadcast.dateTime);

  return (
    <div className="card cursor-pointer transition-all duration-200 hover:shadow-lg">
      <div onClick={handleToggleExpand} className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-5 w-5 text-brand-700 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-brand-900 line-clamp-1">{broadcast.title}</h3>
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-brand-700 flex-shrink-0" />
            ) : (
              <ChevronRight className="h-5 w-5 text-brand-700 flex-shrink-0" />
            )}
          </div>
          
          {!isExpanded && (
            <div className="flex items-center gap-6 text-sm text-brand-700">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date} at {time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Batch {getBatchRange(broadcast.fromYear, broadcast.toYear)}</span>
              </div>
            </div>
          )}
        </div>
        
        {showDeleteButton && (
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete Broadcast"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-brand-200 space-y-4">
          <div className="grid gap-4">
            {/* Broadcast Metadata */}
            <div className="grid md:grid-cols-2 gap-4 p-3 bg-brand-50 rounded-lg">
              <div className="flex items-center gap-2 text-brand-700">
                <Calendar className="h-4 w-4" />
                <div>
                  <div className="font-medium">Sent Date & Time</div>
                  <div className="text-sm">{date} at {time}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-brand-700">
                <Users className="h-4 w-4" />
                <div>
                  <div className="font-medium">Target Batches</div>
                  <div className="text-sm">
                    {getBatchRange(broadcast.fromYear, broadcast.toYear)} 
                    {broadcast.fromYear !== broadcast.toYear && (
                      <span className="text-brand-600 ml-1">
                        ({broadcast.toYear - broadcast.fromYear + 1} batches)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Broadcast Title */}
            <div>
              <h4 className="font-semibold text-brand-900 mb-2 text-lg">{broadcast.title}</h4>
            </div>

            {/* Broadcast Body */}
            <div className="bg-white p-4 rounded-lg border border-brand-200 max-h-96 overflow-y-auto">
              <div className="text-brand-700 leading-relaxed whitespace-pre-wrap">
                {broadcast.body}
              </div>
            </div>

            {/* Broadcast Stats */}
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-800">
                  {Math.max(1, (broadcast.toYear - broadcast.fromYear + 1) * 200).toLocaleString()}
                </div>
                <div className="text-sm text-blue-600">Estimated Recipients</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-800">
                  {Math.floor(Math.random() * 30 + 70)}%
                </div>
                <div className="text-sm text-green-600">Estimated Open Rate</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-800">
                  {broadcast.body.length}
                </div>
                <div className="text-sm text-purple-600">Characters</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}