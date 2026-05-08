const admin = require('firebase-admin');

// Initialize Firebase Admin (Requires service account key)
// Place your serviceAccountKey.json in the server folder
try {
  const serviceAccount = require('./serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://e-commerce-bf218-default-rtdb.asia-southeast1.firebasedatabase.app' // Updated DB URL
  });
} catch (e) {
  console.log('Firebase init error: ', e.message);
  console.log('Please ensure serviceAccountKey.json exists and is valid.');
}

const rtdb = admin.apps.length > 0 ? admin.database() : null;

module.exports = { admin, rtdb };