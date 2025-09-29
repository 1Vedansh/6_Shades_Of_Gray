"use client";
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { EventType } from '@/lib/mockData';
import { useEvents } from '@/context/EventContext';

interface EventFormData {
  title: string;
  type: EventType;
  date: string;
  venue: string;
  capacity: number;
  description: string;
  alumniList: string[];
}

export default function EventForm() {
  const { addEvent, alumni } = useEvents();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState<EventFormData>({
    title: '',
    type: 'gathering',
    date: '',
    venue: '',
    capacity: 100,
    description: '',
    alumniList: []
  });

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAlumniSelection = (alumniName: string) => {
    setForm(prev => ({
      ...prev,
      alumniList: prev.alumniList.includes(alumniName)
        ? prev.alumniList.filter(name => name !== alumniName)
        : [...prev.alumniList, alumniName]
    }));
  };

  const removeAlumniFromSelection = (alumniName: string) => {
    setForm(prev => ({
      ...prev,
      alumniList: prev.alumniList.filter(name => name !== alumniName)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.date || !form.venue || !form.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (form.type === 'guidance' && form.alumniList.length === 0) {
      alert('Please select at least one alumni member for guidance sessions');
      return;
    }

    try {
      await addEvent(form);
      
      // Reset form
      setForm({
        title: '',
        type: 'gathering',
        date: '',
        venue: '',
        capacity: 100,
        description: '',
        alumniList: []
      });
      
      setIsFormVisible(false);
    } catch (error) {
      alert('Failed to create event. Please try again.');
      console.error('Error creating event:', error);
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      type: 'gathering',
      date: '',
      venue: '',
      capacity: 100,
      description: '',
      alumniList: []
    });
    setIsFormVisible(false);
  };

  if (!isFormVisible) {
    return (
      <div className="mb-6">
        <button 
          onClick={() => setIsFormVisible(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Create New Event
        </button>
      </div>
    );
  }

  return (
    <div className="card mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-brand-900">Create New Event</h2>
        <button 
          onClick={resetForm}
          className="p-2 hover:bg-brand-100 rounded-lg transition-colors"
          title="Close Form"
        >
          <X className="h-5 w-5 text-brand-700" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">
            Event Title *
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter event title"
            value={form.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">
            Event Type *
          </label>
          <select
            className="input"
            value={form.type}
            onChange={(e) => handleInputChange('type', e.target.value as EventType)}
            required
          >
            <option value="gathering">General Alumni Gathering</option>
            <option value="guidance">Guidance/Session</option>
          </select>
        </div>

        {/* Alumni Selection for Guidance Events */}
        {form.type === 'guidance' && (
          <div>
            <label className="block text-sm font-medium text-brand-900 mb-1">
              Select Alumni Members *
            </label>
            <div className="bg-brand-50 p-3 rounded-lg space-y-2">
              <div className="text-sm text-brand-700 mb-2">Choose alumni who will participate in this guidance session:</div>
              <div className="space-y-2">
                {alumni.map((alumniMember) => (
                  <label key={alumniMember.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-brand-300 text-brand-700 focus:ring-brand-700"
                      checked={form.alumniList.includes(alumniMember.name)}
                      onChange={() => handleAlumniSelection(alumniMember.name)}
                    />
                    <span className="text-sm text-brand-900">
                      {alumniMember.name} - {alumniMember.role} at {alumniMember.company}
                    </span>
                  </label>
                ))}
              </div>
              
              {/* Selected Alumni Display */}
              {form.alumniList.length > 0 && (
                <div className="mt-3 pt-2 border-t border-brand-200">
                  <div className="text-sm font-medium text-brand-900 mb-2">Selected Alumni:</div>
                  <div className="flex flex-wrap gap-2">
                    {form.alumniList.map((alumniName) => (
                      <span 
                        key={alumniName}
                        className="flex items-center gap-1 px-2 py-1 bg-brand-200 text-brand-800 rounded-full text-sm"
                      >
                        {alumniName}
                        <button
                          type="button"
                          onClick={() => removeAlumniFromSelection(alumniName)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Date and Venue */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-900 mb-1">
              Date *
            </label>
            <input
              type="date"
              className="input"
              value={form.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-900 mb-1">
              Venue/Location *
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g., Main Auditorium, Online, etc."
              value={form.venue}
              onChange={(e) => handleInputChange('venue', e.target.value)}
              required
            />
          </div>
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">
            Capacity *
          </label>
          <input
            type="number"
            className="input"
            placeholder="Maximum number of attendees"
            min="1"
            value={form.capacity}
            onChange={(e) => handleInputChange('capacity', Number(e.target.value))}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-brand-900 mb-1">
            Description *
          </label>
          <textarea
            className="input resize-none"
            rows={4}
            placeholder="Provide a detailed description of the event..."
            value={form.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button type="submit" className="btn-primary">
            Create Event
          </button>
          <button type="button" onClick={resetForm} className="btn-ghost">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}