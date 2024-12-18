// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';

function Login({ setUserInfo }) {    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', { username, password });
            const userinfo = res.data
            userinfo.location = { // set default location to CUHK
                name: "The Chinese University of Hong Kong", 
                latitude: 22.4196, 
                longitude: 114.2068
            }
            localStorage.setItem('user', JSON.stringify(userinfo));
            setUserInfo(userinfo);
            navigate('/');
        } catch (error) {
            setError('Invalid username or password');
            console.error(error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2><center>Login</center></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username">
                            <strong>Username</strong>
                        </label>
                        <input type="text" 
                        placeholder='Enter Username' 
                        autoComplete='off' 
                        id='username'
                        name='username' 
                        className='form-control rounded-0' 
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password" 
                        placeholder='Enter Password' 
                        id='password'
                        name='password' 
                        className='form-control rounded-0' 
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

export default Login;
