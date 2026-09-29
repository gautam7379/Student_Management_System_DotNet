import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getResults,
  createResult,
  updateResult,
  deleteResult
} from "./api";


function ResultPage() {

  const [results, setResults] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingResultId, setEditingResultId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    courseId: "",
    marks: "",
    grade: "",
    remarks: ""
  });


  // =====================================================
  // LOAD RESULTS
  // =====================================================

  useEffect(() => {
    loadResults();
  }, []);


  async function loadResults() {

    try {

      setLoading(true);

      const data = await getResults();

      setResults(data);

    } catch (error) {

      console.error(error);

      setMessage("Failed to load results.");

    } finally {

      setLoading(false);

    }

  }


  // =====================================================
  // HANDLE CHANGE
  // =====================================================

  function handleChange(event) {

    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

  }


  // =====================================================
  // ADD RESULT
  // =====================================================

  function handleAdd() {

    setEditingResultId(null);

    setFormData({
      studentId: "",
      courseId: "",
      marks: "",
      grade: "",
      remarks: ""
    });

    setMessage("");

    setShowForm(true);

  }


  // =====================================================
  // EDIT RESULT
  // =====================================================

  function handleEdit(result) {

    setEditingResultId(result.id);

    setFormData({
      studentId: result.studentId,
      courseId: result.courseId,
      marks: result.marks,
      grade: result.grade,
      remarks: result.remarks
    });

    setMessage("");

    setShowForm(true);

  }


  // =====================================================
  // SUBMIT
  // =====================================================

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      setLoading(true);

      setMessage("");


      const resultData = {

        studentId: Number(formData.studentId),

        courseId: Number(formData.courseId),

        marks: Number(formData.marks),

        grade: formData.grade,

        remarks: formData.remarks

      };


      if (editingResultId !== null) {

        await updateResult(
          editingResultId,
          resultData
        );

        setMessage(
          "Result updated successfully."
        );

      } else {

        await createResult(
          resultData
        );

        setMessage(
          "Result added successfully."
        );

      }


      await loadResults();


      setFormData({
        studentId: "",
        courseId: "",
        marks: "",
        grade: "",
        remarks: ""
      });

      setEditingResultId(null);

      setShowForm(false);

    } catch (error) {

      console.error(error);

      setMessage(
        "Operation failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  }


  // =====================================================
  // DELETE
  // =====================================================

  async function handleDelete(id) {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this result?"
    );


    if (!confirmDelete) {
      return;
    }


    try {

      setLoading(true);

      await deleteResult(id);

      setMessage(
        "Result deleted successfully."
      );

      await loadResults();

    } catch (error) {

      console.error(error);

      setMessage(
        "Failed to delete result."
      );

    } finally {

      setLoading(false);

    }

  }


  // =====================================================
  // CANCEL
  // =====================================================

  function handleCancel() {

    setShowForm(false);

    setEditingResultId(null);

    setFormData({
      studentId: "",
      courseId: "",
      marks: "",
      grade: "",
      remarks: ""
    });

    setMessage("");

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
          </Link>

          <Link to="/attendance">
            📋 Attendance
          </Link> */}

          <Link to="/results">
            📊 Results
          </Link>

          <Link to="#">
            👤 Admin
          </Link>

        </nav>

      </header>



      {/* =================================================
          MAIN
      ================================================= */}

      <main className="dashboard">


        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <div className="management-page-header">

          <div>

            <h1>
              Result Management
            </h1>

            <p>
              Add, edit, delete and manage student results.
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
            RESULT SECTION
        ================================================= */}

        <section className="management-section">


          <div className="management-header">

            <div>

              <h2>
                Results
              </h2>

              <p>
                Total Results: {results.length}
              </p>

            </div>


            <button
              className="add-button"
              onClick={handleAdd}
            >
              + Add Result
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

            <div className="management-section result-form-section">

              <div className="management-header">

                <div>

                  <h2>
                    {editingResultId !== null
                      ? "Edit Result"
                      : "Add Result"}
                  </h2>

                  <p>
                    Enter result information below.
                  </p>

                </div>

              </div>


              <form
                className="student-form"
                onSubmit={handleSubmit}
              >


                <div className="form-grid">


                  {/* Student ID */}

                  <div className="form-group">

                    <label>
                      Student ID
                    </label>

                    <input
                      type="number"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="Enter Student ID"
                      required
                    />

                  </div>



                  {/* Course ID */}

                  <div className="form-group">

                    <label>
                      Course ID
                    </label>

                    <input
                      type="number"
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleChange}
                      placeholder="Enter Course ID"
                      required
                    />

                  </div>



                  {/* Marks */}

                  <div className="form-group">

                    <label>
                      Marks
                    </label>

                    <input
                      type="number"
                      name="marks"
                      value={formData.marks}
                      onChange={handleChange}
                      placeholder="Enter Marks"
                      min="0"
                      max="100"
                      step="0.01"
                      required
                    />

                  </div>



                  {/* Grade */}

                  <div className="form-group">

                    <label>
                      Grade
                    </label>

                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Grade
                      </option>

                      <option value="A+">
                        A+
                      </option>

                      <option value="A">
                        A
                      </option>

                      <option value="B+">
                        B+
                      </option>

                      <option value="B">
                        B
                      </option>

                      <option value="C+">
                        C+
                      </option>

                      <option value="C">
                        C
                      </option>

                      <option value="D">
                        D
                      </option>

                      <option value="F">
                        F
                      </option>

                    </select>

                  </div>


                </div>



                {/* Remarks */}

                <div className="form-group">

                  <label>
                    Remarks
                  </label>

                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Enter remarks"
                    rows="4"
                  />

                </div>



                {/* Buttons */}

                <div className="form-actions">

                  <button
                    type="submit"
                    className="save-button"
                    disabled={loading}
                  >

                    {loading
                      ? "Saving..."
                      : editingResultId !== null
                        ? "Update Result"
                        : "Save Result"}

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

            </div>

          )}



          {/* =================================================
              TABLE
          ================================================= */}

          {loading && results.length === 0 ? (

            <p className="empty-message">
              Loading results...
            </p>

          ) : results.length === 0 ? (

            <p className="empty-message">
              No result records found.
            </p>

          ) : (

            <div className="table-container">

              <table>

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Student ID</th>

                    <th>Course ID</th>

                    <th>Marks</th>

                    <th>Grade</th>

                    <th>Remarks</th>

                    <th>Actions</th>

                  </tr>

                </thead>


                <tbody>

                  {results.map((result) => (

                    <tr key={result.id}>

                      <td>
                        {result.id}
                      </td>

                      <td>
                        {result.studentId}
                      </td>

                      <td>
                        {result.courseId}
                      </td>

                      <td>
                        {result.marks}
                      </td>

                      <td>

                        <span className="result-grade">
                          {result.grade}
                        </span>

                      </td>

                      <td>
                        {result.remarks || "-"}
                      </td>

                      <td className="actions">

                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEdit(result)
                          }
                        >
                          Edit
                        </button>


                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(result.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>



      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <p>
          Student Management System © 2026
        </p>

      </footer>


    </div>

  );

}


export default ResultPage;