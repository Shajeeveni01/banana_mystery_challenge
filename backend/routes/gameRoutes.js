const express = require('express');
const { auth, db } = require('../utils/firebase');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const firebaseApiKey = process.env.FIREBASE_API_KEY;
const authenticateToken = require('../utils/middleware');

router.get('/topGames', async (req, res) => {
    const topGames = await db.collection('games').orderBy('score', 'desc').limit(10).get();

    res.status(200).json(topGames.docs.map(doc => ({ id: doc.id, ...doc.data() })));
});

router.get('/totalScore/', authenticateToken, async (req, res) => {
    const username = req.user.email;

    const totalScore = await db.collection('games').where('username', '==', username)
        .get()
        .then(querySnapshot => querySnapshot.docs
            .reduce((total, doc) => total + doc.data().score, 0));

    res.status(200).json({ totalScore });
});
router.get('/getusername', authenticateToken, async (req, res) => {
    const username = req.user.email;

    res.status(200).json({ username });
});

router.post('/gameover', authenticateToken, async (req, res) => {
    const { score } = req.body;
    const username = req.user.email;

    const gameId = "G-" + Math.random().toString(36).substring(2, 10) + (new Date()).getTime().toString(36);
    try {
        const gameRef = db.collection('games').doc(gameId);  


        await gameRef.set({
            score: score,
            username: username,  
            timestamp: Date.now(),
        });
  
    res.status(200).json({ message: "Game data saved successfully" });
    } catch (error) {
        console.error("Error saving game data:", error);
        res.status(500).json({ message: "Failed to save game data" });
    }
  
});

module.exports = router;
