import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse
} from './api'


function CoursePage() {

  // =====================================================
  // STATE
  // =====================================================

  const [courses, setCourses] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [editingCourseId, setEditingCourseId] = useState(null)

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState("")


  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    durationInMonths: "",
    fees: "",
    teacherName: ""
  })


  // =====================================================
  // LOAD COURSES
  // =====================================================

  const loadCourses = async () => {

    try {

      setLoading(true)

      const data = await getCourses()

      setCourses(data)

    }
    catch (error) {

      console.error(
        "Error loading courses:",
        error
      )

      setMessage(
        "Failed to load courses."
      )

    }
    finally {

      setLoading(false)

    }

  }


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {

    loadCourses()

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
  // ADD COURSE
  // =====================================================

  const handleAdd = () => {

    setEditingCourseId(null)

    setFormData({
      courseName: "",
      description: "",
      durationInMonths: "",
      fees: "",
      teacherName: ""
    })

    setMessage("")

    setShowForm(true)

  }


  // =====================================================
  // EDIT COURSE
  // =====================================================

  const handleEdit = (course) => {

    setEditingCourseId(course.id)

    setFormData({
      courseName: course.courseName,
      description: course.description,
      durationInMonths: course.durationInMonths,
      fees: course.fees,
      teacherName: course.teacherName
    })

    setMessage("")

    setShowForm(true)

  }


  // =====================================================
  // SAVE COURSE
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault()

    try {

      setLoading(true)

      setMessage("")


      const courseData = {

        courseName: formData.courseName,

        description: formData.description,

        durationInMonths:
          Number(formData.durationInMonths),

        fees:
          Number(formData.fees),

        teacherName:
          formData.teacherName

      }


      // UPDATE

      if (editingCourseId !== null) {

        await updateCourse(
          editingCourseId,
          courseData
        )

        setMessage(
          "Course updated successfully."
        )

      }

      // CREATE

      else {

        await createCourse(courseData)

        setMessage(
          "Course added successfully."
        )

      }


      // Reload courses

      await loadCourses()


      // Close form

      setShowForm(false)

      setEditingCourseId(null)

      setFormData({
        courseName: "",
        description: "",
        durationInMonths: "",
        fees: "",
        teacherName: ""
      })

    }
    catch (error) {

      console.error(
        "Error saving course:",
        error
      )

      setMessage(
        "Failed to save course."
      )

    }
    finally {

      setLoading(false)

    }

  }


  // =====================================================
  // DELETE COURSE
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    )

    if (!confirmed) {
      return
    }


    try {

      setLoading(true)

      setMessage("")


      await deleteCourse(id)


      setMessage(
        "Course deleted successfully."
      )


      await loadCourses()

    }
    catch (error) {

      console.error(
        "Error deleting course:",
        error
      )

      setMessage(
        "Failed to delete course."
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

    setEditingCourseId(null)

    setFormData({
      courseName: "",
      description: "",
      durationInMonths: "",
      fees: "",
      teacherName: ""
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

          {/* <Link to="/students">
            👥 Students
          </Link>

          <Link to="/teachers">
            👨‍🏫 Teachers
          </Link> */}

          <Link to="/courses">
            📚 Courses
          </Link>
{/* 
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
              Course Management
            </h1>

            <p>
              Add, edit, delete and manage course information.
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
                Courses
              </h2>

              <p>
                Total Courses: {courses.length}
              </p>

            </div>


            <button
              className="add-button"
              onClick={handleAdd}
            >
              + Add Course
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

                {editingCourseId !== null
                  ? "Edit Course"
                  : "Add New Course"}

              </h3>


              <div className="form-grid">


                {/* COURSE NAME */}

                <div className="form-group">

                  <label>
                    Course Name
                  </label>

                  <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleChange}
                    placeholder="Enter course name"
                    required
                  />

                </div>



                {/* DESCRIPTION */}

                <div className="form-group">

                  <label>
                    Description
                  </label>

                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter course description"
                    required
                  />

                </div>



                {/* DURATION */}

                <div className="form-group">

                  <label>
                    Duration (Months)
                  </label>

                  <input
                    type="number"
                    name="durationInMonths"
                    value={formData.durationInMonths}
                    onChange={handleChange}
                    placeholder="Enter duration"
                    min="1"
                    required
                  />

                </div>



                {/* FEES */}

                <div className="form-group">

                  <label>
                    Fees
                  </label>

                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    placeholder="Enter course fees"
                    min="0"
                    step="0.01"
                    required
                  />

                </div>



                {/* TEACHER */}

                <div className="form-group">

                  <label>
                    Teacher Name
                  </label>

                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleChange}
                    placeholder="Enter teacher name"
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

                  {editingCourseId !== null
                    ? "Update Course"
                    : "Save Course"}

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

                  <th>Course Name</th>

                  <th>Description</th>

                  <th>Duration</th>

                  <th>Fees</th>

                  <th>Teacher</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {courses.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="empty-message"
                    >
                      No courses found.
                    </td>

                  </tr>

                ) : (

                  courses.map(course => (

                    <tr key={course.id}>

                      <td>
                        {course.id}
                      </td>


                      <td>

                        <strong>
                          {course.courseName}
                        </strong>

                      </td>


                      <td>
                        {course.description}
                      </td>


                      <td>
                        {course.durationInMonths} months
                      </td>


                      <td>
                        ₹{Number(
                          course.fees
                        ).toLocaleString('en-IN')}
                      </td>


                      <td>
                        {course.teacherName}
                      </td>


                      <td className="actions">

                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEdit(course)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(
                              course.id
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


export default CoursePage