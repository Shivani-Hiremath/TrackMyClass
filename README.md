# TrackMyClass

A full stack MERN web application for academic and student management, enabling admins to manage batches, students, tests, marks, and fee status with role-based authentication.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Overview](#api-overview)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- **Role-based Authentication:** Secure login for Admins and Students using JWT and bcrypt.
- **Batch Management:** Admins can create, view, and delete batches.
- **Student Management:** Register students to batches, view student profiles, and update fee status.
- **Test Management:** Schedule tests for batches, enter and update marks.
- **Dashboards:** Separate dashboards for admins and students to view relevant information.
- **RESTful APIs:** Well-structured backend APIs for all major operations.
- **Modern UI:** Responsive and user-friendly interface built with React, Tailwind CSS, and Framer Motion.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios, React Router DOM
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, dotenv, cors
- **Other:** ESLint, REST API

---

## Project Structure

```
TrackMyClass-main/
  backend/
    config/
    controller/
    middleware/
    models/
    routes/
    .env
    server.js
    package.json
  frontend/
    public/
    src/
      components/
      api.jsx
      App.jsx
      ...
    index.html
    package.json
  package.json
  .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Shivani-Hiremath/Dump.git
   cd Dump/TrackMyClass-main
   ```

2. **Backend Setup:**
   ```sh
   cd backend
   npm install
   # Create a .env file with your MongoDB URI, PORT, and JWT_SECRET
   ```

3. **Frontend Setup:**
   ```sh
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server:**
   ```sh
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start the frontend dev server:**
   ```sh
   cd ../frontend
   npm run dev
   # App runs on http://localhost:5173 (default Vite port)
   ```

---

## API Overview

### Authentication

- `POST /auth/register-admin` — Register a new admin
- `POST /auth/register-student` — Register a new student to a batch
- `POST /auth/login` — Login as admin or student

### Batch Management

- `GET /batches/all` — Get all batches
- `POST /batches/add` — Add a new batch
- `GET /batches/:batchId` — Get batch details
- `DELETE /batches/:id` — Delete a batch

### Student Management

- `GET /auth/students/:batchId` — Get all students in a batch
- `GET /auth/student/:studentId` — Get student profile

### Test Management

- `POST /tests/create-test` — Create a new test for a batch
- `GET /tests/tests/:batchId` — Get all tests for a batch
- `GET /tests/test/:testId` — Get test details
- `GET /tests/test/:testId/students` — Get students for a test
- `POST /tests/test/:testId/marks` — Submit marks for students in a test

---

## Screenshots
![Login](./screenshots/admin-dashboard.png)
![Admin Dashboard](./screenshots/admin-dashboard.png)



---

## Author

- [Shivani Hiremath](https://github.com/Shivani-Hiremath)
