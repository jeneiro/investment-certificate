const jwt = require("jsonwebtoken")

function auth (req, res, next){
    try {
      
       const token = req.headers.authorization.split(' ')[1];
       

       if (!token) return  res.status(401).json({errorMessage:"Unauthorized"});
       jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({errorMessag:"Forbidden"})
        req.user = user;
        next();});
      
        
    } catch (err){
      
      return  res.status(401).json({errorMessage:"Unauthorized"});
    }

}
module.exports = auth;