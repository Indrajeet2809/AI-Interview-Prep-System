import React, { useEffect, useState } from "react";
import { getUsers, deleteUser, logoutUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await deleteUser(userId);
      alert(res.data.message);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.error || "Failed to delete user");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <h2 style={{ color: "white", textAlign: "center", marginTop: "40px" }}>
        Loading users...
      </h2>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="main-card">

        <div className="top-nav">
          <Link to="/admin">
            <button className="secondary-btn">Admin Dashboard</button>
          </Link>

          <Link to="/interview">
            <button className="secondary-btn">Interview</button>
          </Link>

          <Link to="/ask-anything">
            <button className="secondary-btn">Ask Anything</button>
          </Link>

          <Link to="/resume-questions">
            <button className="secondary-btn">Resume Questions</button>
          </Link>

          <button className="danger-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h1 className="app-title">Admin Dashboard</h1>
        <p className="subtitle">
          Manage all registered users from here.
        </p>

        <div style={{ overflowX: "auto", marginTop: "24px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "white",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Created At</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td style={tdStyle}>{user.name}</td>
                    <td style={tdStyle}>{user.email}</td>
                    <td style={tdStyle}>{user.role}</td>
                    <td style={tdStyle}>
                      {new Date(user.createdAt).toLocaleString()}
                    </td>

                    <td style={tdStyle}>
                      <button
                        onClick={() => handleDelete(user._id)}
                        disabled={user.role === "admin"}
                        style={{
                          backgroundColor:
                            user.role === "admin" ? "#888" : "#ff4d6d",
                          color: "white",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          cursor:
                            user.role === "admin" ? "not-allowed" : "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={tdStyle} colSpan="5">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

export default AdminDashboard;
