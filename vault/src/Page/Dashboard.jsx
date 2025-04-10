import React, { useState, useEffect } from 'react';
import { Package, Heart, Clock, Car, Warehouse, Settings, Settings2, LogOut, Edit2, X, Check, MapPin, FileText } from 'lucide-react';
import '../assets/Dashboard.css';
import Accessory from './Accessory';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  // Update initial state to use stored user info
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userInfo');
    return storedUser ? JSON.parse(storedUser) : {
      name: '',
      email: '',
      phone: '',
      vehicle: {
        type: 'SUV',
        model: 'X5',
        year: '2023'
      }
    };
  });

  // Add authentication check
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const [activeSection, setActiveSection] = useState('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [address, setAddress] = useState('');
  const [documents, setDocuments] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    { icon: Package, text: 'My Orders', id: 'orders' },
    { icon: Heart, text: 'Shortlisted Vehicles', id: 'shortlisted' },
    { icon: Clock, text: 'My Activity', id: 'activity' },
    { icon: Car, text: 'My Vehicles', id: 'vehicles' },
    { icon: Warehouse, text: 'My Garage', id: 'garage' },
    { icon: Package, text: 'Accessories', id: 'accessories' },
    { icon: Settings2, text: 'Manage Consents', id: 'consents' },
    { icon: Settings, text: 'Profile Settings', id: 'settings' },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
  };

  const handleSave = () => {
    setUser({ ...editedUser });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Handle address submission
    console.log('Address submitted:', address);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments([...documents, { name: file.name, type: file.type }]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const confirmLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userInfo');
    
    setUser({
      name: '',
      phone: '',
      email: '',
      vehicle: {
        type: '',
        model: '',
        year: ''
      }
    });

    navigate('/admin');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const LogoutConfirmation = () => (
    <div className="logout-confirmation-overlay">
      <div className="logout-confirmation-modal">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="logout-buttons">
          <button className="confirm-button" onClick={confirmLogout}>
            Yes, Logout
          </button>
          <button className="cancel-button" onClick={cancelLogout}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'settings':
        return (
          <div className="settings-container">
            <div className="settings-section">
              <h2>Profile Settings</h2>
              
              <div className="settings-card">
                <h3>Edit Profile</h3>
                <div className="profile-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" value={user.name} placeholder="Enter your full name" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={user.email} placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" value={user.phone} placeholder="Enter your phone number" />
                  </div>
                </div>
              </div>

              <div className="settings-card">
                <h3>Add Address</h3>
                <form onSubmit={handleAddressSubmit} className="address-form">
                  <div className="form-group">
                    <label>Address Line 1</label>
                    <input 
                      type="text" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your street address"
                    />
                  </div>
                  <button type="submit" className="save-button">
                    <MapPin className="icon" />
                    Save Address
                  </button>
                </form>
              </div>

              <div className="settings-card">
                <h3>Documents</h3>
                <div className="documents-section">
                  <div className="upload-area">
                    <input
                      type="file"
                      id="document-upload"
                      onChange={handleFileUpload}
                      className="file-input"
                    />
                    <label htmlFor="document-upload" className="upload-label">
                      <FileText className="icon" />
                      <span>Upload Document</span>
                    </label>
                  </div>
                  
                  {documents.length > 0 && (
                    <div className="documents-list">
                      <h4>Uploaded Documents</h4>
                      {documents.map((doc, index) => (
                        <div key={index} className="document-item">
                          <FileText className="icon" />
                          <span>{doc.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="settings-card">
                <h3>Vehicle Information</h3>
                <div className="profile-form">
                  <div className="form-group">
                    <label>Vehicle Type</label>
                    <select 
                      value={user.vehicle?.type || ''} 
                      onChange={(e) => setUser(prev => ({
                        ...prev, 
                        vehicle: { ...prev.vehicle, type: e.target.value }
                      }))}
                    >
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Vehicle Model</label>
                    <input 
                      type="text" 
                      value={user.vehicle?.model || ''} 
                      onChange={(e) => setUser(prev => ({
                        ...prev, 
                        vehicle: { ...prev.vehicle, model: e.target.value }
                      }))}
                      placeholder="Enter vehicle model"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <>
            <h1>My Orders</h1>
            <div className="empty-state">
              <div className="empty-state-content">
                <div className="empty-state-image">
                  <img 
                    src="https://images.unsplash.com/photo-1636489953081-c4ebbd50fa3b?auto=format&fit=crop&q=80&w=256"
                    alt="Empty box illustration"
                  />
                </div>
                <h3>No Orders Found</h3>
                <p>
                  No order yet, Start your auto explore journey and many more
                </p>
                <button className="browse-button">
                  Browse Vehicles
                </button>
              </div>
            </div>
          </>
        );
      
      case 'accessories':
        return (
          <div className="accessories-section">
            <h1>Vehicle Accessories</h1>
            <Accessory 
              carType={user.vehicle?.type || "SUV"} 
              carModel={user.vehicle?.model || "X5"} 
            />
          </div>
        );
      
      default:
        return (
          <div className="coming-soon">
            <h2>Coming Soon</h2>
            <p>This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        {/* User Profile */}
        <div className="user-profile">
          <div className="avatar">
            {user.name[0]}
          </div>
          
          {!isEditing ? (
            <>
              <h2 className="user-name">{user.name}</h2>
              <p className="user-phone">{user.phone}</p>
              <p className="user-email">{user.email || 'No email added'}</p>
              <button 
                onClick={handleEdit}
                className="edit-button"
              >
                <Edit2 className="icon" />
              </button>
            </>
          ) : (
            <div className="edit-form">
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleChange}
                  placeholder="Enter phone"
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>
              <div className="button-group">
                <button
                  onClick={handleSave}
                  className="save-button"
                >
                  <Check className="icon" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="cancel-button"
                >
                  <X className="icon" />
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {!isEditing && (
            <button className="link-account">
              Link your e-mail or social account
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <button 
                  className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="icon" />
                  <span>{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button className="logout-button" onClick={handleLogout}>
          <LogOut className="icon" />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {renderContent()}
      </div>

      {/* Add Logout Confirmation Dialog */}
      {showLogoutConfirm && <LogoutConfirmation />}
    </div>
  );
}

export default Dashboard;