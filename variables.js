const variables = {
  redirectUrl: process.env.REDIRECT_URL,
  sessionSecret: process.env.SESSION_SECRET,
  googleCallbackUrl: process.env.CALLBACK_URL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

module.exports = variables;
