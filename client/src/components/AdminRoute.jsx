import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user.isAdmin) {
        return children;
    }

    return <Navigate to="/home" />;
};

export default AdminRoute;