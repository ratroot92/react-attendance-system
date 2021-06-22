const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModal = require("./../models/user.model");
const connection = require("../config/mysql.pool");

module.exports = function (passport) {
  const customFields = {
    usernameField: "email",
    passwordField: "password",
  };

  const verifyCallback = (email, password, done) => {
    console.log("====================================");
    console.log("*** - verifyCallback - - *** ");
    console.log("====================================");
    let queryBuilder = "SELECT * FROM user WHERE email = ? LIMIT 1";
    connection.query(queryBuilder, [email], (err, result) => {
      if (err) throw new Error(err);
      if (result.length > 0) {
        // ==> (inputPassword,hashedPassword,userObject,callbackFunction)
        userModal.comparePassword(password,result[0].password,result[0],done);
      } else {
        return done(null, false);
      }
    });
  };
  const strategy = new LocalStrategy(customFields, verifyCallback);
  passport.use("local", strategy);

  passport.serializeUser(function (user, done) {
    console.log('====================================');
    console.log('*** - serializeUser - *** ');
    console.log('====================================');
    // done(null, user.id);
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    // console.log('====================================');
    // console.log('*** - deserializeUser - *** ');
    // console.log('====================================');
    const { id, email } = user;
    let queryBuilder = "SELECT * FROM user WHERE id = ? LIMIT 1";
    connection.query(queryBuilder, [id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) done(err, result[0]);
    });
  });
};