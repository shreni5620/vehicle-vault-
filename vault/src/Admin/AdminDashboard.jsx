import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                navigate('/admin/login');
                return;
            }

            const response = await axios.get('http://localhost:3000/admin/dashboard-stats', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.data.error) {
                setStats(response.data.stats);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching dashboard stats');
            if (error.response?.status === 401) {
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{stats?.totalUsers || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Cars</h3>
                    <p>{stats?.totalCars || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Wishlist Items</h3>
                    <p>{stats?.totalWishlist || 0}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Inquiries</h3>
                    <p>{stats?.totalInquiries || 0}</p>
                </div>
            </div>
            {/* Add more dashboard components as needed */}
        </div>
    );
};

export default AdminDashboard;