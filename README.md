# TODO

A full-stack Todo Management Dashboard built using the MERN stack.
This application allows users to create, view, update, delete, and manage todo items with authentication and a clean dashboard UI.

Features

User authentication (Login / Logout)

Create, Read, Update, Delete (CRUD) todos

Toggle todo status (in-progress / completed)

Dashboard-based layout (no page reloads)

Instant UI updates without refetching

Confirmation before delete

Toast notifications for success and errors

Description limit enforced (max 500 characters)

Responsive design

Tech Stack
Frontend

React

React Router

Tailwind CSS

Lucide Icons

React Hot Toast

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Clone the repository

git clone https://github.com/AnusreeE719/TODO.git

cd todo

Backend Setup

cd backend

npm install

Create .env file

PORT=2026

MONGO_URI=your_mongo_uri_here

JWT_SECRET=your_jwt_secret

NODE_ENV=development

Run the server

npm run dev

Frontend Setup

cd frontend

npm install

npm run dev