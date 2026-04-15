const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const resumeRoutes = require('./routes/resume.routes');
const aiRoutes = require('./routes/ai.routes');

const app = express();

app.use(helmet());
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);
const aiLimiter = rateLimit({ windowMs: 60 * 1000, max: 10, message: { error: 'AI limit reached.' } });
app.use('/api/ai/', aiLimiter);

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connect — works with local MongoDB (no Atlas needed)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected:', process.env.MONGODB_URI))
  .catch((err) => {
    console.error('\n❌ MongoDB connection failed!');
    console.error('Error:', err.message);
    console.error('\n👉 Fix: Make sure MongoDB is running.');
    console.error('   Install from: https://www.mongodb.com/try/download/community');
    console.error('   Then run:  net start MongoDB  (Windows)\n');
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});
app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Backend running → http://localhost:${PORT}`);
  console.log(`   Frontend should be on → http://localhost:3000\n`);
});

module.exports = app;
