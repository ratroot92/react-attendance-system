const express = require("express");
const attendanceRouter = express.Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passportConfig = require("../config/passport");
const attendanceModel = require("./../models/attendance.model");
const { body, validationResult, errors } = require("express-validator/check");
const { check } = require("express-validator/check");
const { isAuthenticated } = require("../config/session");
const { session } = require("passport");
const sqlHelper = require("../config/sqlHeplers");
const pool = require("../config/mysql.pool");


attendanceRouter.use((req,res,next)=>{
  console.log("USER ROUTER");
  next();
})








attendanceRouter.post("/get-by-email",[
    body("email")
      .not()
      .isEmpty()
    //   .custom((value) => {
    //     return attendanceModel.userNameExist(value).then((username) => {
    //       if (username) return Promise.reject("Username already in use");
    //     });
    //   }),

   
  ],(req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
      } else {
          console.log(req.body)
        attendanceModel.getAttendanceByEmail(req.body.email)
          .then((attendanceSheet) => {
            res.json({
              data: attendanceSheet,
              success: true,
              message: "get attendance by id successfull",
            });
          })
          .catch((err) => {
            console.log(err)
            res.json({
              data: err,
              success: false,
              message: "get attendance by id failed ",
            });
          });
        }})


attendanceRouter.post("/mark-attendance",[
    body("id")
      .not()
      .isEmpty(),
      body("date")
      .not()
      .isEmpty()
  ],(
      req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
      } else {
        attendanceModel.markAttendance(req.body)
          .then((attendanceSheet) => {
            res.json({
              data: attendanceSheet,
              success: true,
              message: "get all attendance successfull",
            });
          })
          .catch((err) => {
            console.log(err)
            res.json({
              data: err,
              success: false,
              message: "get attendance by id failed ",
            });
          });
        }})



attendanceRouter.post("/validate-attendance",[
    body("id")
      .not()
      .isEmpty(),
      body("date")
      .not()
      .isEmpty()
  ],(
      req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
      } else {
        attendanceModel.validateAttendance(req.body)
          .then((isMarked) => {
            res.json({
              data: isMarked,
              success: true,
              message: "get all attendance successfull",
            });
          })
          .catch((err) => {
            console.log(err)
            res.json({
              data: err,
              success: false,
              message: "get attendance by id failed ",
            });
          });
        }})



       




module.exports = attendanceRouter;