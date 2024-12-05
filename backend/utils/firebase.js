const admin = require('firebase-admin');
const serviceAccount = require('../config/bananagame.json');

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://bananagame-cd559-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
    console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
    console.error("Firebase Admin SDK initialization failed:", error.message);
}


const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
