// server.js
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('cookie-session');
const path = require('path');

require('./config/passport');

const authRoutes = require('./routes/auth');
const oauthRoutes = require('./routes/oauth');

const app = express();
app.use(express.json());

// Cookie session (necesaria para Passport)
app.use(session({
  name: 'session',
  keys: ['secret1', 'secret2'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/auth', oauthRoutes);

// Static frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
