# Plantify Backend

**Stay focused, grow trees, save energy**

---

## Overview

The **Plantify Backend** is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB**, providing all the core functionalities for the Plantify ecosystem.  
It manages user data, Pomodoro sessions, community posts, plants, donations, partners, and admin operations.

The backend is designed to be **fully CRUD-capable**, modular, and easily extendable to real integrations (like tree-planting APIs).  
During development or hackathon mode, it can run with **mock data** to simulate API responses.

---

## Hackathon Info

- **Event:** Nepathon Volume 1
- **Team Name:** DevNet
- **Members:**
  - Arun Neupane – Frontend Developer
  - Aayush Chapagain – UI/UX Designer
  - Bibek Bhusal – Backend Developer
  - Bal Gobind Chaudhary – Fullstack Developer

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens) _(mocked for development)_
- **Data Validation:** Joi / Zod _(depending on implementation)_
- **Logging:** Morgan / Winston
- **Environment Management:** dotenv
- **Deployment:** Render / Railway / Vercel (API)

---

## Features

### Core Functionalities

- **User Management**

  - Register, login, logout (mocked or real)
  - Retrieve, update, delete user profiles
  - Role-based access control (User, Admin)

- **Pomodoro Sessions**

  - Track completed Pomodoro sessions
  - Store duration, timestamp, and energy saved
  - Aggregate statistics for dashboards

- **Plant Management**

  - CRUD for virtual and real plants
  - Record tree planting data with geolocation and images
  - Integration-ready for real planting APIs

- **Community Posts**

  - CRUD operations for user posts
  - Likes, comments, and report functionality
  - Admin moderation support

- **Donations & Partners**

  - CRUD for donation entries and partner organizations
  - API-ready for payment or NGO integrations

- **Analytics**

  - Generate metrics (Pomodoros completed, trees planted, users active)
  - Serve aggregated data for dashboard charts

- **Admin Operations**
  - Manage users, posts, plants, donations, and partners
  - Moderate community posts (approve/edit/delete)
  - Manage global campaigns and challenges

---

## Folder Structure

---

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)

### Steps

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Fill in MongoDB URI, JWT secret, etc.

# Run development server
npm run dev

# For production
npm start
```

PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/plantify
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Run development server with nodemon

npm run dev

# Start production server

npm start

# Lint code

npm run lint
