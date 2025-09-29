import fs from 'fs';
import path from 'path';

export interface BlogPost {
  id: string;
  title: string;
  body: string;
  dateTime: string;
  fromYear: number;
  toYear: number;
  author: string;
}

const DB_PATH = path.join(process.cwd(), 'lib', 'database', 'blogs.json');

interface DatabaseData {
  blogs: BlogPost[];
}

// Ensure database file exists
function ensureDbExists() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialData: DatabaseData = { blogs: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    }
  } catch (error) {
    console.error('Error ensuring blog database exists:', error);
  }
}

// Read database
function readDatabase(): DatabaseData {
  try {
    ensureDbExists();
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blog database:', error);
    return { blogs: [] };
  }
}

// Write database
function writeDatabase(data: DatabaseData): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing blog database:', error);
    throw new Error('Failed to write to blog database');
  }
}

// Blog database operations
export const blogDb = {
  // Get all blogs with optional date filtering
  getAllBlogs(fromDate?: string, toDate?: string): BlogPost[] {
    const db = readDatabase();
    let blogs = db.blogs.sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());

    // Apply date filtering if provided
    if (fromDate || toDate) {
      blogs = blogs.filter(blog => {
        const blogDate = new Date(blog.dateTime);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        if (from && to) {
          return blogDate >= from && blogDate <= to;
        } else if (from) {
          return blogDate >= from;
        } else if (to) {
          return blogDate <= to;
        }
        return true;
      });
    }

    return blogs;
  },

  // Get blog by ID
  getBlogById(id: string): BlogPost | null {
    const db = readDatabase();
    return db.blogs.find(blog => blog.id === id) || null;
  },

  // Create new blog
  createBlog(blogData: Omit<BlogPost, 'id' | 'dateTime' | 'author'>): BlogPost {
    const db = readDatabase();
    
    const newBlog: BlogPost = {
      ...blogData,
      id: `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dateTime: new Date().toISOString(),
      author: "Admin" // Default author for admin-created blogs
    };

    db.blogs.unshift(newBlog); // Add to beginning for chronological order
    writeDatabase(db);
    
    return newBlog;
  },

  // Update blog
  updateBlog(id: string, updateData: Partial<Omit<BlogPost, 'id' | 'dateTime'>>): BlogPost | null {
    const db = readDatabase();
    const blogIndex = db.blogs.findIndex(blog => blog.id === id);
    
    if (blogIndex === -1) {
      return null;
    }

    db.blogs[blogIndex] = {
      ...db.blogs[blogIndex],
      ...updateData
    };

    writeDatabase(db);
    return db.blogs[blogIndex];
  },

  // Delete blog
  deleteBlog(id: string): boolean {
    const db = readDatabase();
    const blogIndex = db.blogs.findIndex(blog => blog.id === id);
    
    if (blogIndex === -1) {
      return false;
    }

    db.blogs.splice(blogIndex, 1);
    writeDatabase(db);
    return true;
  }
};