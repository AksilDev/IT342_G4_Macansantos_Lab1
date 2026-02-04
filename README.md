# Mini App – User Registration & Authentication System

**Version:** 1.0  
**Prepared by:** Axcel O. Macansantos  
**Date:** February 3, 2026  

## Overview
Mini App is a simple user registration and authentication system designed to demonstrate basic account management features. It allows users to register, log in, access protected pages, and log out securely. The project is intended for educational and development purposes.

## Purpose
The goal of this project is to explain and implement both functional and non-functional requirements of a user authentication system using modern web technologies. It is suitable for students, educators, and developers learning full-stack application design.

## Scope
The system provides:
- User registration with input validation  
- Secure user login and logout  
- Token-based authentication  
- Access to protected pages such as a dashboard or profile  

Only authenticated users are allowed to access protected resources.

## System Architecture
- **Frontend:** ReactJS  
- **Backend:** Spring Boot REST API  
- **Database:** MySQL 
- **Design Tools:** draw.io (for diagrams)

The frontend handles UI and user interaction, while the backend manages authentication logic and communicates with Firebase for data storage.

## User Types
- **Guest User**
  - Can register
  - Can log in  

- **Authenticated User**
  - Can access dashboard and profile
  - Can log out  

## Key Features
- **User Registration**
  - Validates input fields
  - Stores user data securely in the database  

- **User Authentication**
  - Verifies credentials
  - Generates authentication tokens
  - Restricts access to protected pages  

## Non-Functional Requirements
- **Security:** Passwords are encrypted and handled securely  
- **Performance:** Login and registration respond within reasonable time  
- **Usability:** Simple and user-friendly interface  
- **Reliability:** Proper handling of invalid inputs and authentication errors  

---

This project serves as a foundational example of a modern user authentication system.