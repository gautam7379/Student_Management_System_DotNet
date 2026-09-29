import { useState } from "react";
import { useNavigate } from "react-router-dom";


function LoginPage() {

  const navigate = useNavigate();


  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  // =====================================================
  // LOGIN
  // =====================================================

  function handleLogin(event) {

    event.preventDefault();

    setError("");

    setLoading(true);


    // Admin credentials
    if (
      username === "admin" &&
      password === "admin123"
    ) {

      // Store logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: "admin",
          role: "Admin"
        })
      );


      // Open dashboard
      navigate("/");

    }
    else {

      setError(
        "Invalid username or password."
      );

    }


    setLoading(false);

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="login-page">


      <div className="login-card">


        {/* Logo */}

        <div className="login-logo">
          🎓
        </div>


        <h1>
          Student Management
        </h1>


        <p className="login-subtitle">
          Admin Login
        </p>



        {/* Error */}

        {error && (

          <div className="login-error">
            {error}
          </div>

        )}



        {/* Login Form */}

        <form onSubmit={handleLogin}>


          {/* Username */}

          <div className="login-form-group">

            <label>
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Enter username"
              required
            />

          </div>



          {/* Password */}

          <div className="login-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter password"
              required
            />

          </div>



          {/* Login Button */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login as Admin"}

          </button>


        </form>



        {/* Login Information */}

        <div className="login-info">

          <p>
            Admin access only
          </p>

        </div>


      </div>


    </div>

  );

}


export default LoginPage;