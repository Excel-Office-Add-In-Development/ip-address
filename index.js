require("dotenv").config({});
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(cors());
app.use(morgan("tiny"));

const {
  redirectUrl,
  sessionSecret,
  googleClientId,
  googleCallbackUrl,
  googleClientSecret,
} = require("./variables");

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: sessionSecret,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      callbackURL: googleCallbackUrl,
      clientSecret: googleClientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      };
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${redirectUrl}?user=null`,
  }),
  (req, res) => {
    const user = JSON.stringify(req.user);
    res.redirect(`${redirectUrl}?user=${user}`);
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => {});
  res.status(200).end();
});

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Hello World!</h1>`);
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server started ⚡`);
});
