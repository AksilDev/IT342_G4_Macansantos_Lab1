# Mini App – User Registration & Authentication System

**Version:** 1.0  
**Prepared by:** Axcel O. Macansantos  
**Date:** February 3, 2026  
**Course:** IT342 - Advanced Web Development

---

## 📋 Table of Contents
1. [Project Description](#project-description)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Getting Started](#getting-started)
5. [Database Setup](#database-setup)
6. [Environment Variables & Configuration](#environment-variables--configuration)
7. [API Endpoints](#api-endpoints)
8. [Running the Application](#running-the-application)
9. [Project Features](#project-features)
10. [Submission Requirements](#submission-requirements)

---

## 📱 Project Description

**Mini App** is a full-stack user registration and authentication system designed to demonstrate modern web development best practices. It allows users to:
- Register with validation
- Log in securely with JWT tokens
- Access protected pages (dashboard, profile)
- Update their profile information
- Log out safely

This project is ideal for students learning full-stack development with Spring Boot and React.

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - User interface
- **Vite** - Build tool & development server
- **Material-UI (MUI)** - UI components
- **Axios** - HTTP client for API calls
- **React Router DOM** - Client-side routing
- **Emotion** - CSS-in-JS styling

### Backend
- **Java 17** - Programming language (required)
- **Spring Boot 4.0.2** - REST API framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database ORM
- **JWT (jjwt)** - Token-based authentication
- **MySQL Connector** - Database driver

### Database
- **MySQL 5.7+** (via XAMPP or standalone)

### Additional Tools
- **Maven** - Build automation
- **draw.io** - Architecture diagrams

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│              http://localhost:5173                       │
│  - Login Page                                            │
│  - Registration Page                                     │
│  - Dashboard (Protected)                                 │
│  - Profile Page (Protected)                              │
└────────────────────────┬────────────────────────────────┘
                         │ API Calls (Axios)
                         │ JWT Token in Headers
                         ▼
┌─────────────────────────────────────────────────────────┐
│            Backend (Spring Boot REST API)               │
│              http://localhost:8080                       │
│  - POST /api/auth/register      (User Registration)     │
│  - POST /api/auth/login         (User Login)            │
│  - GET /api/users/profile       (Get Profile)           │
│  - PUT /api/users/profile       (Update Profile)        │
│  - GET /api/users/dashboard     (Dashboard Data)        │
└────────────────────────┬────────────────────────────────┘
                         │ JPA/Hibernate
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   MySQL Database                         │
│            miniapp_db (Auto-created)                    │
│  - users table (id, email, password, firstName, etc.)   │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
Before you start, ensure you have:
- **Java 17 or higher** installed (required - NOT Java 8 or 11)
- **Maven** (included with project)
- **Node.js 16+** (for frontend)
- **MySQL 5.7+** (or XAMPP with MySQL)
- **Git** (optional, for version control)

### Check Your Java Version
```bash
java -version
# Should output: openjdk version "17.x.x" or higher
```

**If you have Java 8 or 11:** [Upgrade to Java 17](https://adoptium.net/)

---

## 💾 Database Setup

### Option 1: Automatic Setup (Recommended)
The backend will auto-create the database when it starts:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/miniapp_db?createDatabaseIfNotExist=true
spring.jpa.hibernate.ddl-auto=update
```

### Option 2: Manual Setup

**1. Start MySQL (via XAMPP)**
- Open XAMPP Control Panel
- Click "Start" for MySQL

**2. Create Database & Table**
```sql
-- Connect to MySQL and run:
CREATE DATABASE IF NOT EXISTS miniapp_db;
USE miniapp_db;

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  student_id VARCHAR(50),
  birthdate DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**3. Verify the connection**
- Use phpMyAdmin: http://localhost/phpmyadmin
- Or MySQL CLI: `mysql -u root`

---

## ⚙️ Environment Variables & Configuration

### Backend Configuration

Edit [`backend/src/main/resources/application.properties`](backend/src/main/resources/application.properties):

```properties
# Application Name
spring.application.name=miniapplication

# ========== MySQL Database Configuration ==========
spring.datasource.url=jdbc:mysql://localhost:3306/miniapp_db2?createDatabaseIfNotExist=true
spring.datasource.username=root                    # XAMPP default username
spring.datasource.password=                        # XAMPP default (empty)
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ========== JPA/Hibernate Configuration ==========
spring.jpa.hibernate.ddl-auto=update               # Auto-create tables
spring.jpa.show-sql=true                           # Log SQL queries
spring.jpa.properties.hibernate.format_sql=true    # Format SQL output

# ========== JWT Configuration ==========
jwt.secret=00000000000000000000000000000000       # for simplisitc purposes, current Pass is eassy
jwt.expiration=86400000                            # Token valid for 24 hours

# ========== CORS Configuration ==========
spring.web.cors.allowed-origins=http://localhost:5173
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

**IMPORTANT:** If your XAMPP MySQL has a password, update:
```properties
spring.datasource.password=your_mysql_password
```

### Frontend Configuration

Edit [`web/src/services/api.js`](web/src/services/api.js):

```javascript

const API_BASE_URL = 'http://localhost:8080/api';
```

---

## 📡 API Endpoints

All API calls require the `Authorization` header with JWT token (except login & register):
```
Authorization: Bearer <your_jwt_token>
```

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/api/auth/register` | Register new user | `{ "email", "password", "firstName", "lastName", "studentId", "birthdate" }` |
| `POST` | `/api/auth/login` | Login user & get JWT token | `{ "email", "password" }` |

### User Endpoints (Protected - Requires JWT)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| `GET` | `/api/users/profile` | Get current user profile | ✅ Yes |
| `PUT` | `/api/users/profile` | Update user profile | ✅ Yes |
| `GET` | `/api/users/dashboard` | Get dashboard data | ✅ Yes |

### Sample API Calls

**Register User:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "studentId": "2024-001",
    "birthdate": "2000-01-15"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
# Returns: { "token": "eyJhbGc...", "userId": 1, "email": "user@example.com" }
```

**Get Profile (with JWT token):**
```bash
curl -X GET http://localhost:8080/api/users/profile \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## ▶️ Running the Application

### 1️⃣ Start MySQL
```bash
# Via XAMPP: Open XAMPP Control Panel → Click "Start" for MySQL
# Or via command line:
mysql -u root
```

### 2️⃣ Run Backend (Spring Boot)

**First time setup:**
```bash
cd backend

# Windows - using Maven wrapper
./mvnw clean install
./mvnw spring-boot:run

# Or if Maven is installed globally:
mvn clean install
mvn spring-boot:run
```

**For subsequent runs:**
```bash
cd backend
./mvnw spring-boot:run
```

✅ **Backend running at:** `http://localhost:8080`

### 3️⃣ Run Frontend (React + Vite)

**First time setup:**
```bash
cd web
npm install
npm run dev
```

**For subsequent runs:**
```bash
cd web
npm run dev
```

✅ **Frontend running at:** `http://localhost:5173`

### 4️⃣ Test the Application
1. Open browser: `http://localhost:5173`
2. Click "Register" and create an account
3. Click "Login" and enter credentials
4. View dashboard and profile (protected pages)

---

## ✨ Project Features

### Functional Requirements
✅ User registration with email & password  
✅ User login with credentials validation  
✅ JWT token-based authentication  
✅ Protected dashboard page (requires login)  
✅ Protected profile page with update capability  
✅ User logout functionality  
✅ Input validation (email format, password strength)  

### Non-Functional Requirements
✅ **Security:** Password encryption, JWT tokens, CORS protection  
✅ **Performance:** Fast login/registration response times  
✅ **Usability:** Clean, intuitive Material-UI interface  
✅ **Reliability:** Error handling for invalid inputs  
✅ **Scalability:** Modular architecture for future enhancements  

---

## 📤 Submission Requirements

### Deliverables
- ✅ Complete source code (backend + frontend)
- ✅ Updated README.md (this file)
- ✅ Database schema (auto-created by Hibernate)
- ✅ Working API endpoints
- ✅ Functional authentication system

### How to Submit

1. **Prepare your project:**
   ```bash
   cd backend
   ./mvnw clean
   cd ../web
   rm -rf node_modules
   ```

2. **Create a ZIP file or push to GitHub:**
   - Include `backend/`, `web/`, `README.md`, `TASKLIST.md`
   - Exclude: `target/`, `node_modules/`, `.git/`

3. **Test before submission:**
   - Backend runs without errors
   - Frontend connects to backend
   - Registration and login work
   - Protected pages require authentication

4. **Submit via:** Microsoft Teams or designated platform

### Grading Criteria
- Code quality and organization
- Functionality (all features working)
- Database integration
- Security (proper password handling, JWT tokens)
- Documentation (this README)

---

## 🐛 Troubleshooting

### Issue: "Java version mismatch"
**Solution:** Upgrade to Java 17
```bash
# Download from: https://adoptium.net/
# Then set JAVA_HOME environment variable
```

### Issue: "MySQL connection refused"
**Solution:** Start MySQL
```bash
# XAMPP: Open XAMPP Control Panel → Start MySQL
# Or: mysql -u root
```

### Issue: "Port 8080 already in use"
**Solution:** Change backend port in `application.properties`:
```properties
server.port=8081
```

### Issue: "Frontend can't connect to backend"
**Solution:** Check CORS and API URL in `web/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Issue: "CORS error in browser console"
**Solution:** Verify backend has CORS enabled in `SecurityConfig.java`:
```java
@CrossOrigin(origins = "*", maxAge = 3600)
```

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Material-UI Components](https://mui.com)
- [JWT Tokens Explained](https://jwt.io/introduction)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

## 👨‍💻 Team

**Project Lead:** Axcel O. Macansantos  
**Course:** IT342 - Advanced Web Development  
**Semester:** February 2026

---

## 📝 License

This project is for educational purposes only.