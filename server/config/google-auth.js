require('dotenv').config();

const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    scope: ['profile', 'email'] 
  },
  (accessToken, refreshToken, profile, done) => {
    // Extracting profile information
    const googleId = profile.id; // Google ID
    const fullName = profile.displayName; // User's full name
    const email = profile.emails && profile.emails[0].value; // User's email address
    // you can access the google profile pic from the profile object

    // Constructing the user object
    const user = {
      googleId,
      fullName,
      email,
      // Date of birth might not be directly available through the standard profile information
    };
    
    done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
