const passport = require('passport');
const googleStrategy = require('./googleStrategy');

passport.use(googleStrategy);

module.exports = passport;