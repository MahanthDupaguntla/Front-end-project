# 🎓 CampusPulse - Student Activity Management Platform

A modern, centralized digital platform for organizing and managing student extracurricular activities in educational institutions. Built with **React**, **Next.js**, and **JavaScript** with a focus on advanced UI/UX.

![CampusPulse Banner](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 👨‍💼 For Administrators / Faculty
- 📅 **Event Management** - Create, schedule, and manage extracurricular activities
- ✅ **Registration Management** - Approve/deny student registrations with bulk operations
- 📊 **Reports & Analytics** - Generate comprehensive reports on participation and engagement
- 🔔 **Announcements** - Send notifications and reminders to students
- 🎖️ **Certificate Generation** - Automated certificate creation for participants
- 🚨 **Conflict Detection** - Automatic detection of scheduling conflicts

### 👨‍🎓 For Students
- 🔍 **Browse Events** - Explore activities with powerful search and filters
- 📝 **Easy Registration** - Register online with real-time capacity tracking
- 📅 **Calendar Integration** - Add events to personal calendars
- 🏆 **Achievement Tracking** - View participation history and download certificates
- 🔔 **Real-time Notifications** - Stay updated with instant alerts
- 💬 **Feedback System** - Provide feedback on completed activities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to the project directory
cd campuspulse

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Demo Credentials

The application comes with pre-configured demo accounts:

### Admin Account
- **Email:** `admin@campus.edu`
- **Password:** `admin123`
- **Access:** Full administrative dashboard with event management, registrations, and reports

### Student Account
- **Email:** `student@campus.edu`
- **Password:** `student123`
- **Access:** Student dashboard with event browsing, registration, and activity tracking

## 📂 Project Structure

```
campuspulse/
├── app/                      # Next.js App Router pages
│   ├── page.jsx             # Landing page
│   ├── login/               # Authentication
│   ├── dashboard/           # Student dashboard
│   ├── events/              # Event browsing
│   ├── my-activities/       # Student activity tracking
│   └── admin/               # Admin pages
│       ├── page.jsx         # Admin dashboard
│       ├── events/          # Event management
│       ├── registrations/   # Registration management
│       └── reports/         # Analytics & reports
├── components/
│   ├── ui/                  # shadcn/ui components
│   └── layout/              # Layout components (Navbar)
├── lib/
│   ├── auth-context.js      # Authentication context
│   ├── mock-data.js         # Demo data
│   └── utils.js             # Utility functions
└── public/                  # Static assets
```

## 🎨 Tech Stack

- **Framework:** Next.js 16.0 (App Router)
- **UI Library:** React 19.2
- **Styling:** Tailwind CSS 4.0
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Notifications:** Sonner
- **Language:** JavaScript (ES6+)

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🌟 Key Features Explained

### Smart Scheduling
Events are created with automatic conflict detection to prevent double-booking of venues, times, or organizers.

### Registration Management
- Automatic capacity management
- Waitlist functionality when events are full
- Bulk approval/rejection of registrations
- Real-time seat availability

### Analytics Dashboard
Comprehensive insights including:
- Total events and registrations
- Attendance rates and trends
- Top performing clubs
- Engagement metrics
- Export capabilities (CSV/PDF)

### User Experience
- Modern, gradient-based UI design
- Responsive on all devices
- Smooth transitions and animations
- Accessible navigation
- Toast notifications for feedback

## 📱 Pages Overview

### Public Pages
- **Landing Page** (`/`) - Feature showcase and login access
- **Login Page** (`/login`) - Authentication with demo credentials

### Student Pages
- **Dashboard** (`/dashboard`) - Overview of activities and notifications
- **Events** (`/events`) - Browse and filter all available events
- **My Activities** (`/my-activities`) - Track registrations and achievements

### Admin Pages
- **Admin Dashboard** (`/admin`) - KPIs and quick actions
- **Event Management** (`/admin/events`) - CRUD operations for events
- **Registrations** (`/admin/registrations`) - Approve/manage student registrations
- **Reports** (`/admin/reports`) - Analytics and export functionality

## 🎯 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Email notifications with templates
- [ ] QR code check-in system
- [ ] Certificate PDF generation
- [ ] Advanced analytics with charts
- [ ] Mobile app version
- [ ] SSO integration
- [ ] Multi-language support

## 🤝 Contributing

This is a project for educational purposes. Feel free to fork and customize for your institution's needs.

## 📄 License

MIT License - feel free to use this project for educational purposes.

## 👨‍💻 Developer

Built with ❤️ using modern web technologies and best practices.

---

**Note:** This application uses mock data for demonstration. For production use, integrate with a backend API and database.
