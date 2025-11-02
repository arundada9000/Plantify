# Plantify Frontend

**Stay focused, grow trees, save energy**

---

## Overview

The **frontend** of Plantify is a **Next.js + TypeScript** web application that provides the user and admin interfaces for the Plantify ecosystem.  
It is designed with a **gamified productivity approach** inspired by _Forest: Stay Focused, Be Present_, combining **Pomodoro technique**, **energy awareness**, and **environmental impact tracking**.

This frontend connects to a backend (Node.js + Express + MongoDB) but is **mock-data ready**, allowing local development even without API integration.

---

## Features

### User Interface

- User authentication (signup, login, logout) – mocked for development
- Pomodoro timer with custom and preset durations
- Tree growth animations using Framer Motion
- Energy-saving dashboard with tips and statistics
- Leaderboard showing ranks by Pomodoros, trees, and energy saved
- Community feed with full CRUD functionality for user posts
- Interactive plant map using **MapLibre**
- Profile page with streak tracking, achievements, and progress visualization
- Donation and partner showcase sections

### Admin Interface

- Separate admin login page (mocked)
- Dashboard with charts and summary cards
- CRUD management for users, posts, plants, donations, and partners
- Analytics visualization (Pomodoros, energy saved, active users, tree growth)
- Global campaign and challenge management

---

## Tech Stack

- **Framework:** Next.js (React + TypeScript)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** lucide-react
- **Animations:** Framer Motion
- **Maps:** MapLibre
- **State Management:** React Context / Zustand (depending on your implementation)
- **Data Handling:** Axios / Fetch API (mocked)

---

## Folder Structure

---

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Steps

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start the development server
npm run dev

# Open the app
# Visit http://localhost:3000
```

# Run development server

npm run dev

# Build for production

npm run build

# Start production server

npm start

# Lint and check formatting

npm run lint
