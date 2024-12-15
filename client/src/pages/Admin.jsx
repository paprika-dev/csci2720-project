import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { MyContainer } from '../components/MyContainer';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '', admin: false });
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('There was an error fetching the users!', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('/users', { username: formData.username, password: formData.password, admin: formData.admin });
            alert('User registered successfully');
            fetchUsers();
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                setError('User already exists');
            } else {
                setError(error.response.data.error || 'An error occurred');
            }
        }
    };
    
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await axios.delete(`/users/${id}`);
            alert('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error('There was an error deleting the user!', error);
        }
    };

    const handleEdit = (user) => {
        setEditUserId(user._id);
        setFormData({ username: user.username, password: '', confirmPassword: '', admin: user.admin });
        setShowModal(true);
    };

    const handleUpdate = async () => {
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.put(`/users/${editUserId}`, { username: formData.username, password: formData.password, admin: formData.admin });
            alert('User updated successfully');
            fetchUsers();
            setShowModal(false);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                setError('User already exists');
            } else if (error.response && error.response.status === 400) {
                setError('Invalid input');
            } else {
                setError(error.response.data.error || 'An error occurred');
            }
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
                                    <td>{user.admin ? 'Yes' : 'No'}</td>
                                    <td className="text-center align-middle">
                                        <FaTrash onClick={() => handleDelete(user._id)} style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }} />
                                        <span style={{ fontSize: '20px', fontWeight: 'bold', verticalAlign: 'middle' }}> / </span>
                                        <FaEdit onClick={() => handleEdit(user)} style={{ color: 'blue', cursor: 'pointer', marginLeft: '10px' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2 className="mt-5">Create New User</h2>
                <form onSubmit={handleCreate} className="p-4 border rounded bg-light">
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
                            id="admin"
                            name="admin"
                            checked={formData.admin}
                            onChange={(e) => setFormData({ ...formData, admin: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="admin">Admin</label>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary">Create User</button>
                </form>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAdmin">
                            <Form.Check
                                type="checkbox"
                                label="Admin"
                                name="admin"
                                checked={formData.admin}
                                onChange={(e) => setFormData({ ...formData, admin: e.target.checked })}
                            />
                        </Form.Group>
                        {error && <div className="alert alert-danger">{error}</div>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        if (!formData.username || !formData.password) {
                            setError('Username and Password cannot be empty');
                        } else {
                            handleUpdate();
                        }
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </MyContainer>
    );
};

export default Admin;
