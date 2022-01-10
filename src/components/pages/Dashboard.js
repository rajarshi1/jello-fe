import React, { useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../other/Navbar';

const Dashboard = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    if (!isAuthenticated) {
        return <Navigate to='/' />;
      }
    return (
        <div className='dashboard-and-navbar'>
            <Navbar />
            <h1>Welcome to Dashboard</h1>
        </div>
    );
}

export default Dashboard;
