const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const boardRoutes = require('./routes/board.routes')

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/boards',boardRoutes);

module.exports = app;