require('dotenv').config();

const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID     : process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret : process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL  : `${process.env.HOME_URL}auth/google/callback`,
    scope        : ['profile', 'email'] 
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      googleId     : profile.id,
      fullName     : profile.displayName,
      email        : profile.emails && profile.emails[0].value,
      profilePhoto : profile._json?.picture
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
