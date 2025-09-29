import { BlogPost } from '@/lib/database/blogService';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export interface CreateBlogData {
  title: string;
  body: string;
  fromYear: number;
  toYear: number;
}

export interface UpdateBlogData extends Partial<CreateBlogData> {
  author?: string;
}

class BlogService {
  private baseUrl = '/api/blogs';

  async getAllBlogs(fromDate?: string, toDate?: string): Promise<BlogPost[]> {
    try {
      let url = this.baseUrl;
      const params = new URLSearchParams();
      
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const result: ApiResponse<BlogPost[]> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch blogs');
      }
      
      return result.data || [];
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }

  async getBlogById(id: string): Promise<BlogPost> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const result: ApiResponse<BlogPost> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch blog');
      }
      
      if (!result.data) {
        throw new Error('Blog not found');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  }

  async createBlog(blogData: CreateBlogData): Promise<BlogPost> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const result: ApiResponse<BlogPost> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to create blog');
      }
      
      if (!result.data) {
        throw new Error('No blog data returned');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  }

  async updateBlog(id: string, updateData: UpdateBlogData): Promise<BlogPost> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result: ApiResponse<BlogPost> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update blog');
      }
      
      if (!result.data) {
        throw new Error('No blog data returned');
      }
      
      return result.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  }

  async deleteBlog(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<void> = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  }
}

export const blogService = new BlogService();