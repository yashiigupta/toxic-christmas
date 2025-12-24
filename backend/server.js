require('dotenv').config();
const express = require('express');
const cors = require('cors');
const judgeRoutes = require('./routes/judge');
const speakRoutes = require('./routes/speak');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for base64 images

// Routes
app.use('/api/judge', judgeRoutes);
app.use('/api/speak', speakRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Unqualified Opinions API is running. Prepare to be judged.');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Theme: Toxic Christmas 🎄');
});
