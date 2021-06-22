const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passportConfig = require("../config/passport");
const userModel = require("./../models/user.model");
const { body, validationResult, errors } = require("express-validator/check");
const { check } = require("express-validator/check");
const { isAuthenticated } = require("../config/session");
const { session } = require("passport");
const sqlHelper = require("../config/sqlHeplers");
const pool = require("../config/mysql.pool");


userRouter.use((req,res,next)=>{
  console.log("USER ROUTER");
  next();
})


userRouter.post(
  "/register",
  [
    body("username")
      .not()
      .isEmpty()
      .custom((value) => {
        return userModel.userNameExist(value).then((username) => {
          if (username) return Promise.reject("Username already in use");
        });
      }),

    body("email")
      .not()
      .isEmpty()
      .custom((value) => {
        return userModel.userEmailExist(value).then((username) => {
          if (username) return Promise.reject("Email already in use");
        });
      }),
    body("password").not().isEmpty(),
  ],
  (req, res) => {
    console.log("/api/user/register ");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      userModel
        .insertUser(req.body)
        .then((userObject) => {
          res.json({
            data: userObject,
            success: true,
            message: "User inserted successfully",
          });
        })
        .catch((err) => {
          console.log(err)
          res.json({
            data: err,
            success: false,
            message: "user insertion failed ",
          });
        });
    }

    //
  }
);


userRouter.post(
  "/login",
  [check("email").not().isEmpty(), check("password").not().isEmpty()],
  passport.authenticate("local"),
  (req, res) => {
    console.log('====================================');
    console.log("login");
    console.log('====================================');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      console.log('====================================');
      console.log("asd");
      console.log('====================================');
      if(req.isAuthenticated()){
        const {email,username,id,status}=req.user;
        res.status(200).send({success:true,data:{email,username,id,status},message:"login successfull"})
      }
      else{
        console.log('====================================');
        console.log("REQUEST IS AUTHENTICTED ELSE ");
        console.log('====================================');
        res.status(200).send({success:false,data:false,messsage:"login failed"})
      }

    }
     
  }
);

/*
 * admin isAutheticated
 */

userRouter.get("/is-authenticated", (req, res) => {
  console.log("/api/admin/authenticated ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    const { id, username, email, status,  } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: {
        username,
        id,
        email,
        status,
      },
    });
  } else {
    res.status(200).json({
      isAuthenticated: false,
      user: {
        username: "",
        id: "",
        email: "",
        status: "",
      },
    });
  }


});

/*
  ! Logout Route
*/
userRouter.get("/logout", isAuthenticated, (req, res) => {
  console.log("/logout");
  req.logout();
  res.json({
    user: {
      username: "",
      role: "",
    },
    success: true,
  });
});


/**
 * Email Exist
 */
userRouter.post("/email/exist",
[check("email").not().isEmpty()],
 (req, res) => {
  console.log("/exist/email ");
  userModel
    .userEmailExist(req.body.email)
    .then((exist) => {
      if (exist)
        res.json({
          success: true,
          exist: true,
          message: "email already exist ",
        });
      else
        res.json({ success: true, exist: false, message: "emial does not eixst " });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        message: "something went wrong ",
      });
    });
});

module.exports = userRouter;