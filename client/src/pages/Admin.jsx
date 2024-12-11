import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MyContainer } from '../components/MyContainer';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '', isAdmin: false });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (username) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/admin/delete/${username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user.username !== username));
            alert('User deleted successfully');
        } catch (error) {
            console.error('There was an error deleting the user!', error);
        }
    };

    const handleEdit = async (id) => {
        const newUsername = prompt('Enter new username:');
        const newIsAdmin = window.confirm('Make this user an admin?');
        if (!newUsername) return;
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/admin/update/${id}`, { username: newUsername, isAdmin: newIsAdmin }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user => user._id === id ? response.data.user : user));
            alert('User updated successfully');
        } catch (error) {
            console.error('There was an error updating the user!', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/auth/register', { username: formData.username, password: formData.password, isAdmin: formData.isAdmin });
            alert('User registered successfully');
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error(error);
            setError(error.response.data.error || 'An error occurred');
        }
    };

    return (
        <MyContainer>
            <div className="container">
                <h2 className="mb-3">All Users Information</h2>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Admin</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(users) && users.map((user, index) => (
                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                    <td>{user._id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                    <td className="text-center align-middle">
                                        <FaTrash onClick={() => handleDelete(user.username)} style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }} />
                                        <span style={{ fontSize: '20px', fontWeight: 'bold', verticalAlign: 'middle' }}> / </span>
                                        <FaEdit onClick={() => handleEdit(user._id)} style={{ color: 'blue', cursor: 'pointer', marginLeft: '10px' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2 className="mt-5">Create New User</h2>
                <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                    <div className="mb-1">
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='username'
                            className='form-control rounded-0'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            name='password'
                            className='form-control rounded-0'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                        <input
                            type="password"
                            placeholder='Repeat Password'
                            name='confirmPassword'
                            className='form-control rounded-0'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="isAdmin"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="isAdmin">Admin</label>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary">Create User</button>
                </form>
            </div>
        </MyContainer>
    );
};

export default Admin;
