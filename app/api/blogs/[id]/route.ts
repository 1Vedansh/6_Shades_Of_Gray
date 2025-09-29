import { NextRequest, NextResponse } from 'next/server';
import { blogDb } from '@/lib/database/blogService';

// GET /api/blogs/[id] - Get blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const blog = blogDb.getBlogById(id);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      data: blog 
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Check if blog exists
    const existingBlog = blogDb.getBlogById(id);
    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Validate year range if provided
    if (body.fromYear !== undefined && body.toYear !== undefined) {
      if (typeof body.fromYear !== 'number' || typeof body.toYear !== 'number') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'fromYear and toYear must be numbers' 
          },
          { status: 400 }
        );
      }

      if (body.fromYear > body.toYear) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'fromYear cannot be greater than toYear' 
          },
          { status: 400 }
        );
      }
    }

    // Validate title and body length if provided
    if (body.title && body.title.trim().length < 3) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Title must be at least 3 characters long' 
        },
        { status: 400 }
      );
    }

    if (body.body && body.body.trim().length < 10) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Blog body must be at least 10 characters long' 
        },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    
    if (body.title) updateData.title = body.title.trim();
    if (body.body) updateData.body = body.body.trim();
    if (body.fromYear !== undefined) updateData.fromYear = body.fromYear;
    if (body.toYear !== undefined) updateData.toYear = body.toYear;
    if (body.author) updateData.author = body.author.trim();

    const updatedBlog = blogDb.updateBlog(id, updateData);
    
    return NextResponse.json({
      success: true,
      data: updatedBlog,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = blogDb.deleteBlog(id);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}