import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ConfirmationModal from '../components/ConfirmationModal';
import axios from 'axios';
import './Dashboard.css';

const AdminDashboard = () => {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [actionUser, setActionUser] = useState(null);
  const [actionType, setActionType] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/users?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      showMessage('error', 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = (user) => {
    setActionUser(user);
    setActionType('activate');
    setShowModal(true);
  };

  const handleDeactivate = (user) => {
    setActionUser(user);
    setActionType('deactivate');
    setShowModal(true);
  };

  const confirmAction = async () => {
    try {
      const endpoint = actionType === 'activate' ? 'activate' : 'deactivate';
      await axios.patch(
        `${API_URL}/admin/users/${actionUser.id}/${endpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showMessage('success', `User ${actionType}d successfully`);
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      const errorMessage = error.response?.data?.message || `Failed to ${actionType} user`;
      showMessage('error', errorMessage);
      setShowModal(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>

        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="dashboard-content">
          {loading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="no-data">No users found</td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge badge-${user.role}`}>{user.role}</span>
                          </td>
                          <td>
                            <span className={`badge badge-${user.status}`}>{user.status}</span>
                          </td>
                          <td>
                            {user.status === 'active' ? (
                              <button
                                onClick={() => handleDeactivate(user)}
                                className="btn-danger btn-sm"
                                disabled={currentUser && currentUser.id === user.id}
                                title={currentUser && currentUser.id === user.id ? 'Cannot deactivate your own account' : ''}
                              >
                                Deactivate
                              </button>
                            ) : (
                              <button
                                onClick={() => handleActivate(user)}
                                className="btn-success btn-sm"
                              >
                                Activate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {users.length > 0 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="btn-pagination"
                  >
                    Previous
                  </button>
                  <span className="page-info">
                    Page {currentPage} of {totalPages} ({users.length} users shown)
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="btn-pagination"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {showModal && (
          <ConfirmationModal
            message={`Are you sure you want to ${actionType} ${actionUser?.fullName}?`}
            onConfirm={confirmAction}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
