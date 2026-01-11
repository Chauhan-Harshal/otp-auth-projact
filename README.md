# otp-auth-projact
# 🔐 OTP Authentication API

A secure Node.js authentication system with OTP (One-Time Password) verification, built using Express.js, MongoDB, and JWT tokens.

---

## 🚀 Features

- User Registration with Email OTP verification
- Secure OTP verification (expires in 10 minutes)
- JWT-based Authentication (Access & Refresh Tokens)
- Password hashing using bcrypt
- Protected routes using JWT middleware
- Automated email delivery using Nodemailer
- CORS enabled for cross-origin requests
- Security headers using Helmet.js

---

## 🛠 Tech Stack

- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT)
- Password Hashing: bcrypt
- Email Service: Nodemailer
- Security: Helmet, CORS, Cookie-parser

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- Email service credentials (Gmail / Outlook / SMTP)

---
otp-authentication-api/
│
otp-authentication-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md



## 📂 Project Folder Structure

