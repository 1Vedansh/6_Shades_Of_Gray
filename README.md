# Alumni Nexus

Alumni networking platform built with Next.js, React, and TypeScript.

## Tech Stack

- Next.js 15.5.4
- React 19.1.1
- TypeScript 5.9.2
- Tailwind CSS 3.4.0
- Lucide React (icons)

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Landing page
├── login/              # Authentication
├── admin/              # Admin dashboard
│   ├── page.tsx       # Admin dashboard
│   ├── blog/          # Blog management
│   ├── broadcasts/    # Broadcast management
│   └── events/        # Event management
├── student/           # Student dashboard
│   ├── page.tsx      # Student dashboard
│   ├── blog/         # Blog reading
│   ├── directory/    # Alumni directory
│   ├── events/       # Event discovery
│   └── mentorship/   # Mentorship booking
└── api/              # API routes
    ├── blogs/        # Blog CRUD
    ├── broadcasts/   # Broadcast CRUD
    └── events/       # Event CRUD

components/           # React components
context/             # Context providers
lib/                 # Utilities and services
├── database/        # JSON database files
└── mockData.ts      # Sample data
```

## Features

### Authentication
- Role-based login (student/admin)
- Context-based auth state management

### Student Features
- Dashboard with announcements
- Alumni directory browsing
- Event discovery and RSVP
- Blog reading
- Mentorship booking

### Admin Features
- Event creation and management
- Broadcast system for announcements
- Blog content management
- User analytics dashboard

### Data Management
- JSON-based file storage
- Full CRUD operations via API routes
- Real-time updates with React Context

## Setup

### Prerequisites
- Node.js 18.0+
- npm 9.0+

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:3000

### Production
```bash
npm run build
npm start
```

## API Routes

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create blog
- `GET /api/blogs/[id]` - Get blog by ID
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event
- `GET /api/events/[id]` - Get event by ID
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Broadcasts
- `GET /api/broadcasts` - Get all broadcasts
- `POST /api/broadcasts` - Create broadcast
- `GET /api/broadcasts/[id]` - Get broadcast by ID
- `PUT /api/broadcasts/[id]` - Update broadcast
- `DELETE /api/broadcasts/[id]` - Delete broadcast

## Database

Uses JSON files for data storage:
- `lib/database/blogs.json`
- `lib/database/events.json`
- `lib/database/broadcasts.json`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Next.js 15.5.4 with App Router
- **UI Library**: React 19.1.1 with Hooks and Context API
- **Language**: TypeScript 5.9.2 for type safety
- **Styling**: Tailwind CSS 3.4.0 with custom animations
- **Icons**: Lucide React for consistent iconography
- **Fonts**: Inter font family for modern typography

### **Backend & Data**
- **API Routes**: Next.js API routes for server-side logic
- **Database**: JSON-based file storage system
- **Authentication**: Custom role-based authentication
- **State Management**: React Context API for global state
- **Data Services**: Custom service layers for each feature

### **Development Tools**
- **Build Tool**: Next.js with automatic optimization
- **CSS Processing**: PostCSS with Autoprefixer
- **Type Checking**: TypeScript with strict mode
- **Hot Reload**: Next.js dev server with fast refresh

## 📁 Project Structure

```
├── app/                          # Next.js 15 App Router
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page with hero section
│   ├── admin/                   # Admin dashboard and management
│   │   ├── page.tsx            # Admin command center
│   │   ├── blog/               # Blog content management
│   │   ├── broadcasts/         # Broadcast management system
│   │   └── events/             # Event planning and management
│   ├── api/                     # Server-side API routes
│   │   ├── blogs/              # Blog CRUD operations
│   │   ├── broadcasts/         # Broadcast API endpoints
│   │   └── events/             # Event management API
│   ├── login/                   # Authentication interface
│   └── student/                 # Student dashboard and features
│       ├── page.tsx            # Student dashboard
│       ├── blog/               # Blog reading interface
│       ├── directory/          # Alumni directory
│       ├── events/             # Event discovery
│       └── mentorship/         # Mentorship booking
├── components/                   # Reusable React components
│   ├── BlogCard.tsx            # Blog post display component
│   ├── BlogFilter.tsx          # Blog filtering controls
│   ├── BlogForm.tsx            # Blog creation/editing form
│   ├── BroadcastCard.tsx       # Broadcast display component
│   ├── BroadcastFilter.tsx     # Broadcast filtering
│   ├── BroadcastForm.tsx       # Broadcast creation form
│   ├── EventCard.tsx           # Event display component
│   ├── EventForm.tsx           # Event creation form
│   ├── LogoutButton.tsx        # Logout functionality
│   ├── Navbar.tsx              # Dynamic navigation component
│   └── StudentEventCard.tsx    # Student-specific event display
├── context/                     # React Context providers
│   ├── AuthContext.tsx         # Authentication state management
│   ├── BlogContext.tsx         # Blog state and operations
│   ├── BroadcastContext.tsx    # Broadcast state management
│   └── EventContext.tsx        # Event state and CRUD operations
├── lib/                         # Utility libraries and services
│   ├── auth.ts                 # Authentication utilities
│   ├── blogService.ts          # Blog API service layer
│   ├── broadcastService.ts     # Broadcast API service
│   ├── eventService.ts         # Event API service layer
│   ├── mockData.ts             # Sample data and type definitions
│   └── database/               # JSON database storage
│       ├── blogs.json          # Blog posts database
│       ├── broadcasts.json     # Broadcasts database
│       ├── events.json         # Events database
│       └── [service files]     # Database service implementations
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── next-env.d.ts               # Next.js type declarations
```

## 🚦 Getting Started

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/alumni-nexus.git
   cd alumni-nexus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Color Palette

The application uses a carefully crafted color system based on professional, modern tones:

```css
/* Primary Colors */
--brand-50: #f4f8f6    /* Lightest tint */
--brand-100: #E7F2EF   /* Light background */
--brand-200: #d1e5df   /* Subtle borders */
--brand-300: #A1C2BD   /* Accent elements */
--brand-400: #A1C2BD   /* Primary accent */
--brand-700: #708993   /* Secondary elements */
--brand-900: #19183B   /* Primary text/dark */
--brand-950: #0f0e24   /* Darkest shade */
```

### Typography

- **Primary Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Features**: Variable font with optimized loading

### Components

- **Cards**: Elevated surfaces with subtle shadows and hover effects
- **Buttons**: Multiple variants (primary, ghost, minimal) with animations
- **Navigation**: Sticky navbar with role-based menu items
- **Forms**: Consistent styling with validation states
- **Animations**: Smooth transitions and floating elements

## 🔧 Configuration

### Environment Setup

The application uses file-based storage by default. For production deployment, consider:

1. **Database Migration**: Replace JSON storage with a proper database (PostgreSQL, MongoDB)
2. **Authentication**: Implement proper JWT or OAuth authentication
3. **Environment Variables**: Add configuration for different environments
4. **Image Storage**: Set up cloud storage for user uploads

### Customization

#### Tailwind Configuration

Modify `tailwind.config.ts` to customize:
- Color schemes
- Animation timings
- Custom utilities
- Component styles

#### Brand Customization

Update brand colors and fonts in:
- `tailwind.config.ts` - Color palette
- `app/globals.css` - Global styles
- `app/layout.tsx` - Font imports

## 📱 Usage Guide

### For Students

1. **Login**: Use the student role to access the student dashboard
2. **Explore**: Browse the alumni directory and upcoming events
3. **Connect**: Read blog posts and engage with content
4. **Network**: Book mentorship sessions and RSVP to events
5. **Stay Updated**: Check announcements in the broadcast section

### For Administrators

1. **Access Admin Panel**: Login with admin credentials
2. **Manage Events**: Create and organize alumni events
3. **Send Broadcasts**: Communicate with specific graduation cohorts
4. **Content Management**: Moderate and feature blog posts
5. **Analytics**: Monitor platform engagement and usage

## 🧪 API Documentation

### Blog Endpoints

```typescript
GET /api/blogs              # Fetch all blogs with optional date filtering
POST /api/blogs             # Create new blog post
GET /api/blogs/[id]         # Get specific blog post
PUT /api/blogs/[id]         # Update blog post
DELETE /api/blogs/[id]      # Delete blog post
```

### Event Endpoints

```typescript
GET /api/events             # Fetch all events
POST /api/events            # Create new event
GET /api/events/[id]        # Get specific event
PUT /api/events/[id]        # Update event
DELETE /api/events/[id]     # Delete event
```

### Broadcast Endpoints

```typescript
GET /api/broadcasts         # Fetch all broadcasts with date filtering
POST /api/broadcasts        # Create new broadcast
GET /api/broadcasts/[id]    # Get specific broadcast
PUT /api/broadcasts/[id]    # Update broadcast
DELETE /api/broadcasts/[id] # Delete broadcast
```


## 📊 Roadmap

### Upcoming Features

- [ ] **Real Database Integration**: PostgreSQL/MongoDB support
- [ ] **Advanced Analytics**: Detailed engagement metrics and reporting
- [ ] **Email Notifications**: Automated email system for events and broadcasts
- [ ] **Mobile App**: React Native mobile application
- [ ] **Advanced Search**: Full-text search across all content
- [ ] **Social Features**: Likes, comments, and social interactions
- [ ] **File Uploads**: Profile pictures and document sharing
- [ ] **Calendar Integration**: Sync events with external calendars

### Technical Improvements

- [ ] **Performance Monitoring**: Integration with monitoring tools
- [ ] **Automated Testing**: Comprehensive test suite with CI/CD
- [ ] **Docker Support**: Containerization for easy deployment
- [ ] **CDN Integration**: Optimized asset delivery
- [ ] **Progressive Web App**: PWA features for mobile experience


---

<div align="center">
  <p>Built with ❤️ for the alumni community</p>
  <p><strong>Alumni Nexus</strong> - Where connections flourish, knowledge flows, and futures are built</p>
</div>

---

**Version**: 1.0.0  
**Last Updated**: September 30, 2025  
**Minimum Node.js**: 18.0+  
**License**: ISC