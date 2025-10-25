require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // ✅ We'll handle connection inside db.js
const jobsRouter = require('./routes/jobs');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
connectDB();  // We'll define MONGO_URI inside db.js or .env

// ✅ API routes
app.use('/api/jobs', jobsRouter);

// ✅ 404 handler
app.use((req, res) => res.status(405).json({ error: 'Not found' }));

// ✅ Error middleware
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
