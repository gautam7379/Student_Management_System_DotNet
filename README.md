# Student Management System - Microservices

A Student Management System built using **ASP.NET Core Web API, Microservices Architecture, YARP API Gateway, Entity Framework Core, SQL Server, React.js, Ollama and Qwen 2.5**.

---

## 📌 Project Overview

The Student Management System is a microservices-based application designed to manage students, teachers, courses, attendance and results.

The system uses separate backend services for each major business functionality.

A React frontend communicates with the backend through a YARP API Gateway.

An AI chatbot is also integrated using Ollama with the `qwen2.5:1.5b` local LLM.

---

# 🏗️ Architecture

```text
                         React Frontend
                         localhost:5173
                              │
                              ▼
                       YARP API Gateway
                         localhost:5016
                              │
          ┌───────────────────┼────────────────────┐
          │                   │                    │
          ▼                   ▼                    ▼
   StudentService      TeacherServices       CourseService
      :5272                :5028                 :5252
          │                   │                    │
          ▼                   ▼                    ▼
      StudentDB           TeacherDB            CourseDB

                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
             AttendanceService      ResultService
                  :5189                 :5089
                    │                   │
                    ▼                   ▼
             AttendanceDB            ResultDB

                              │
                              ▼
                       ChatbotService
                           :5099
                              │
                              ▼
                        Ollama :11434
                              │
                              ▼
                       qwen2.5:1.5b



🧩 Microservices
1. StudentService

Responsible for:

Student management
Student CRUD operations
Student information

Port:

http://localhost:5272

Database:

StudentDB4

Main entity:

Student
2. TeacherServices

Responsible for:

Teacher management
Teacher CRUD operations
Teacher subject and salary information

Port:

http://localhost:5028

Database:

TeacherDB

Main entity:

Teacher
3. CourseService

Responsible for:

Course management
Course CRUD operations
Course duration
Course fees
Teacher information

Port:

http://localhost:5252

Database:

CourseDB

Main entity:

Course
4. AttendanceService

Responsible for:

Student attendance records
Attendance CRUD operations
Attendance status
Attendance date and remarks

Port:

http://localhost:5189

Database:

AttendanceDB

Main entity:

Attendance
5. ResultService

Responsible for:

Student results
Marks
Grades
Result CRUD operations
Result remarks

Port:

http://localhost:5089

Database:

ResultDB

Main entity:

Result
6. ChatbotService

Responsible for:

Receiving chatbot messages
Communicating with Ollama
Sending user prompts to the Qwen model
Returning AI responses

Port:

http://localhost:5099

LLM:

qwen2.5:1.5b

Ollama:

http://localhost:11434
🌐 API Gateway

The project uses YARP (Yet Another Reverse Proxy) as the API Gateway.

Port:

http://localhost:5016

The frontend communicates with the API Gateway instead of directly communicating with each microservice.

Example:

React
  ↓
http://localhost:5016/api/students
  ↓
StudentService :5272

Chatbot:

React
  ↓
http://localhost:5016/api/chat
  ↓
ChatbotService :5099
  ↓
Ollama :11434
💻 Frontend

The frontend is developed using:

React.js
Vite
JavaScript
React Router
CSS

Frontend URL:

http://localhost:5173

The frontend provides:

Dashboard
Student Management
Teacher Management
Course Management
Attendance Management
Result Management
Admin Login
Logout
AI Chatbot
🤖 AI Chatbot

The system includes a local AI chatbot powered by Ollama.

Technology:

Ollama
Qwen 2.5 1.5B

The chatbot architecture is:

React Chatbot
      ↓
API Gateway
      ↓
ChatbotService
      ↓
Ollama
      ↓
qwen2.5:1.5b

The model runs locally, so chatbot requests are processed through the local Ollama installation.

🗄️ Databases

Each business microservice has its own database.

Service	Database
StudentService	StudentDB4
TeacherServices	TeacherDB
CourseService	CourseDB
AttendanceService	AttendanceDB
ResultService	ResultDB

This follows the microservices principle of keeping service data separated.

🛠️ Technologies Used
Backend
ASP.NET Core Web API
.NET 10
C#
Entity Framework Core
SQL Server
REST APIs
API Gateway
YARP Reverse Proxy
Frontend
React.js
Vite
JavaScript
React Router
CSS
AI
Ollama
Qwen 2.5 1.5B
Development Tools
Visual Studio
Visual Studio Code
SQL Server / LocalDB
Git
GitHub



MicroServices
│
├── .gitignore
├── README.md
├── MicroServices.sln
│
├── ApiGateway
│
├── StudentService
│
├── TeacherServices
│
├── CourseService
│
├── AttendanceService
│
├── ResultService
│
├── ChatbotService
│
└── ReactFrontend




▶️ How to Run the Project
1. Start SQL Server / LocalDB

Make sure SQL Server LocalDB is available.

2. Start Backend Services

Run the following services:

StudentService       → http://localhost:5272
TeacherServices      → http://localhost:5028
CourseService        → http://localhost:5252
AttendanceService    → http://localhost:5189
ResultService        → http://localhost:5089
ChatbotService       → http://localhost:5099
3. Start Ollama

Make sure Ollama is installed and the model is available:

ollama list

The required model is:

qwen2.5:1.5b

If necessary:

ollama pull qwen2.5:1.5b
4. Start API Gateway

Run:

ApiGateway

Gateway:

http://localhost:5016
5. Start React Frontend

Open a terminal:

cd D:\.Net\MicroServices\ReactFrontend
npm install
npm run dev

Frontend:

http://localhost:5173
🔐 Login

The current project contains a development/demo admin login.

Username:

admin

Password:

admin123

The current login is intended for development/demo purposes and is not production-grade authentication.

🔗 Main API Routes

Through the API Gateway:

GET    /api/students
POST   /api/students
PUT    /api/students/{id}
DELETE /api/students/{id}

GET    /api/teachers
POST   /api/teachers
PUT    /api/teachers/{id}
DELETE /api/teachers/{id}

GET    /api/courses
POST   /api/courses
PUT    /api/courses/{id}
DELETE /api/courses/{id}

GET    /api/attendance
POST   /api/attendance
PUT    /api/attendance/{id}
DELETE /api/attendance/{id}

GET    /api/results
POST   /api/results
PUT    /api/results/{id}
DELETE /api/results/{id}

POST   /api/chat
🌿 Git Branch Structure

The project uses separate feature branches for individual components.

main
│
├── feature/student-service
├── feature/teacher-service
├── feature/course-service
├── feature/attendance-service
├── feature/result-service
├── feature/chatbot-service
├── feature/api-gateway
└── feature/react-frontend

The main branch represents the integrated project.

🚀 Future Improvements

The project can be extended with:

Docker containerization
Docker Compose
Kubernetes deployment
RabbitMQ messaging
JWT authentication
Role-based authorization
Automated unit testing
Integration testing
Code coverage
SonarQube analysis
CI/CD pipeline
Cloud deployment
Enhanced AI chatbot with application data access
👨‍💻 Development

This project was developed as a microservices-based Student Management System using modern .NET and React technologies.


### 3. Save it

You should now have:

```text
D:\.Net\MicroServices
│
├── .gitignore       ✅
├── README.md        ✅ NEW
├── MicroServices.sln
├── ApiGateway
├── StudentService
├── TeacherServices
├── CourseService
├── AttendanceService
├── ResultService
├── ChatbotService
└── ReactFrontend