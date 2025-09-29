import { NextRequest, NextResponse } from 'next/server';
import { blogDb } from '@/lib/database/blogService';

// GET /api/blogs - Fetch all blogs with optional date filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fromDate = searchParams.get('fromDate') || undefined;
    const toDate = searchParams.get('toDate') || undefined;

    const blogs = blogDb.getAllBlogs(fromDate, toDate);
    
    return NextResponse.json({ 
      success: true, 
      data: blogs,
      count: blogs.length
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { title, body: blogBody, fromYear, toYear } = body;
    
    if (!title || !blogBody || fromYear === undefined || toYear === undefined) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: title, body, fromYear, toYear' 
        },
        { status: 400 }
      );
    }

    // Validate year range
    if (typeof fromYear !== 'number' || typeof toYear !== 'number') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'fromYear and toYear must be numbers' 
        },
        { status: 400 }
      );
    }

    if (fromYear > toYear) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'fromYear cannot be greater than toYear' 
        },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    if (fromYear < 1900 || fromYear > currentYear + 10 || toYear < 1900 || toYear > currentYear + 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid year range. Years must be between 1900 and ' + (currentYear + 10)
        },
        { status: 400 }
      );
    }

    // Validate title and body length
    if (title.trim().length < 3) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Title must be at least 3 characters long' 
        },
        { status: 400 }
      );
    }

    if (blogBody.trim().length < 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Blog body must be at least 10 characters long' 
        },
        { status: 400 }
      );
    }

    // Create the blog
    const blogData = {
      title: title.trim(),
      body: blogBody.trim(),
      fromYear,
      toYear
    };

    const newBlog = blogDb.createBlog(blogData);
    
    return NextResponse.json(
      { 
        success: true, 
        data: newBlog,
        message: 'Blog post created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}