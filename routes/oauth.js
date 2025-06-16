// routes/oauth.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ruta para iniciar login con Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback de Google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ email: req.user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Redirige al frontend con el token como query param
    res.redirect(`/google-success.html?token=${token}`);
  }
);

module.exports = router;
