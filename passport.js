import passport from 'passport';
import GitHubStrategy from 'passport-github';
import User from './models/User';
import { githubLoginCallback } from './controllers/userControllers';
import routes from './routes';

passport.use(User.createStrategy());
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);
passport.serializeUser(User.serializeUser()); // what information does the cookie have
passport.deserializeUser(User.deserializeUser()); // how do you find user with info from cookie
