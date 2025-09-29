"use client";
import React, { useState } from 'react';
import { Plus, X, Send, AlertCircle } from 'lucide-react';
import { useBroadcasts } from '@/context/BroadcastContext';
import { CreateBroadcastData } from '@/lib/broadcastService';

interface BroadcastFormData extends CreateBroadcastData {}

export default function BroadcastForm() {
  const { addBroadcast, error: contextError } = useBroadcasts();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<BroadcastFormData>({
    title: '',
    body: '',
    fromYear: new Date().getFullYear() - 4, // Default to 4 years ago
    toYear: new Date().getFullYear() // Default to current year
  });

  const handleInputChange = (field: keyof BroadcastFormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const calculateRecipients = (fromYear: number, toYear: number) => {
    // Mock calculation - in real app this would come from actual data
    const yearsSpan = Math.max(1, toYear - fromYear + 1);
    const avgStudentsPerYear = 200;
    return yearsSpan * avgStudentsPerYear;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.body) {
      setError('Please fill in all required fields');
      return;
    }

    if (form.fromYear > form.toYear) {
      setError('From Year cannot be greater than To Year');
      return;
    }

    setIsLoading(true);
    setSent(false);
    setError(null);

    try {
      await addBroadcast(form);
      setSent(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create broadcast');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      body: '',
      fromYear: new Date().getFullYear() - 4,
      toYear: new Date().getFullYear()
    });
    setIsFormVisible(false);
    setSent(false);
    setIsLoading(false);
    setError(null);
  };

  if (!isFormVisible) {
    return (
      <div className="mb-6">
        <button 
          onClick={() => setIsFormVisible(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Create New Broadcast
        </button>
      </div>
    );
  }

  return (
    <div className="card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-brand-900">Create Broadcast Message</h2>
        <button 
          onClick={resetForm}
          className="p-2 hover:bg-brand-100 rounded-lg transition-colors"
          title="Close Form"
        >
          <X className="h-5 w-5 text-brand-700" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">
            Broadcast Title *
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter broadcast title"
            value={form.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {/* Batch Year Range */}
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">
            Target Batch Years *
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-brand-700 mb-1">From Year</label>
              <input
                type="number"
                className="input"
                placeholder="2020"
                min="2000"
                max={new Date().getFullYear()}
                value={form.fromYear}
                onChange={(e) => handleInputChange('fromYear', Number(e.target.value))}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-xs text-brand-700 mb-1">To Year</label>
              <input
                type="number"
                className="input"
                placeholder="2024"
                min="2000"
                max={new Date().getFullYear()}
                value={form.toYear}
                onChange={(e) => handleInputChange('toYear', Number(e.target.value))}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          
          {/* Recipients Info */}
          <div className="mt-2 p-3 bg-brand-50 rounded-lg">
            <div className="text-sm text-brand-700">
              <strong>Estimated Recipients:</strong> {calculateRecipients(form.fromYear, form.toYear).toLocaleString()} alumni
            </div>
            <div className="text-xs text-brand-600 mt-1">
              Targeting batches from {form.fromYear} to {form.toYear}
            </div>
          </div>
        </div>

        {/* Message Body */}
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">
            Message Body *
          </label>
          <textarea
            className="input resize-none"
            rows={8}
            placeholder="Enter your broadcast message here...&#10;&#10;You can use line breaks and formatting to structure your message."
            value={form.body}
            onChange={(e) => handleInputChange('body', e.target.value)}
            required
            disabled={isLoading}
          />
          <div className="text-xs text-brand-600 mt-1">
            {form.body.length} characters
          </div>
        </div>

        {/* Error Message */}
        {(error || contextError) && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 font-medium">
              <AlertCircle className="h-4 w-4" />
              Error
            </div>
            <div className="text-red-600 text-sm mt-1">
              {error || contextError}
            </div>
          </div>
        )}

        {/* Success Message */}
        {sent && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-green-800 font-medium">✓ Broadcast Sent Successfully!</div>
            <div className="text-green-600 text-sm mt-1">
              Your message has been delivered to {calculateRecipients(form.fromYear, form.toYear).toLocaleString()} recipients.
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button 
            type="submit" 
            className="btn-primary flex items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Broadcast
              </>
            )}
          </button>
          <button 
            type="button" 
            onClick={resetForm} 
            className="btn-ghost"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}