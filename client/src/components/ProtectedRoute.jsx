import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user')) || { username: null, admin: false };

    if (user.username) {
        return children
    }

    return <Navigate to="/login" />;
};
