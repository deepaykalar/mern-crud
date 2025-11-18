import React, { useState, useEffect } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const API_URL = 'http://localhost:5100';

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/get`);
      const result = await response.json();
      setAllUsers(result);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert('Please fill all fields');

    try {
      await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      setName('');
      setEmail('');
      alert('User added successfully!');
      getAllUsers(); // refresh table immediately
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
      alert('User deleted!');
      getAllUsers(); // refresh table after deletion
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2 className="text-center mb-4">Register User</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>

      {/* Users Table */}
      <h4 className="m-4">All Users</h4>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>SI.no</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Register;
