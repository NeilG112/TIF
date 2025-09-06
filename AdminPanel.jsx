import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRegisteredEmails();
  }, []);

  const loadRegisteredEmails = () => {
    try {
      const stored = localStorage.getItem('registeredEmails');
      const emails = stored ? JSON.parse(stored) : [];
      setRegisteredEmails(emails);
    } catch (error) {
      console.error('Error loading registered emails:', error);
      setRegisteredEmails([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete ALL registered emails? This cannot be undone!')) {
      localStorage.removeItem('registeredEmails');
      setRegisteredEmails([]);
    }
  };

  const exportAsJSON = () => {
    const dataStr = JSON.stringify(registeredEmails, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fund-waitlist-emails.json';
    a.click();
    URL.revokeObjectURL(url);
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
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fund-waitlist-emails.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const emails = registeredEmails.map(email => email.email).join('\n');
    navigator.clipboard.writeText(emails).then(() => {
      alert('All emails copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
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

  const getTodayCount = () => {
    const today = new Date().toDateString();
    return registeredEmails.filter(email => 
      new Date(email.registeredAt).toDateString() === today
    ).length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500/10 to-purple-500/10 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gradient">$FUND Admin Panel</h1>
            <p className="text-xl text-gray-300">Manage your waitlist registrations</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10">
            <div className="text-3xl font-bold text-teal-400 mb-2">{registeredEmails.length}</div>
            <div className="text-gray-300">Total Registrations</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10">
            <div className="text-3xl font-bold text-purple-400 mb-2">{getTodayCount()}</div>
            <div className="text-gray-300">Today's Registrations</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {registeredEmails.length > 0 ? 'Active' : 'Empty'}
            </div>
            <div className="text-gray-300">Waitlist Status</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 mb-8">
          <h3 className="text-xl font-semibold mb-4">Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={exportAsJSON}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              📄 Export JSON
            </button>
            <button
              onClick={exportAsCSV}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              📊 Export CSV
            </button>
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              📋 Copy Emails
            </button>
            <button
              onClick={loadRegisteredEmails}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              🔄 Refresh
            </button>
            <button
              onClick={clearAllData}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              🗑️ Clear All
            </button>
            <a
              href="/"
              className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-block"
            >
              🏠 Back to Landing
            </a>
          </div>
        </div>

        {/* Emails List */}
        <div className="bg-slate-800/50 rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-semibold">Registered Emails ({registeredEmails.length})</h3>
          </div>
          
          {registeredEmails.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-lg mb-2">No emails registered yet</p>
              <p className="text-sm">Emails will appear here once people start joining the waitlist</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {registeredEmails
                .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt))
                .map((email, index) => (
                  <div key={email.id} className="p-4 border-b border-white/5 hover:bg-slate-700/30 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-white">{email.email}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          Registered: {formatDate(email.registeredAt)}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 ml-4">
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
