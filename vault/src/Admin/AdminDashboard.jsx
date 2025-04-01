import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Car, Users, Calendar, DollarSign, LogOut,Plus, Search, Filter, MoreVertical, Edit, Trash} from 'lucide-react';
import "../assets/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('vehicles');

  const stats = [
    { icon: <Car size={24} />, label: 'Total Vehicles', value: '124' },
    { icon: <Users size={24} />, label: 'Test Drives', value: '48' },
    { icon: <Calendar size={24} />, label: 'Appointments', value: '12' },
    { icon: <DollarSign size={24} />, label: 'Revenue', value: '$284,500' },
  ];

  const vehicles = [
    {
      id: 1,
      name: '2024 BMW X5',
      price: '$62,900',
      status: 'Available',
      lastUpdated: '2024-03-15'
    },
    {
      id: 2,
      name: '2024 Mercedes-Benz C-Class',
      price: '$56,500',
      status: 'Test Drive',
      lastUpdated: '2024-03-14'
    },
    // Add more vehicles as needed
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login',{replace:true});
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h1>Vehicle Vault</h1>
          <p>Admin Dashboard</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'vehicles' ? 'active' : ''}`}
            onClick={() => setActiveTab('vehicles')}
          >
            <Car size={20} />
            Vehicles
          </button>
          <button
            className={`nav-item ${activeTab === 'test-drives' ? 'active' : ''}`}
            onClick={() => setActiveTab('test-drives')}
          >
            <Calendar size={20} />
            User
          </button>
          <button
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <Users size={20} />
            Customers
          </button>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="main-header">
          <h2>Vehicle Management</h2>
          <button className="add-vehicle-btn" onClick={()=> navigate("/add-vehicle")}>
            <Plus size={20} />
            Add New Vehicle
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              {stat.icon}
              <div>
                <h3>{stat.label}</h3>
                <p>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Vehicles Table */}
        <div className="table-container">
          <div className="table-header">
            <div className="search-bar">
              <Search size={20} />
              <input type="text" placeholder="Search vehicles..." />
            </div>
            <button className="filter-button">
              <Filter size={20} />
              Filter
            </button>
          </div>

          <table className="vehicles-table">
            <thead>
              <tr>
                <th>Vehicle Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.price}</td>
                  <td>
                    <span className={`status-badge ${vehicle.status.toLowerCase()}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td>{vehicle.lastUpdated}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit">
                        <Edit size={16} />
                      </button>
                      <button className="action-btn delete">
                        <Trash size={16} />
                      </button>
                      <button className="action-btn more">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;