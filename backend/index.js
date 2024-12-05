const express = require('express');
const cors = require('cors');
const { db, auth } = require('./utils/firebase');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/auth', authRoutes);
app.use('/game', gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

