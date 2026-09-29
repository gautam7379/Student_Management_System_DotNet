const API_BASE_URL = "http://localhost:5016/api";


// =====================================================
// STUDENT APIs
// =====================================================

// GET Students
export async function getStudents() {

  const response = await fetch(`${API_BASE_URL}/students`);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return await response.json();
}


// CREATE Student
export async function createStudent(student) {

  const response = await fetch(`${API_BASE_URL}/students`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(student)
  });

  if (!response.ok) {
    throw new Error("Failed to create student");
  }

  return await response.json();
}


// UPDATE Student
export async function updateStudent(id, student) {

  const response = await fetch(
    `${API_BASE_URL}/students/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(student)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update student");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}


// DELETE Student
export async function deleteStudent(id) {

  const response = await fetch(
    `${API_BASE_URL}/students/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }

  return true;
}



// =====================================================
// TEACHER APIs
// =====================================================

// GET Teachers
export async function getTeachers() {

  const response = await fetch(`${API_BASE_URL}/teachers`);

  if (!response.ok) {
    throw new Error("Failed to fetch teachers");
  }

  return await response.json();
}


// CREATE Teacher
export async function createTeacher(teacher) {

  const response = await fetch(
    `${API_BASE_URL}/teachers`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(teacher)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create teacher");
  }

  return await response.json();
}


// UPDATE Teacher
export async function updateTeacher(id, teacher) {

  const response = await fetch(
    `${API_BASE_URL}/teachers/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(teacher)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update teacher");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}


// DELETE Teacher
export async function deleteTeacher(id) {

  const response = await fetch(
    `${API_BASE_URL}/teachers/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete teacher");
  }

  return true;
}



// =====================================================
// COURSE APIs
// =====================================================

// GET Courses
export async function getCourses() {

  const response = await fetch(`${API_BASE_URL}/courses`);

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return await response.json();
}


// CREATE Course
export async function createCourse(course) {

  const response = await fetch(
    `${API_BASE_URL}/courses`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(course)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create course");
  }

  return await response.json();
}


// UPDATE Course
export async function updateCourse(id, course) {

  const response = await fetch(
    `${API_BASE_URL}/courses/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(course)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update course");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}


// DELETE Course
export async function deleteCourse(id) {

  const response = await fetch(
    `${API_BASE_URL}/courses/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete course");
  }

  return true;
}


// =====================================================
// ATTENDANCE APIs
// =====================================================

// GET Attendance
export async function getAttendance() {

  const response = await fetch(
    `${API_BASE_URL}/attendance`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch attendance");
  }

  return await response.json();
}


// CREATE Attendance
export async function createAttendance(attendance) {

  const response = await fetch(
    `${API_BASE_URL}/attendance`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(attendance)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create attendance");
  }

  return await response.json();
}


// UPDATE Attendance
export async function updateAttendance(
  id,
  attendance
) {

  const response = await fetch(
    `${API_BASE_URL}/attendance/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(attendance)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update attendance");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}


// DELETE Attendance
export async function deleteAttendance(id) {

  const response = await fetch(
    `${API_BASE_URL}/attendance/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete attendance");
  }

  return true;
}



// =====================================================
// RESULT APIs
// =====================================================

// GET Results
export async function getResults() {

  const response = await fetch(
    `${API_BASE_URL}/results`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }

  return await response.json();
}


// CREATE Result
export async function createResult(result) {

  const response = await fetch(
    `${API_BASE_URL}/results`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(result)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create result");
  }

  return await response.json();
}


// UPDATE Result
export async function updateResult(
  id,
  result
) {

  const response = await fetch(
    `${API_BASE_URL}/results/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(result)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update result");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}


// DELETE Result
export async function deleteResult(id) {

  const response = await fetch(
    `${API_BASE_URL}/results/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete result");
  }

  return true;
}

export async function sendChatMessage(message) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  });

  if (!response.ok) {
    throw new Error("Failed to send chat message");
  }

  return await response.json();
}