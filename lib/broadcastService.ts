import { Broadcast } from '@/lib/database/broadcastService';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export interface CreateBroadcastData {
  title: string;
  body: string;
  fromYear: number;
  toYear: number;
}

export interface UpdateBroadcastData extends Partial<CreateBroadcastData> {}

class BroadcastService {
  private baseUrl = '/api/broadcasts';

  async getAllBroadcasts(fromDate?: string, toDate?: string): Promise<Broadcast[]> {
    try {
      let url = this.baseUrl;
      const params = new URLSearchParams();
      
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const result: ApiResponse<Broadcast[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch broadcasts');
      }
      
      return result.data || [];
    } catch (error) {
      console.error('Error fetching broadcasts:', error);
      throw error;
    }
  }

  async getBroadcastById(id: string): Promise<Broadcast> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const result: ApiResponse<Broadcast> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch broadcast');
      }
      
      if (!result.data) {
        throw new Error('Broadcast not found');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching broadcast:', error);
      throw error;
    }
  }

  async createBroadcast(broadcastData: CreateBroadcastData): Promise<Broadcast> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(broadcastData),
      });

      const result: ApiResponse<Broadcast> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create broadcast');
      }
      
      if (!result.data) {
        throw new Error('No broadcast data returned');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error creating broadcast:', error);
      throw error;
    }
  }

  async updateBroadcast(id: string, updateData: UpdateBroadcastData): Promise<Broadcast> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result: ApiResponse<Broadcast> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update broadcast');
      }
      
      if (!result.data) {
        throw new Error('No broadcast data returned');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error updating broadcast:', error);
      throw error;
    }
  }

  async deleteBroadcast(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<void> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete broadcast');
      }
    } catch (error) {
      console.error('Error deleting broadcast:', error);
      throw error;
    }
  }
}

export const broadcastService = new BroadcastService();