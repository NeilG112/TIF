// Registration form functionality
class RegistrationForm {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.emailInput = document.getElementById('email');
        this.confirmEmailInput = document.getElementById('confirmEmail');
        this.submitBtn = document.querySelector('.submit-btn');
        this.successMessage = document.getElementById('successMessage');
        this.registeredUsers = document.getElementById('registeredUsers');
        this.usersList = document.getElementById('usersList');
        
        this.registeredEmails = [];
        this.isOnline = navigator.onLine;
        this.firebaseEnabled = false;
        
        this.init();
    }
    
    async init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.confirmEmailInput.addEventListener('input', () => this.clearError('confirmEmail'));
        
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncWithCloud();
        });
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
        
        // Initialize Firebase if available
        await this.initializeFirebase();
        
        // Load data from both local storage and cloud
        await this.loadData();
        
        // Show registered users if any exist
        if (this.registeredEmails.length > 0) {
            this.showRegisteredUsers();
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Clear previous errors
        this.clearAllErrors();
        
        // Get form data
        const email = this.emailInput.value.trim();
        const confirmEmail = this.confirmEmailInput.value.trim();
        
        // Validate inputs
        if (!this.validateEmail(email)) {
            this.showError('email', 'Please enter a valid email address');
            return;
        }
        
        if (email !== confirmEmail) {
            this.showError('confirmEmail', 'Email addresses do not match');
            return;
        }
        
        if (this.isEmailRegistered(email)) {
            this.showError('email', 'This email is already registered');
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        // Simulate API call delay
        setTimeout(() => {
            this.registerEmail(email);
            this.setLoadingState(false);
        }, 1500);
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isEmailRegistered(email) {
        return this.registeredEmails.some(user => user.email.toLowerCase() === email.toLowerCase());
    }
    
    async registerEmail(email) {
        const userData = {
            email: email,
            registeredAt: new Date().toISOString(),
            id: Date.now().toString()
        };
        
        this.registeredEmails.push(userData);
        
        // Save to local storage
        this.saveRegisteredEmails();
        
        // Save to cloud if available
        if (this.firebaseEnabled && this.isOnline) {
            await this.saveToCloud(userData);
        }
        
        this.showSuccessMessage();
        this.showRegisteredUsers();
        this.resetForm();
    }
    
    showSuccessMessage() {
        this.successMessage.style.display = 'block';
        this.form.style.display = 'none';
        
        // Hide success message after 3 seconds and show form again
        setTimeout(() => {
            this.successMessage.style.display = 'none';
            this.form.style.display = 'block';
        }, 3000);
    }
    
    showRegisteredUsers() {
        this.registeredUsers.style.display = 'block';
        this.renderUsersList();
    }
    
    renderUsersList() {
        this.usersList.innerHTML = '';
        
        this.registeredEmails.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            
            const emailSpan = document.createElement('span');
            emailSpan.className = 'user-email';
            emailSpan.textContent = user.email;
            
            const dateSpan = document.createElement('span');
            dateSpan.className = 'user-date';
            dateSpan.textContent = this.formatDate(user.registeredAt);
            
            userItem.appendChild(emailSpan);
            userItem.appendChild(dateSpan);
            this.usersList.appendChild(userItem);
        });
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    resetForm() {
        this.form.reset();
        this.clearAllErrors();
    }
    
    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }
    
    showError(field, message) {
        const errorElement = document.getElementById(field + 'Error');
        const inputElement = document.getElementById(field);
        
        errorElement.textContent = message;
        inputElement.classList.add('error');
    }
    
    clearError(field) {
        const errorElement = document.getElementById(field + 'Error');
        const inputElement = document.getElementById(field);
        
        errorElement.textContent = '';
        inputElement.classList.remove('error');
    }
    
    clearAllErrors() {
        this.clearError('email');
        this.clearError('confirmEmail');
    }
    
    loadRegisteredEmails() {
        try {
            const stored = localStorage.getItem('registeredEmails');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading registered emails:', error);
            return [];
        }
    }
    
    saveRegisteredEmails() {
        try {
            localStorage.setItem('registeredEmails', JSON.stringify(this.registeredEmails));
        } catch (error) {
            console.error('Error saving registered emails:', error);
        }
    }
    
    // Firebase and Cloud Sync Methods
    async initializeFirebase() {
        try {
            // Check if Firebase is available and configured
            if (window.firebaseApp && window.firebaseDb) {
                this.firebaseEnabled = true;
                console.log('Firebase initialized successfully');
                
                // Set up real-time listener for cloud data
                this.setupCloudListener();
            } else {
                console.log('Firebase not configured - using local storage only');
                this.firebaseEnabled = false;
            }
        } catch (error) {
            console.error('Firebase initialization failed:', error);
            this.firebaseEnabled = false;
        }
    }
    
    async loadData() {
        // Load from local storage first
        this.registeredEmails = this.loadRegisteredEmails();
        
        // If Firebase is enabled and online, sync with cloud
        if (this.firebaseEnabled && this.isOnline) {
            await this.syncWithCloud();
        }
    }
    
    async syncWithCloud() {
        if (!this.firebaseEnabled || !this.isOnline) return;
        
        try {
            const cloudData = await this.loadFromCloud();
            
            // Merge cloud data with local data
            const mergedData = this.mergeData(this.registeredEmails, cloudData);
            
            // Update local storage with merged data
            this.registeredEmails = mergedData;
            this.saveRegisteredEmails();
            
            // Update UI
            this.showRegisteredUsers();
            
            console.log('Data synced with cloud successfully');
        } catch (error) {
            console.error('Error syncing with cloud:', error);
        }
    }
    
    async loadFromCloud() {
        if (!this.firebaseEnabled) return [];
        
        try {
            console.log('Loading from cloud...');
            console.log('Firebase DB:', window.firebaseDb);
            console.log('Firebase Collection function:', window.firebaseCollection);
            
            const collectionRef = window.firebaseCollection(window.firebaseDb, 'registeredEmails');
            console.log('Collection reference:', collectionRef);
            
            const querySnapshot = await window.firebaseGetDocs(collectionRef);
            console.log('Query snapshot:', querySnapshot);
            
            const cloudData = [];
            querySnapshot.forEach((doc) => {
                cloudData.push({ id: doc.id, ...doc.data() });
            });
            
            console.log('Cloud data loaded:', cloudData);
            return cloudData;
        } catch (error) {
            console.error('Error loading from cloud:', error);
            return [];
        }
    }
    
    async saveToCloud(userData) {
        if (!this.firebaseEnabled) return;
        
        try {
            console.log('Saving to cloud...');
            console.log('User data:', userData);
            console.log('Firebase DB:', window.firebaseDb);
            
            const collectionRef = window.firebaseCollection(window.firebaseDb, 'registeredEmails');
            console.log('Collection reference:', collectionRef);
            
            await window.firebaseAddDoc(collectionRef, userData);
            console.log('Data saved to cloud successfully');
        } catch (error) {
            console.error('Error saving to cloud:', error);
        }
    }
    
    setupCloudListener() {
        if (!this.firebaseEnabled) return;
        
        try {
            const collectionRef = window.firebaseCollection(window.firebaseDb, 'registeredEmails');
            const unsubscribe = window.firebaseOnSnapshot(collectionRef, (querySnapshot) => {
                const cloudData = [];
                querySnapshot.forEach((doc) => {
                    cloudData.push({ id: doc.id, ...doc.data() });
                });
                
                // Update local data with cloud changes
                this.registeredEmails = cloudData;
                this.saveRegisteredEmails();
                this.showRegisteredUsers();
            });
            
            // Store unsubscribe function for cleanup
            this.cloudUnsubscribe = unsubscribe;
        } catch (error) {
            console.error('Error setting up cloud listener:', error);
        }
    }
    
    mergeData(localData, cloudData) {
        // Create a map of all data by email
        const dataMap = new Map();
        
        // Add local data
        localData.forEach(item => {
            dataMap.set(item.email.toLowerCase(), item);
        });
        
        // Add/update with cloud data
        cloudData.forEach(item => {
            const existing = dataMap.get(item.email.toLowerCase());
            if (!existing || new Date(item.registeredAt) > new Date(existing.registeredAt)) {
                dataMap.set(item.email.toLowerCase(), item);
            }
        });
        
        // Convert back to array and sort by registration date
        return Array.from(dataMap.values()).sort((a, b) => 
            new Date(b.registeredAt) - new Date(a.registeredAt)
        );
    }
    
    // Cleanup method
    destroy() {
        if (this.cloudUnsubscribe) {
            this.cloudUnsubscribe();
        }
    }
}

// Initialize the registration form when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationForm();
});

// Add some additional utility functions
const utils = {
    // Clear all data (useful for testing)
    clearAllData() {
        localStorage.removeItem('registeredEmails');
        location.reload();
    },
    
    // Export registered emails as JSON
    exportData() {
        const data = JSON.parse(localStorage.getItem('registeredEmails') || '[]');
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'registered-emails.json';
        a.click();
        URL.revokeObjectURL(url);
    }
};

// Make utils available globally for debugging/testing
window.registrationUtils = utils;
