const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
require("./config/passport")(passport);
const cookie = require("cookie");
const path = require("path");
require("dotenv").config({
  path: "./config/config.env",
});
const mysqlDb = require("./config/mysql.pool");
const MySQLStore = require("express-mysql-session")(session);
const options = {
    connectionLimit : process.env.MYSQL_CONNECTION_LIMIT,
    host:process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port:process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DB_NAME,
};
const sessionStore = new MySQLStore(options);

/** \
 *
 */
// Require Configs and Environment files


/*
! Initliaze global Middlewares
*/
const app = express();
const allowlist = [
  "http://localhost",
];

app.use((req, res, next) => {
  // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", allowlist);
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,content-type,set-cookie"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use((req, res, next) => {
  if (mysqlDb.state === "disconnected") {
    console.log("****************************");
    console.log("DB DISCONNECTED ");
    console.log("****************************");
    res.status(401).end();
  } else {
    console.log("****************************");
    console.log("DB CONNECTED ");
    console.log("****************************");
    next();
  }
});

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));
// app.use(express.json());
app.use((req, res, next) => {
  console.log("****************************");
  console.log(
    "req.headers.origin === ",
    req.headers.origin || req.headers.host
  );
  console.log("req.originalUrl === ", req.originalUrl);
  console.log("****************************");
  next();
});
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/web/api/test", (req, res, next) => {
  console.log("====================================");
  console.log("Test Route Called ");
  console.log("====================================");
  res.status(200).json({
    message: {
      serverIp: "127.0.0.1",
      sshCommand: "ssh -i key_path ubuntu@127.0.0.1",
      sshKey: `-----BEGIN RSA PRIVATE KEY----- MIIEpAIBAAKCAQEAg1HqM6OiLadNj8bcRt0/MbSk6Cj2T/wcDkZ+1VJRHU0Ta7/E zCltF+x5CYf+sbFotEeUd2jOrGY8RhTGrKlcvEir1JlwurJ2nZhzFir7m4unzDNv dGLQgIQjOxrw0ovr7qp9EoazzbtLIg0NpgeDT2jRjd/1xo0jiNhg6YOmMwrWZ99H Odo4VLumourxy+i1V5jf1JdCz9vwoazfFR5tbn/MK5Df1eTSDb+bqP8H9x1n1Xie BEwHVp4eO3aGVp+ARVw+3+H89MBwXb8GBVzlgnATmM3WEmAKSeX2CwwOUVLQ10Fp IuJ2twAC7m66dZo5kriGp75Fm+DJDyCM3pO52QIDAQABAoIBABgnvjPHerJ5Hsw+ oRAr7E7hUqAdwMkPr710fCoTHTaNke/082c2i4mmBtGZAWGAJ6lZrVaVocaWe6nM cosaECPWHj1aCCFfaHAutaSzPVrsQm5OW8cF0iKBq9VYbEneUQSyuZTp0DMcq4JU 8ljC8wVtW3aEZroiBhJK8vChNbYXmcWhJ9tNsaINtDU+PLKR+EMX9bsv2+1yE49D 9VwJauJT4uBMbhUMpx7EKhN1nSS2IqJlgjt0yOp9yrD4oHbCgkdsIAUIRI/1Mn0D VtKkSYpB8bM887iLd+Hv01+w10ANsfZzMBVLGpsE0KXvrCNBeer8SfmItwDGrxJA AnJhnnECgYEAu9p50YD5/IJmAtD0/zc02V/JypQpLlgohPslF2XrPXGE7h7vP/zp veiJXO2kwMehAyUDca5TNFiYWKgtnYoIQvpKxuOjHL3IsAaekyiLL6fsxj0avSPS fuQ9F8od7tZRy4bDmGLR2IYyQlwkpCdHvGIKr/XqkXq0ujDa5H0Sx0UCgYEAsvVO PRN0/kOJWBKNG1DMAhXU+BdullG7FisYguasUbzUs7NpkxMWjfI33MHFwwxVm+mv iaBXD8j7MT80aEq7s2jKQUcubTIcHn8N2XRAMoowJJTKE1uCxM+G/XsXTQNBXZFy /rdKXFs+3LxUcuANRvb/aC+tmEdcb9q+xelvF4UCgYEAhuCL3Le9RecedWEwt1od EQIssc4Fb2gO18Q20oD0ES7DofEGGSxva1Jd5iIey+fJnKdjvKjMxuXhpK5D6jwk SGrLa9gf0lAVmwV1r/VJUlNAtulCnJDu3vrjPoR5T3YETpyZLX2ua8eWqHzeNhqZ 8BF42PQ5knDG+HSBhdKju/0CgYEAqNJzcXimeKs7qOMvTKKHIjx4QWbRg2ss4/fZ 0rtLunw56CCLqxxpvZTQECiYqK09Ia1tVJb3KsP9+/JVPUGrGs/zZWuCJ68LCdXw OcDKQyNL0Wavz10X2xSvkvcI/zTf+CYbZqGAu+m0PsZHoGsu+1BNl3rK+Anx8O9Z 4xiZHYUCgYBiJbdDJPWmXBQ1sGDX7eFIDtAebwr4299mRanmILzhdhBeAzYdm1Vo Al9Gp8u0H4z0tHqKJF08cadbzsSkyhi8it/c33f1akLhodk5CYzDZhtRDURrvZJk TpuEFjZxd4wd3KDQ/k7zyyo1nvQmcS49wUaSSCW/UbfFvLlAumMgfw==`,
      gitBranch: "git checkout  master",
      gitRemoteUrl: "https://github.com/ratroot92/EPE_Express.git",
      allowedOrigins: allowlist,
      env: process.env.ENV,
      db: options,
      dirPath: `/home/ubuntu/PEC`,
      phpmyadmin: `http://127.0.0.1:5001/`,
      requestOrigin: req.headers.origin,
      originalUrl: req.originalUrl,
      req: req.body,
    },
    success: true,
  });
});


/*
! EXPRESS_SESSIONS START   
*/
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      secret: "waseeemIsGood",
      key: "sid",
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: { domain: "localhost" },
    })
  );

app.use(passport.initialize());
app.use(passport.session());

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');
//     }
//     next();
// });
/*
! EXPRESS_SESSIONS END   
*/



/*
! REGISTER ROUTES START  
*/
const userRouter = require("./routes/user.router");
app.use("/web/api/user", userRouter);
const attendanceRouter = require("./routes/attendance.route");
app.use("/web/api/attendance", attendanceRouter);
/*
! REGISTER ROUTES END  
*/

/*
! PAGENOTFOUND START 
*/
app.use((req, res, next) => {
  console.log("***-  Invalid Route Called  -***");
  console.log(req.originalUrl);
  res.status(404).json({
    success: false,
    message: "Page not found ",
    data: JSON.stringify(req.body),
  });
});

/*
! PAGENOTFOUND END 
*/


/*
! GLOBAL_EXCEPTION_HANDLING START 
*/


process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
  
process.on("warning", (e) => console.warn(e.stack));
  
  // the asynchronous or synchronous code that emits the otherwise uncaught error
  // var err = new Error('example')
  // throw err

/*
! GLOBAL_EXCEPTION_HANDLING END 
*/


/*
! INITAILIZE_SERVER START 
*/
app.listen(process.env.EXPRESS_PORT, process.env.EXPRESS_IP, (err) => {
  if (!err) {
    console.log(`NODE SERVER LISTENING ON ${process.env.EXPRESS_IP} ${process.env.EXPRESS_PORT}`);
  }
});
/*
! INITAILIZE_SERVER END 
*/