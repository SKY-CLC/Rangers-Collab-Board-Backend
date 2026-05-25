const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const boardRoutes = require('./routes/board.routes');
const cardRoutes = require('./routes/card.routes');

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/boards',boardRoutes);
app.use('/aoi/cards',cardRoutes);

module.exports = app;