import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const AdminPanel = () => {
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRegisteredEmails();
  }, []);

  const loadRegisteredEmails = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'registeredEmails'));
      const emails = [];
      querySnapshot.forEach((docSnap) => {
        emails.push({ id: docSnap.id, ...docSnap.data() });
      });
      setRegisteredEmails(emails);
    } catch (error) {
      setRegisteredEmails([]);
    }
    setIsLoading(false);
  };

  const clearAllData = async () => {
    if (!window.confirm('Are you sure you want to delete ALL registered emails? This cannot be undone!')) return;
    for (const email of registeredEmails) {
      await deleteDoc(doc(db, 'registeredEmails', email.id));
    }
    setRegisteredEmails([]);
    loadRegisteredEmails();
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(registeredEmails, null, 2);
    downloadFile(dataStr, 'registered-emails.json', 'application/json');
  };

  const exportAsCSV = () => {
    const headers = ['Email', 'Registration Date', 'ID'];
    const csvContent = [
      headers.join(','),
      ...registeredEmails.map(email => [
        `"${email.email}"`,
        `"${email.registeredAt}"`,
        `"${email.id}"`
      ].join(','))
    ].join('\n');
    downloadFile(csvContent, 'registered-emails.csv', 'text/csv');
  };

  const copyToClipboard = () => {
    const emails = registeredEmails.map(email => email.email).join('\n');
    navigator.clipboard.writeText(emails).then(() => {
      alert('All emails copied to clipboard!');
    });
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteEmail = async (id) => {
    if (!window.confirm('Are you sure you want to delete this email?')) return;
    await deleteDoc(doc(db, 'registeredEmails', id));
    loadRegisteredEmails();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>☁️ Cloud Admin Panel</h1>
        <p>Manage Registered Email Addresses from Anywhere</p>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{registeredEmails.length}</div>
          <div className="stat-label">Total Registrations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{registeredEmails.filter(email => new Date(email.registeredAt).toDateString() === new Date().toDateString()).length}</div>
          <div className="stat-label">Today's Registrations</div>
        </div>
      </div>
      <div className="control-panel">
        <h3>🛠️ Control Panel</h3>
        <div className="control-buttons">
          <button className="btn btn-success" onClick={exportAsJSON}>📄 Export JSON</button>
          <button className="btn btn-success" onClick={exportAsCSV}>📊 Export CSV</button>
          <button className="btn btn-warning" onClick={copyToClipboard}>📋 Copy All Emails</button>
          <button className="btn btn-danger" onClick={clearAllData}>🗑️ Clear All Data</button>
        </div>
      </div>
      <div className="emails-table">
        <div className="table-header">
          <h3>📧 Registered Emails</h3>
          <div>
            <strong>Total:</strong> <span>{registeredEmails.length}</span> emails
          </div>
        </div>
        <div className="emails-list">
          {registeredEmails.length === 0 ? (
            <div className="no-emails">
              <p>No registered emails found.</p>
            </div>
          ) : (
            registeredEmails.map(email => (
              <div className="email-item" key={email.id}>
                <div className="email-info">
                  <div className="email-address">{email.email}</div>
                  <div className="email-date">{formatDate(email.registeredAt)}</div>
                </div>
                <div className="email-actions">
                  <button className="btn btn-danger" onClick={() => deleteEmail(email.id)}>🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
