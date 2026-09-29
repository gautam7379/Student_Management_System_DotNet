import { useEffect, useState } from 'react'
import { Routes, Route, Link,Navigate} from 'react-router-dom'
import './App.css'
import StudentPage from './StudentPage'
import TeacherPage from './TeacherPage'
import CoursePage from './CoursePage'
import AttendancePage from './AttendancePage'
import ResultPage from './ResultPage'
import Chatbot from './Chatbot'
import LoginPage from './LoginPage'


import {
  getStudents,
  getTeachers,
  getCourses,
  getAttendance,
  getResults
} from './api'


function ProtectedRoute({ children }) {

  const user = localStorage.getItem("user");

  if (!user) {

    return <Navigate to="/login" replace />;

  }

  return children;
}



function App() {

  const [students, setStudents] = useState([])

  useEffect(() => {
    getStudents()
      .then(data => {
        setStudents(data)
      })
      .catch(error => {
        console.error("Error loading students:", error)
      })
  }, [])

  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    getTeachers()
      .then(data => {
        setTeachers(data)
      })
      .catch(error => {
        console.error("Error loading teachers:", error)
      })
  }, [])

const [courses, setCourses] = useState([])
const [attendance, setAttendance] = useState([])
const [results, setResults] = useState([])
const [showStudentForm, setShowStudentForm] = useState(false)

  useEffect(() => {
    getCourses()
      .then(data => {
        setCourses(data)
      })
      .catch(error => {
        console.error("Error loading courses:", error)
      })
  }, [])

  useEffect(() => {
    getAttendance()
      .then(data => {
        setAttendance(data)
      })
      .catch(error => {
        console.error("Error loading attendance:", error)
      })
  }, [])

  useEffect(() => {
    getResults()
      .then(data => {
        setResults(data)
      })
      .catch(error => {
        console.error("Error loading results:", error)
      })
  }, [])


  function handleLogout() {

    localStorage.removeItem("user");

    window.location.href = "/login";

  }


  return (

  <Routes>
        
        <Route
      path="/login"
      element={<LoginPage />}
    />

        <Route
      path="/students"
      element={
        <ProtectedRoute>
          <StudentPage />
        </ProtectedRoute>
      }
    />

        <Route
    path="/teachers"
    element={
      <ProtectedRoute>
        <TeacherPage />
      </ProtectedRoute>
    }
  />
      
          <Route
    path="/courses"
    element={
      <ProtectedRoute>
        <CoursePage />
      </ProtectedRoute>
    }
  />

        <Route
    path="/attendance"
    element={
      <ProtectedRoute>
        <AttendancePage />
      </ProtectedRoute>
    }
  />

        <Route
    path="/results"
    element={
      <ProtectedRoute>
        <ResultPage />
      </ProtectedRoute>
    }
  />

    <Route
    path="/"
    element={
      <ProtectedRoute>

        <div className="app">

      {/* ================= HEADER ================= */}
      <header className="header">

        <div className="logo">
          🎓 Student Management
        </div>

        <nav className="nav">
          <a href="#home">🏠 Home</a>
          <a href="#admin">👤 Admin</a>
          <button
              type="button"
              onClick={handleLogout}
              className="logout-button"
            >
              ↪ Logout
        </button>
        </nav>

      </header>


      {/* ================= DASHBOARD ================= */}
      <main className="dashboard">

        {/* Hero */}
        <section className="hero-section" id="home">

          <div className="welcome">
            👋 Welcome!
          </div>

          <h1>
            Student Management <span>Dashboard</span>
          </h1>

          <p>
            Manage students, teachers, courses, attendance and results from one place.
          </p>

          <div className="hero-icon">
            ─── 🎓 ───
          </div>

        </section>


        {/* ================= SERVICE CARDS ================= */}
        <section className="cards">

          {/* Students */}
          <div className="card students" id="students">

            <div className="card-icon">
              👥
            </div>

            <h2>Students</h2>

            <p>
              View, add, edit and manage all student information.
            </p>

            <Link
              to="/students"
              className="card-button"
            >
              Manage Students →
            </Link>
          </div>


          {/* Teachers */}
          <div className="card teachers" id="teachers">

            <div className="card-icon">
              👨‍🏫
            </div>

            <h2>Teachers</h2>

            <p>
              View and manage teacher information and subjects.
            </p>

            <Link
              to="/teachers"
              className="card-button"
            >
              Manage Teachers →
            </Link>

          </div>


          {/* Courses */}
          <div className="card courses" id="courses">

            <div className="card-icon">
              📚
            </div>

            <h2>Courses</h2>

            <p>
              View, add, edit and manage available courses.
            </p>

            <Link
              to="/courses"
              className="card-button"
            >
              Manage Courses →
            </Link>

          </div>


          {/* Attendance */}
          <div className="card attendance" id="attendance">

            <div className="card-icon">
              📋
            </div>

            <h2>Attendance</h2>

            <p>
              Track and manage student attendance records.
            </p>

            <Link
              to="/attendance"
              className="card-button"
            >
              Manage Attendance →
            </Link>

          </div>


          {/* Results */}
          <div className="card results" id="results">

            <div className="card-icon">
              📊
            </div>

            <h2>Results</h2>

            <p>
              Manage marks, grades and student results.
            </p>

             <Link
                to="/results"
                className="card-button"
              >
                Manage Results →
              </Link>

          </div>

        </section>


        {/* ================= STATISTICS ================= */}
        <section className="statistics">

          <div className="stat">

          

            <div>
             <div className="stat">

                <div className="stat-icon">
                  👥
                </div>

                <div>
                  <strong>{students.length}</strong>
                  <span>Total Students</span>
                </div>

              </div>
            </div>

          </div>


          <div className="stat">

            <div className="stat-icon">
              👨‍🏫
            </div>

            <div>
              <strong>{teachers.length}</strong>
              <span>Total Teachers</span>
            </div>

          </div>


          <div className="stat">

            <div className="stat-icon">
              📚
            </div>

            <div>
              <strong>{courses.length}</strong>
              <span>Total Courses</span>
            </div>

          </div>


          <div className="stat">

            <div className="stat-icon">
              📋
            </div>

            <div>
              <strong>{attendance.length}</strong>
              <span>Attendance Records</span>
            </div>

          </div>

        </section>





        {/* ================= FEATURES ================= */}
        <section className="features">

          <div className="feature">

            <div className="feature-icon">
              🛡️
            </div>

            <div>
              <h3>Secure & Safe</h3>
              <p>Your data is securely managed.</p>
            </div>

          </div>


          <div className="feature">

            <div className="feature-icon">
              ⚡
            </div>

            <div>
              <h3>Fast & Efficient</h3>
              <p>Quick access to all features.</p>
            </div>

          </div>


          <div className="feature">

            <div className="feature-icon">
              📊
            </div>

            <div>
              <h3>Analytics Ready</h3>
              <p>Powerful insights and reporting.</p>
            </div>

          </div>


          <div className="feature">

            <div className="feature-icon">
              ☁️
            </div>

            <div>
              <h3>Cloud Ready</h3>
              <p>Ready for Docker and Kubernetes.</p>
            </div>

          </div>

        </section>

      </main>

      <Chatbot />


      {/* ================= FOOTER ================= */}
      <footer className="footer">
        Student Management System © 2026
      </footer>

              </div>
            </ProtectedRoute>

        }
      />

    </Routes>
  )
}

export default App