import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';

function Register() {    
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
    const navigation = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('/users', { username: formData.username, password: formData.password, admin: false });
            alert('User registered successfully');
            navigation('/login');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                setError('User already exists');
            } else {
                setError(error.response.data.error || 'An error occurred');
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2><center>Sign Up</center></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username">
                            <strong>Name</strong>
                        </label>
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
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
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
                    <div className="mb-3">
                        <label htmlFor="confirmPassword">
                            <strong>Confirm Password</strong>
                        </label>
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
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Sign Up
                    </button>
                </form>
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Register;
