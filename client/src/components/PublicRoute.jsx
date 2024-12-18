// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import React from 'react';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user')) || { username: null, admin: false };

    if (user.username) {
        return <Navigate to="/" />;
    }

    return children;
};
