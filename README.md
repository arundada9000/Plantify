# Plantify

**Tagline: Stay focused, grow trees, save energy**

Canva Link : https://www.canva.com/design/DAG3eqCim-A/jXaDFWRgevchbmtf0EHf4w/edit?utm_content=DAG3eqCim-A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

---

## Overview

**Plantify** is a gamified productivity web application that combines the **Pomodoro technique** with **sustainability and energy awareness**.  
Inspired by _Forest: Stay Focused, Be Present_, the app rewards users with virtual trees for completing Pomodoro sessions. After accumulating enough trees, a real tree is planted and displayed on the global map, allowing everyone to see the collective environmental impact.

The application supports both **User** and **Admin** roles, is **fully CRUD-ready**, and uses **mock data** for easy integration with real APIs in the future.

---

## Hackathon Information

- **Project for:** Nepathon Volume 1
- **Team Name:** DevNet
- **Members:**
  - Arun Neupane – Frontend Developer
  - Aayush Chapagain – UI/UX Designer
  - Bibek Bhusal – Backend Developer
  - Bal Gobind Chaudhary – Fullstack Developer

---

## Tech Stack

**Frontend**

- Next.js (React + TypeScript)
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations
- Lucide-react for icons
- MapLibre for maps

**Backend**

- Node.js
- Express.js
- MongoDB (Mongoose)
- RESTful API architecture

**Other Tools**

- Vercel / Netlify for deployment
- GitHub for version control
- Mock data for demonstration and testing

---

## Features

### User Features

1. **Authentication**

   - Sign up, login, and logout (mocked)
   - Profile dashboard showing Pomodoros, streaks, trees grown, and energy saved

2. **Pomodoro Timer**

   - Classic 25-min focus + 5-min break cycle
   - Preset timers: 15, 25, 50, and 90 minutes
   - Custom timer option
   - Completion modal:  
     “You grew a plant and saved 25 minutes of energy! Take a 5-minute break from your device.”
   - Tree growth animation and circular progress display

3. **Energy-Saving Tracker**

   - Dashboard tracking total energy saved
   - Energy-saving tips and awareness messages

4. **Leaderboard**

   - Ranks users by Pomodoros, trees planted, and energy saved
   - Displays avatar, username, rank, and stats

5. **Streaks & Rewards**

   - Daily streak tracking
   - Gamified badges for achievements (e.g., “Eco Warrior”)

6. **Plant Map**

   - Interactive world map showing all planted trees
   - Filter by user or region
   - Marker popups: plant name, planted by, date, photo

7. **Community Feed (CRUD-Enabled)**

   - Users can create, read, update, and delete their own posts
   - Posts include username, avatar, image, caption, likes, and comments
   - Report button for moderation
   - Paginated or infinite-scroll feed

8. **Donations & Partnerships**

   - Donation section with mock data
   - Partner organization showcase with logos, descriptions, and links
   - Example: “For every 1000 Pomodoros, we donate to solar panel installations.”

9. **Dashboard / Profile**
   - Displays total Pomodoros, trees grown, energy saved, and streaks
   - Editable profile (name, avatar, preferences)
   - Achievement badges and visual forest overview

---

### Admin Features

1. Admin login (mocked)
2. Dashboard overview with statistics and charts
3. User management (CRUD + role management)
4. Post management (CRUD + moderation)
5. Plant management (CRUD)
6. Donation management (CRUD)
7. Partner management (CRUD)
8. Analytics (Pomodoros, energy saved, active users, plant growth)
9. Manage global challenges or campaigns

---

## Real-World Integration Concept

For every **15 virtual trees**, a **real tree** will be planted.  
Once planted, the app posts the tree’s **photo and geolocation** to the shared map, letting everyone see who contributed and where trees have been planted.

---

# App Screenshots
> A visual tour of the app features.

---

## Gallery

### 1. Home Screen
![Home Screen](/images/timer.jpeg)

### 2. Login / Signup
![Award](/images/award.jpeg)

### 3. Dashboard
![Map](/images/map.jpeg)

### 4. Feature 1
![Community](/images/community.jpeg)

### 5. Feature 2
![Profile](/images/profile.jpeg)

### 6. Settings
![About](/images/about.jpeg)

---

## How to View
All screenshots are stored locally in the `out/images` folder. You can also open them directly from your system or view them on GitHub after pushing the repository.

---

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB running locally or accessible via cloud (MongoDB Atlas)

### Steps

```bash
# Clone the repository
git clone https://github.com/arundada9000/plantify.git

# Navigate to the project directory
cd plantify

# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Backend (if separated)
cd backend
npm install
npm run dev
```
