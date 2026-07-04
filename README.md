# 🚀 TalentForge AI – AI-Powered Interview Platform

TalentForge AI is a full-stack AI-powered mock interview platform built using the **MERN Stack** and **Google Gemini AI**. It helps students and job seekers prepare for technical interviews by generating interview questions, evaluating answers with AI, providing detailed feedback, tracking performance, and managing interviews through an admin dashboard.

---

## 🌐 Live Demo

**Frontend:** https://talent-forge-ai-ai-interview-platfo.vercel.app

**Backend API:** https://talentforge-ai-ai-interview-platform-production.up.railway.app

---

<!-- # 📸 Screenshots

> Add screenshots here after uploading them.

| Login | Dashboard |
|--------|-----------|
| ![Login](./assets/login.png) | ![Dashboard](./assets/dashboard.png) |

| AI Interview | Report |
|--------------|--------|
| ![Interview](./assets/interview.png) | ![Report](./assets/report.png) |

| Performance | Admin Dashboard |
|-------------|-----------------|
| ![Performance](./assets/performance.png) | ![Admin](./assets/admin.png) |

--- -->

# ✨ Features

## 👤 Student Module

- User Registration & Login
- JWT Authentication
- Profile Management
- Change Password
- Dashboard
- Create Custom Interviews
- AI Interview Generation
- Attempt Interviews
- AI Answer Evaluation
- Detailed Interview Reports
- Performance Analytics
- Leaderboard

---

## 🤖 AI Features

- Google Gemini AI Integration
- AI Generated Interview Questions
- AI Answer Evaluation
- AI Feedback
- Overall Interview Score
- Overall Interview Feedback

---

## 📊 Performance Tracking

- Average Score
- Highest Score
- Lowest Score
- Total Answers
- Recent Answers
- Interview Reports

---

## 👨‍💼 Admin Module

- Admin Login
- Admin Dashboard
- Manage Users
- Manage Questions
- Manage Interviews
- Delete Users
- Delete Questions
- Delete Interviews

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## AI

- Google Gemini AI

---

## Deployment

- Frontend → Vercel
- Backend → Railway
- Database → MongoDB Atlas

---

# 📂 Project Structure

```
TalentForge-AI
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── assets
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication

- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Student Access
- Admin Access

---

# 🤖 AI Workflow

```
Student Login
      │
      ▼
Generate/Create Interview
      │
      ▼
Attempt Interview
      │
      ▼
Submit Answers
      │
      ▼
Google Gemini AI
      │
      ▼
AI Evaluation
      │
      ▼
Score + Feedback
      │
      ▼
Performance Dashboard
```

---

# 📊 Database Schema

### User

- Name
- Email
- Password
- Role

### Question

- Title
- Description
- Topic
- Difficulty

### Interview

- Title
- Role
- Difficulty
- Questions
- Status

### Answer

- User
- Interview
- Question
- Answer
- Score
- Feedback

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/JangiliBunny/TalentForge-AI-AI-Interview-Platform.git
```

---

## Backend

```bash
cd backend
npm install
```

Create `.env`

```env
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run

```bash
npm run dev
```

---

# 🚀 Deployment

### Frontend

- Vercel

### Backend

- Railway

### Database

- MongoDB Atlas

---

# 📌 API Endpoints

## Authentication

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/profile
PUT    /api/auth/change-password
```

---

## Questions

```
GET    /api/questions
POST   /api/questions
GET    /api/questions/:id
PUT    /api/questions/:id
DELETE /api/questions/:id
```

---

## Interviews

```
GET    /api/interviews
POST   /api/interviews
GET    /api/interviews/:id
POST   /api/interviews/:id/submit
GET    /api/interviews/:id/report
```

---

## Dashboard

```
GET /api/dashboard/stats
GET /api/dashboard/performance
GET /api/dashboard/leaderboard
```

---

## Admin

```
GET    /api/admin/users
DELETE /api/admin/users/:id

GET    /api/admin/questions
DELETE /api/admin/questions/:id

GET    /api/admin/interviews
DELETE /api/admin/interviews/:id
```

---

# 📈 Future Enhancements

- Voice-Based Interviews
- Coding Interview Editor
- PDF Report Download
- Email Reports
- Charts & Analytics
- Notifications
- Interview History
- Resume Analyzer
- AI Career Guidance

---

# 💡 Learning Outcomes

This project helped in understanding:

- MERN Stack Development
- REST API Design
- JWT Authentication
- Role-Based Access Control
- MongoDB Aggregation
- AI Integration using Google Gemini
- Full Stack Deployment
- State Management
- API Integration
- Production Deployment

---

# 👨‍💻 Author

**Bunny Jangili**

- GitHub: https://github.com/JangiliBunny
- LinkedIn: www.linkedin.com/in/bunny-jangili

---