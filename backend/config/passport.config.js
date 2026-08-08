import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';
import dotenv from 'dotenv';
dotenv.config();

const getOrCreateUser = async (profile, provider) => {
  const query = {};
  if (provider === 'google') query.googleId = profile.id;
  if (provider === 'github') query.githubId = profile.id;
  
  let user = await User.findOne(query);
  
  if (!user) {
    // Check if user exists by email
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
    if (email) {
      user = await User.findOne({ email });
      if (user) {
        // Link account
        if (provider === 'google') user.googleId = profile.id;
        if (provider === 'github') user.githubId = profile.id;
        await user.save();
        return user;
      }
    }

    let defaultRole = await Role.findOne({ name: 'Customer' });
    if (!defaultRole) {
      defaultRole = await Role.create({ name: 'Customer', description: 'Default customer role' });
    }

    const userData = {
      name: profile.displayName || profile.username || 'User',
      email: email || `${profile.id}@${provider}.com`, // fallback if no email
      isVerified: true,
      authProvider: provider,
      role: defaultRole._id,
      avatarUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : ''
    };

    if (provider === 'google') userData.googleId = profile.id;
    if (provider === 'github') userData.githubId = profile.id;

    user = await User.create(userData);
  }
  
  return user;
};

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await getOrCreateUser(profile, 'google');
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/api/auth/github/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await getOrCreateUser(profile, 'github');
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
}

export default passport;
