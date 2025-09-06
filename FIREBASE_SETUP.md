# 🔥 Firebase Setup Guide

This guide will help you set up Firebase to enable cloud storage for your email registration website.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "email-registration-app")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Firestore Database

1. In your Firebase project, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database (choose closest to your users)
5. Click "Done"

## Step 3: Get Your Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Enter an app nickname (e.g., "Email Registration Web App")
6. Click "Register app"
7. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id-here"
};
```

## Step 4: Update Your Configuration

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Step 5: Set Up Firestore Security Rules (Important!)

1. Go to Firestore Database in your Firebase console
2. Click on "Rules" tab
3. Replace the default rules with these (for development):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to registeredEmails collection
    match /registeredEmails/{document} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Security Note**: These rules allow anyone to read/write data. For production, implement proper authentication and security rules.

## Step 6: Test Your Setup

1. Open `index.html` in your browser
2. Register a test email
3. Open `admin.html` to see the cloud admin panel
4. Check if the email appears in the admin panel
5. Verify the sync status shows "Cloud sync active"

## Step 7: Production Security (Optional but Recommended)

For production use, consider:

1. **Enable Authentication**: Add user authentication to restrict access
2. **Update Security Rules**: Implement proper Firestore security rules
3. **Enable App Check**: Add App Check for additional security
4. **Set up Monitoring**: Enable Firebase monitoring and alerts

## Troubleshooting

### Common Issues:

1. **"Firebase not configured" message**
   - Check that you've updated `firebase-config.js` with your actual credentials
   - Make sure the file is loading correctly (check browser console)

2. **"Permission denied" errors**
   - Check your Firestore security rules
   - Make sure you're using the correct project ID

3. **Data not syncing**
   - Check your internet connection
   - Verify Firebase project is active
   - Check browser console for error messages

4. **CORS errors**
   - Make sure you're serving the files from a web server (not file://)
   - Use a local server like Live Server extension in VS Code

## File Structure After Setup

```
registration-website/
├── index.html              # Main registration page
├── admin.html              # Cloud admin panel
├── styles.css              # Styling
├── script.js               # Main functionality with cloud sync
├── firebase-config.js      # Firebase configuration (update this!)
├── README.md               # Original documentation
└── FIREBASE_SETUP.md       # This setup guide
```

## Features After Firebase Setup

✅ **Cloud Storage**: Emails stored in Firebase Firestore  
✅ **Real-time Sync**: Changes sync across all devices instantly  
✅ **Offline Support**: Works offline, syncs when online  
✅ **Admin Panel**: Access emails from anywhere via `admin.html`  
✅ **Data Export**: Export emails as JSON or CSV  
✅ **Backup**: Automatic cloud backup of all data  

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Firebase configuration is correct
3. Ensure your Firestore security rules allow access
4. Make sure you're connected to the internet

Your email registration website is now ready for cloud storage! 🎉
