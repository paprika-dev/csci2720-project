import React from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user')) || { username: null, admin: false };

    if (user.username) {
        return <Navigate to="/" />;
    }

    return children;
};
