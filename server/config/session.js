const  isAuthenticated=(req,res,next)=>{
    console.log('====================================');
    console.log('IsAuthenicated -- Middleware',req.isAuthenticated());
    console.log('====================================');
    console.log('====================================');
    console.log('IsAuthenicated -- Middleware',req.session);
    console.log('====================================');
    console.log('====================================');
    console.log('IsAuthenicated -- Middleware',req.user);
    console.log('====================================');
    if(process.env.ENV!=='serverDocker'){
      if(req.isAuthenticated())next();
      else return res.status(401).end()
    }
    else{
         next()
    }
      
  }

  module.exports = {isAuthenticated};