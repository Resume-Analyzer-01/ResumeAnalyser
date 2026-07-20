import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as GitHubStrategy } from 'passport-github2'
import User from '../models/User.js'

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists in our db with the given googleId
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            return done(null, user)
          }

          // Check if user exists with the same email
          const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null
          if (email) {
            user = await User.findOne({ email: email.toLowerCase() })
            if (user) {
              // Update user with googleId
              user.googleId = profile.id
              // Also update avatar if it's empty
              if (!user.avatar && profile.photos && profile.photos.length > 0) {
                user.avatar = profile.photos[0].value
              }
              await user.save()
              return done(null, user)
            }
          }

          // If not, create a new user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: email || `${profile.id}@google.oauth`, // Fallback email
            avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',
            emailVerified: true // OAuth implies verified email
          })
          
          done(null, user)
        } catch (error) {
          done(error, null)
        }
      }
    )
  )
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/api/auth/github/callback',
        scope: ['user:email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ githubId: profile.id })

          if (user) {
            return done(null, user)
          }

          const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null
          if (email) {
            user = await User.findOne({ email: email.toLowerCase() })
            if (user) {
              user.githubId = profile.id
              if (!user.avatar && profile.photos && profile.photos.length > 0) {
                user.avatar = profile.photos[0].value
              }
              await user.save()
              return done(null, user)
            }
          }

          user = await User.create({
            githubId: profile.id,
            name: profile.displayName || profile.username,
            email: email || `${profile.username}@github.oauth`, // Fallback email
            avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',
            emailVerified: true
          })
          
          done(null, user)
        } catch (error) {
          done(error, null)
        }
      }
    )
  )
}

export default passport
