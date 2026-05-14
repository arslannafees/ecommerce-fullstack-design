const admin = require('firebase-admin');

// Initialize Firebase Admin
// Uses serviceAccountKey.json locally, or FIREBASE_SERVICE_ACCOUNT env var on Render
try {
  let serviceAccount;
  
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Read from Environment Variable (Render/Production)
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // Read from File (Local Development)
    serviceAccount = require('./serviceAccountKey.json');
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://e-commerce-bf218-default-rtdb.asia-southeast1.firebasedatabase.app'
  });
  console.log('Firebase Admin initialized successfully');
} catch (e) {
  console.log('Firebase init error: ', e.message);
}

const rtdb = admin.apps.length > 0 ? admin.database() : null;

module.exports = { admin, rtdb };