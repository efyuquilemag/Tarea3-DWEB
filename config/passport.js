// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

const users = []; // misma "base de datos" en memoria

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  let user = users.find(u => u.googleId === profile.id);
  if (!user) {
    user = { googleId: profile.id, email: profile.emails[0].value };
    users.push(user);
  }
  done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.googleId === id);
  done(null, user);
});
