# Alumni Nexus - Next.js Application

## Overview
A modern alumni networking platform built with Next.js, React, and Tailwind CSS.

## Quick Setup & Fix

### 1. Install Dependencies
First, install all necessary dependencies:

```bash
npm install
```

### 2. Install Tailwind CSS (if not working properly)
If the styling is broken, install Tailwind CSS and its dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

- `app/` - Next.js 13+ app directory with pages and layouts
- `components/` - Reusable React components
- `context/` - React context providers (Auth)
- `lib/` - Utility functions and mock data
- `temp-styles.css` - Temporary CSS fallback for styling issues

## Features

- **Hero Landing Page** - Beautiful gradient hero section
- **Alumni Directory** - Browse and connect with fellow alumni
- **Blog System** - Share knowledge and insights
- **Event Management** - Discover and join alumni events
- **Mentorship Platform** - Connect mentors with mentees
- **Role-based Access** - Different dashboards for students and admins

## Styling

The project uses Tailwind CSS for styling with custom color schemes and components. If Tailwind isn't working properly, the `temp-styles.css` file provides fallback styles.

### Color Scheme
- Primary: `#19183B` (Dark Navy)
- Secondary: `#708993` (Teal)
- Accent: `#A1C2BD` (Light Teal)
- Background: `#E7F2EF` (Light Mint)

## Troubleshooting

### Styling Issues
1. Make sure all dependencies are installed: `npm install`
2. If Tailwind classes aren't working, the `temp-styles.css` provides fallback styling
3. Clear Next.js cache: `rm -rf .next` and restart the dev server

### Development Issues
1. Ensure you're using Node.js 16+ and npm 7+
2. Check for TypeScript errors in the terminal
3. Verify all required dependencies are in `package.json`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Dependencies

### Core
- Next.js 15.5.4
- React 19.1.1
- TypeScript 5.9.2

### UI & Styling
- Tailwind CSS 3.4.0
- Lucide React (icons)

### Development
- PostCSS & Autoprefixer
- TypeScript types for Node and React