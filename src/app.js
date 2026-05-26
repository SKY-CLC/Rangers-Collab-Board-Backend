const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const boardRoutes = require('./routes/board.routes');
const cardRoutes = require('./routes/card.routes');
const shapeRoutes = require('./routes/shape.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const textRoutes = require('./routes/text.routes');
const searchRoutes = require('./routes/search.routes');

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/boards',boardRoutes);
app.use('/api/cards',cardRoutes);
app.use('/api/shapes',shapeRoutes);
app.use('/api/analytics',analyticsRoutes);
app.use('/api/texts',textRoutes);
app.use('/api/search',searchRoutes);


module.exports = app;