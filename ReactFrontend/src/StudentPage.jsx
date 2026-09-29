import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from './api'


function StudentPage() {

  // ================================
  // State
  // ================================

  const [students, setStudents] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [editingStudentId, setEditingStudentId] = useState(null)

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState("")


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: ""
  })


  // ================================
  // Load Students
  // ================================

  const loadStudents = async () => {

    try {

      setLoading(true)

      const data = await getStudents()

      setStudents(data)

    }
    catch (error) {

      console.error("Error loading students:", error)

      setMessage("Failed to load students.")

    }
    finally {

      setLoading(false)

    }
  }


  // ================================
  // Initial Load
  // ================================

  useEffect(() => {

    loadStudents()

  }, [])


  // ================================
  // Form Input
  // ================================

  const handleChange = (event) => {

    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })

  }


  // ================================
  // Open Add Form
  // ================================

  const handleAdd = () => {

    setEditingStudentId(null)

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: ""
    })

    setMessage("")

    setShowForm(true)

  }


  // ================================
  // Open Edit Form
  // ================================

  const handleEdit = (student) => {

    setEditingStudentId(student.id)

    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      dateOfBirth: student.dateOfBirth
        ? student.dateOfBirth.substring(0, 10)
        : ""
    })

    setMessage("")

    setShowForm(true)

  }


  // ================================
  // Save Student
  // ================================

  const handleSubmit = async (event) => {

    event.preventDefault()

    try {

      setLoading(true)

      setMessage("")


      const studentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth
      }


      // UPDATE

      if (editingStudentId !== null) {

        await updateStudent(
          editingStudentId,
          studentData
        )

        setMessage("Student updated successfully.")

      }

      // CREATE

      else {

        await createStudent(studentData)

        setMessage("Student added successfully.")

      }


      // Refresh list

      await loadStudents()


      // Close form

      setShowForm(false)

      setEditingStudentId(null)

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: ""
      })

    }
    catch (error) {

      console.error("Error saving student:", error)

      setMessage("Failed to save student.")

    }
    finally {

      setLoading(false)

    }

  }


  // ================================
  // Delete Student
  // ================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    )

    if (!confirmed) {
      return
    }


    try {

      setLoading(true)

      setMessage("")


      await deleteStudent(id)


      setMessage("Student deleted successfully.")


      await loadStudents()

    }
    catch (error) {

      console.error("Error deleting student:", error)

      setMessage("Failed to delete student.")

    }
    finally {

      setLoading(false)

    }

  }


  // ================================
  // Cancel Form
  // ================================

  const handleCancel = () => {

    setShowForm(false)

    setEditingStudentId(null)

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: ""
    })

  }


  // ================================
  // UI
  // ================================

  return (

    <div className="app">


      {/* ================= HEADER ================= */}

      <header className="header">

        <div className="logo">
          🎓 Student Management
        </div>


        <nav className="nav">

          <Link to="/">
            🏠 Home
          </Link>

          <Link to="/students">
            👥 Students
          </Link>

          {/* <a href="#">
            👨‍🏫 Teachers
          </a>

          <a href="#">
            📚 Courses
          </a>

          <a href="#">
            📋 Attendance
          </a>

          <a href="#">
            📊 Results
          </a> */}

          <a href="#">
            👤 Admin
          </a>

        </nav>

      </header>


      {/* ================= MAIN ================= */}

      <main className="management-page">


        {/* PAGE HEADER */}

        <div className="management-title">

          <div>

            <h1>
              Student Management
            </h1>

            <p>
              Add, edit, delete and manage student information.
            </p>

          </div>


          <Link
            to="/"
            className="back-button"
          >
            ← Back to Dashboard
          </Link>

        </div>


        {/* ================= MANAGEMENT CARD ================= */}

        <section className="management-section">


          <div className="management-header">

            <div>

              <h2>
                Students
              </h2>

              <p>
                Total Students: {students.length}
              </p>

            </div>


            <button
              className="add-button"
              onClick={handleAdd}
            >
              + Add Student
            </button>

          </div>


          {/* ================= MESSAGE ================= */}

          {message && (

            <div className="message">
              {message}
            </div>

          )}


          {/* ================= ADD / EDIT FORM ================= */}

          {showForm && (

            <form
              className="student-form"
              onSubmit={handleSubmit}
            >

              <h3>

                {editingStudentId !== null
                  ? "Edit Student"
                  : "Add New Student"}

              </h3>


              <div className="form-grid">


                {/* Name */}

                <div className="form-group">

                  <label>
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter student name"
                    required
                  />

                </div>


                {/* Email */}

                <div className="form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />

                </div>


                {/* Phone */}

                <div className="form-group">

                  <label>
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                  />

                </div>


                {/* Address */}

                <div className="form-group">

                  <label>
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    required
                  />

                </div>


                {/* Date of Birth */}

                <div className="form-group">

                  <label>
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />

                </div>


              </div>


              {/* FORM BUTTONS */}

              <div className="form-actions">

                <button
                  type="submit"
                  className="save-button"
                  disabled={loading}
                >
                  {editingStudentId !== null
                    ? "Update Student"
                    : "Save Student"}
                </button>


                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>


            </form>

          )}


          {/* ================= TABLE ================= */}

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Address</th>

                  <th>Date of Birth</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {students.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="empty-message"
                    >
                      No students found.
                    </td>

                  </tr>

                ) : (

                  students.map(student => (

                    <tr key={student.id}>

                      <td>
                        {student.id}
                      </td>


                      <td>
                        <strong>
                          {student.name}
                        </strong>
                      </td>


                      <td>
                        {student.email}
                      </td>


                      <td>
                        {student.phone}
                      </td>


                      <td>
                        {student.address}
                      </td>


                      <td>
                        {new Date(
                          student.dateOfBirth
                        ).toLocaleDateString()}
                      </td>


                      <td className="actions">

                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEdit(student)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(student.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>


        </section>


      </main>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        Student Management System © 2026

      </footer>


    </div>

  )

}


export default StudentPage