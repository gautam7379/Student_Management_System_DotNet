import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from './api'


function TeacherPage() {

  // =====================================================
  // STATE
  // =====================================================

  const [teachers, setTeachers] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [editingTeacherId, setEditingTeacherId] = useState(null)

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState("")


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    salary: ""
  })


  // =====================================================
  // LOAD TEACHERS
  // =====================================================

  const loadTeachers = async () => {

    try {

      setLoading(true)

      const data = await getTeachers()

      setTeachers(data)

    }
    catch (error) {

      console.error("Error loading teachers:", error)

      setMessage("Failed to load teachers.")

    }
    finally {

      setLoading(false)

    }

  }


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadTeachers()

  }, [])


  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (event) => {

    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })

  }


  // =====================================================
  // ADD TEACHER
  // =====================================================

  const handleAdd = () => {

    setEditingTeacherId(null)

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      salary: ""
    })

    setMessage("")

    setShowForm(true)

  }


  // =====================================================
  // EDIT TEACHER
  // =====================================================

  const handleEdit = (teacher) => {

    setEditingTeacherId(teacher.id)

    setFormData({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
      salary: teacher.salary
    })

    setMessage("")

    setShowForm(true)

  }


  // =====================================================
  // SAVE TEACHER
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault()

    try {

      setLoading(true)

      setMessage("")


      const teacherData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        salary: Number(formData.salary)
      }


      // UPDATE

      if (editingTeacherId !== null) {

        await updateTeacher(
          editingTeacherId,
          teacherData
        )

        setMessage(
          "Teacher updated successfully."
        )

      }

      // CREATE

      else {

        await createTeacher(teacherData)

        setMessage(
          "Teacher added successfully."
        )

      }


      // Reload teachers

      await loadTeachers()


      // Close form

      setShowForm(false)

      setEditingTeacherId(null)

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        salary: ""
      })

    }
    catch (error) {

      console.error(
        "Error saving teacher:",
        error
      )

      setMessage(
        "Failed to save teacher."
      )

    }
    finally {

      setLoading(false)

    }

  }


  // =====================================================
  // DELETE TEACHER
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    )

    if (!confirmed) {
      return
    }


    try {

      setLoading(true)

      setMessage("")


      await deleteTeacher(id)


      setMessage(
        "Teacher deleted successfully."
      )


      await loadTeachers()

    }
    catch (error) {

      console.error(
        "Error deleting teacher:",
        error
      )

      setMessage(
        "Failed to delete teacher."
      )

    }
    finally {

      setLoading(false)

    }

  }


  // =====================================================
  // CANCEL
  // =====================================================

  const handleCancel = () => {

    setShowForm(false)

    setEditingTeacherId(null)

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      salary: ""
    })

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="app">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="header">

        <div className="logo">
          🎓 Student Management
        </div>


        <nav className="nav">

          <Link to="/">
            🏠 Home
          </Link>
{/* 
          <Link to="/students">
            👥 Students
          </Link> */}

          <Link to="/teachers">
            👨‍🏫 Teachers
          </Link>
{/* 
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



      {/* =================================================
          MAIN
      ================================================= */}

      <main className="management-page">


        {/* PAGE TITLE */}

        <div className="management-title">

          <div>

            <h1>
              Teacher Management
            </h1>

            <p>
              Add, edit, delete and manage teacher information.
            </p>

          </div>


          <Link
            to="/"
            className="back-button"
          >
            ← Back to Dashboard
          </Link>

        </div>



        {/* =================================================
            MANAGEMENT CARD
        ================================================= */}

        <section className="management-section">


          <div className="management-header">

            <div>

              <h2>
                Teachers
              </h2>

              <p>
                Total Teachers: {teachers.length}
              </p>

            </div>


            <button
              className="add-button"
              onClick={handleAdd}
            >
              + Add Teacher
            </button>

          </div>



          {/* =================================================
              MESSAGE
          ================================================= */}

          {message && (

            <div className="message">
              {message}
            </div>

          )}



          {/* =================================================
              FORM
          ================================================= */}

          {showForm && (

            <form
              className="student-form"
              onSubmit={handleSubmit}
            >

              <h3>

                {editingTeacherId !== null
                  ? "Edit Teacher"
                  : "Add New Teacher"}

              </h3>


              <div className="form-grid">


                {/* NAME */}

                <div className="form-group">

                  <label>
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter teacher name"
                    required
                  />

                </div>



                {/* EMAIL */}

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



                {/* PHONE */}

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



                {/* SUBJECT */}

                <div className="form-group">

                  <label>
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                  />

                </div>



                {/* SALARY */}

                <div className="form-group">

                  <label>
                    Salary
                  </label>

                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter salary"
                    min="0"
                    step="0.01"
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

                  {editingTeacherId !== null
                    ? "Update Teacher"
                    : "Save Teacher"}

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



          {/* =================================================
              TABLE
          ================================================= */}

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Subject</th>

                  <th>Salary</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {teachers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="empty-message"
                    >
                      No teachers found.
                    </td>

                  </tr>

                ) : (

                  teachers.map(teacher => (

                    <tr key={teacher.id}>

                      <td>
                        {teacher.id}
                      </td>


                      <td>

                        <strong>
                          {teacher.name}
                        </strong>

                      </td>


                      <td>
                        {teacher.email}
                      </td>


                      <td>
                        {teacher.phone}
                      </td>


                      <td>
                        {teacher.subject}
                      </td>


                      <td>
                        ₹{Number(
                          teacher.salary
                        ).toLocaleString('en-IN')}
                      </td>


                      <td className="actions">

                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEdit(teacher)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(
                              teacher.id
                            )
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



      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        Student Management System © 2026

      </footer>


    </div>

  )

}


export default TeacherPage