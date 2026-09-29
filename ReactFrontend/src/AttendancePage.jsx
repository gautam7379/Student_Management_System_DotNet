import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance
} from './api'


function AttendancePage() {

  // =====================================================
  // STATE
  // =====================================================

  const [attendance, setAttendance] = useState([])

  const [showForm, setShowForm] = useState(false)

  const [editingAttendanceId, setEditingAttendanceId] =
    useState(null)

  const [loading, setLoading] = useState(false)

  const [message, setMessage] = useState("")


  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    attendanceDate: "",
    status: "Present",
    remarks: ""
  })


  // =====================================================
  // LOAD ATTENDANCE
  // =====================================================

  const loadAttendance = async () => {

    try {

      setLoading(true)

      const data = await getAttendance()

      setAttendance(data)

    }
    catch (error) {

      console.error(
        "Error loading attendance:",
        error
      )

      setMessage(
        "Failed to load attendance."
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

    loadAttendance()

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
  // ADD ATTENDANCE
  // =====================================================

  const handleAdd = () => {

    setEditingAttendanceId(null)

    setFormData({
      studentId: "",
      courseId: "",
      attendanceDate: "",
      status: "Present",
      remarks: ""
    })

    setMessage("")

    setShowForm(true)

  }


  // =====================================================
  // EDIT ATTENDANCE
  // =====================================================

  const handleEdit = (record) => {

    setEditingAttendanceId(record.id)

    setFormData({
      studentId: record.studentId,
      courseId: record.courseId,

      attendanceDate: record.attendanceDate
        ? record.attendanceDate.substring(0, 10)
        : "",

      status: record.status,
      remarks: record.remarks
    })

    setMessage("")

    setShowForm(true)

  }


  // =====================================================
  // SAVE ATTENDANCE
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault()

    try {

      setLoading(true)

      setMessage("")


      const attendanceData = {

        studentId:
          Number(formData.studentId),

        courseId:
          Number(formData.courseId),

        attendanceDate:
          formData.attendanceDate,

        status:
          formData.status,

        remarks:
          formData.remarks

      }


      // UPDATE

      if (editingAttendanceId !== null) {

        await updateAttendance(
          editingAttendanceId,
          attendanceData
        )

        setMessage(
          "Attendance updated successfully."
        )

      }

      // CREATE

      else {

        await createAttendance(
          attendanceData
        )

        setMessage(
          "Attendance added successfully."
        )

      }


      // Reload

      await loadAttendance()


      // Close form

      setShowForm(false)

      setEditingAttendanceId(null)

      setFormData({
        studentId: "",
        courseId: "",
        attendanceDate: "",
        status: "Present",
        remarks: ""
      })

    }
    catch (error) {

      console.error(
        "Error saving attendance:",
        error
      )

      setMessage(
        "Failed to save attendance."
      )

    }
    finally {

      setLoading(false)

    }

  }


  // =====================================================
  // DELETE ATTENDANCE
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this attendance record?"
    )

    if (!confirmed) {
      return
    }


    try {

      setLoading(true)

      setMessage("")


      await deleteAttendance(id)


      setMessage(
        "Attendance deleted successfully."
      )


      await loadAttendance()

    }
    catch (error) {

      console.error(
        "Error deleting attendance:",
        error
      )

      setMessage(
        "Failed to delete attendance."
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

    setEditingAttendanceId(null)

    setFormData({
      studentId: "",
      courseId: "",
      attendanceDate: "",
      status: "Present",
      remarks: ""
    })

  }


  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {

    switch (status?.toLowerCase()) {

      case "present":
        return "status-present"

      case "absent":
        return "status-absent"

      case "late":
        return "status-late"

      default:
        return ""

    }

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
          </Link>

          <Link to="/courses">
            📚 Courses
          </Link> */}

          <Link to="/attendance">
            📋 Attendance
          </Link>

          {/* <a href="#">
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
              Attendance Management
            </h1>

            <p>
              Add, edit, delete and manage attendance records.
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
                Attendance Records
              </h2>

              <p>
                Total Records: {attendance.length}
              </p>

            </div>


            <button
              className="add-button"
              onClick={handleAdd}
            >
              + Add Attendance
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

                {editingAttendanceId !== null
                  ? "Edit Attendance"
                  : "Add New Attendance"}

              </h3>


              <div className="form-grid">


                {/* STUDENT ID */}

                <div className="form-group">

                  <label>
                    Student ID
                  </label>

                  <input
                    type="number"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Enter student ID"
                    min="1"
                    required
                  />

                </div>



                {/* COURSE ID */}

                <div className="form-group">

                  <label>
                    Course ID
                  </label>

                  <input
                    type="number"
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    placeholder="Enter course ID"
                    min="1"
                    required
                  />

                </div>



                {/* DATE */}

                <div className="form-group">

                  <label>
                    Attendance Date
                  </label>

                  <input
                    type="date"
                    name="attendanceDate"
                    value={formData.attendanceDate}
                    onChange={handleChange}
                    required
                  />

                </div>



                {/* STATUS */}

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >

                    <option value="Present">
                      Present
                    </option>

                    <option value="Absent">
                      Absent
                    </option>

                    <option value="Late">
                      Late
                    </option>

                  </select>

                </div>



                {/* REMARKS */}

                <div className="form-group">

                  <label>
                    Remarks
                  </label>

                  <input
                    type="text"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter remarks"
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

                  {editingAttendanceId !== null
                    ? "Update Attendance"
                    : "Save Attendance"}

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

                  <th>Student ID</th>

                  <th>Course ID</th>

                  <th>Date</th>

                  <th>Status</th>

                  <th>Remarks</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {attendance.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="empty-message"
                    >
                      No attendance records found.
                    </td>

                  </tr>

                ) : (

                  attendance.map(record => (

                    <tr key={record.id}>

                      <td>
                        {record.id}
                      </td>


                      <td>
                        {record.studentId}
                      </td>


                      <td>
                        {record.courseId}
                      </td>


                      <td>

                        {new Date(
                          record.attendanceDate
                        ).toLocaleDateString()}

                      </td>


                      <td>

                        <span
                          className={
                            `attendance-status ${
                              getStatusClass(
                                record.status
                              )
                            }`
                          }
                        >
                          {record.status}
                        </span>

                      </td>


                      <td>
                        {record.remarks || "-"}
                      </td>


                      <td className="actions">

                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEdit(record)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(
                              record.id
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


export default AttendancePage