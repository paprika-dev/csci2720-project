import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { MyContainer } from '../components/MyContainer';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

const AdminUser = () => {
    const [users, setUsers] = useState([]);
    const [userFormData, setUserFormData] = useState({ username: '', password: '', confirmPassword: '', admin: false });
    const [createUserError, setCreateUseError] = useState('');
    const [editUserError, setEditUserError] = useState('');
    const [showUserModal, setShowUserModal] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users');    
            response.data.sort((a, b) => a.username.localeCompare(b.username));
            setUsers(response.data);
        } catch (error) {
            console.error('There was an error fetching the users!', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserFormData({ ...userFormData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (userFormData.password !== userFormData.confirmPassword) {
            setCreateUseError('Passwords do not match');
            return;
        }
        try {
            await axios.post('/users', { username: userFormData.username, password: userFormData.password, admin: userFormData.admin });
            alert('User registered successfully');
            fetchUsers();
            setUserFormData({ username: '', password: '', confirmPassword: '', admin: false });
            setCreateUseError('');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                setCreateUseError('User already exists');
            } else {
                setCreateUseError(error.response.data.error || 'An error occurred');
            }
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await axios.delete(`/users/${id}`);
            alert('User deleted successfully');
            fetchUsers();
        } catch (error) {
            console.error('There was an error deleting the user!', error);
        }
    };

    const handleUpdateUserButton = (user) => {
        setEditUserId(user._id);
        setUserFormData({ username: user.username, password: '', confirmPassword: '', admin: user.admin });
        setShowUserModal(true);
    };

    const handleUpdateUser = async () => {
        if (userFormData.password !== userFormData.confirmPassword) {
            setEditUserError('Passwords do not match');
            return;
        }
        try {
            await axios.put(`/users/${editUserId}`, { username: userFormData.username, password: userFormData.password, admin: userFormData.admin });
            alert('User updated successfully');
            fetchUsers();
            setShowUserModal(false);
            setUserFormData({ username: '', password: '', confirmPassword: '', admin: false });
            setEditUserError('');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                setEditUserError('User already exists');
            } else if (error.response && error.response.status === 400) {
                setEditUserError('Invalid input');
            } else {
                setEditUserError(error.response.data.error || 'An error occurred');
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
                                        <FaTrash onClick={() => handleDeleteUser(user._id)} style={{ color: 'red', cursor: 'pointer', marginRight: '2px' }} />
                                        <span style={{ fontSize: '20px', fontWeight: 'bold', verticalAlign: 'middle' }}> / </span>
                                        <FaEdit onClick={() => handleUpdateUserButton(user)} style={{ color: 'blue', cursor: 'pointer', marginLeft: '2px' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2 className="mt-5">Create New User</h2>
                <form onSubmit={(e) => { handleCreateUser(e); setCreateUseError(''); }} className="p-4 border rounded bg-light">
                    <div className="mb-1">
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='username'
                            className='form-control rounded-0'
                            value={userFormData.username}
                            onChange={handleUserChange}
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
                            value={userFormData.password}
                            onChange={handleUserChange}
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
                            value={userFormData.confirmPassword}
                            onChange={handleUserChange}
                            required
                        />
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="admin"
                            name="admin"
                            checked={userFormData.admin}
                            onChange={(e) => setUserFormData({ ...userFormData, admin: e.target.checked })}
                        />
                        <label className="form-check-label" htmlFor="admin">Admin</label>
                    </div>
                    {createUserError && <div className="alert alert-danger">{createUserError}</div>}
                    <button type="submit" className="btn btn-primary">Create User</button>
                </form>
            </div>

            <Modal show={showUserModal} onHide={() => { setShowUserModal(false); setEditUserError(''); setUserFormData({ username: '', password: '', confirmPassword: '', admin: false }); }}>
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
                                value={userFormData.username}
                                onChange={handleUserChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={userFormData.password}
                                onChange={handleUserChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                name="confirmPassword"
                                value={userFormData.confirmPassword}
                                onChange={handleUserChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAdmin">
                            <Form.Check
                                type="checkbox"
                                label="Admin"
                                name="admin"
                                checked={userFormData.admin}
                                onChange={(e) => setUserFormData({ ...userFormData, admin: e.target.checked })}
                            />
                        </Form.Group>
                        {editUserError && <div className="alert alert-danger">{editUserError}</div>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowUserModal(false); setEditUserError(''); setUserFormData({ username: '', password: '', confirmPassword: '', admin: false }); }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        if (!userFormData.username || !userFormData.password) {
                            setEditUserError('Username and Password cannot be empty');
                        } else {
                            handleUpdateUser();
                            setEditUserError('');
                        }
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </MyContainer>
    );
};

export default AdminUser;
