import React, { useState, useEffect } from 'react';
import { Bell, Tag, Newspaper, Info, X, Check, AlertTriangle } from 'lucide-react';
import '../assets/NotificationCenter.css';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  // Sample notifications data - Replace with API calls
  const sampleNotifications = [
    {
      id: 1,
      type: 'offer',
      title: 'Special Year-End Offer',
      message: 'Get up to 10% off on premium SUVs this month!',
      timestamp: new Date('2024-01-10T10:00:00'),
      read: false,
      icon: <Tag size={20} />,
      action: 'View Offer'
    },
    {
      id: 2,
      type: 'news',
      title: 'New Model Launch',
      message: 'The all-new 2024 BMW X5 has arrived at our dealership',
      timestamp: new Date('2024-01-09T15:30:00'),
      read: false,
      icon: <Newspaper size={20} />,
      action: 'Read More'
    },
    {
      id: 3,
      type: 'update',
      title: 'Service Reminder',
      message: 'Your vehicle is due for scheduled maintenance',
      timestamp: new Date('2024-01-08T09:15:00'),
      read: true,
      icon: <Info size={20} />,
      action: 'Schedule Now'
    }
  ];

  useEffect(() => {
    // Simulate fetching notifications
    setNotifications(sampleNotifications);
    updateUnreadCount(sampleNotifications);
  }, []);

  const updateUnreadCount = (notifs) => {
    setUnreadCount(notifs.filter(n => !n.read).length);
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({
      ...notif,
      read: true
    }));
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notif => notif.id !== id);
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
  };

  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notifications;
    return notifications.filter(notif => notif.type === activeTab);
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="notification-center">
      <button 
        className="notification-trigger"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {showNotifications && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="mark-all-read"
                onClick={markAllAsRead}
              >
                <Check size={16} />
                Mark all as read
              </button>
            )}
          </div>

          <div className="notification-tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={`tab ${activeTab === 'offer' ? 'active' : ''}`}
              onClick={() => setActiveTab('offer')}
            >
              Offers
            </button>
            <button 
              className={`tab ${activeTab === 'news' ? 'active' : ''}`}
              onClick={() => setActiveTab('news')}
            >
              News
            </button>
            <button 
              className={`tab ${activeTab === 'update' ? 'active' : ''}`}
              onClick={() => setActiveTab('update')}
            >
              Updates
            </button>
          </div>

          <div className="notifications-list">
            {getFilteredNotifications().length === 0 ? (
              <div className="empty-state">
                <AlertTriangle size={24} />
                <p>No notifications</p>
              </div>
            ) : (
              getFilteredNotifications().map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                >
                  <div className="notification-icon">
                    {notification.icon}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="timestamp">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                    {notification.action && (
                      <button className="action-button">
                        {notification.action}
                      </button>
                    )}
                  </div>
                  <div className="notification-actions">
                    {!notification.read && (
                      <button 
                        className="read-button"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button 
                      className="delete-button"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter; 