
var jwt = require('jsonwebtoken');

var decodedToken='';
module.exports = {
    verifyToken: function (req,res,next) {
        let token = req.header('Authorization');
        console.log('jsonwebtoken');
        if(!token){
          return res.status(401).json({message:' Unauthorized request'});
        } else {
          var t = token.split(' ');
          jwt.verify(t[1].trim(),'/CYF<g9PN`u:vz*%!)//', function(err, tokendata){
              if(err)
                  return res.status(401).json({message:' Unauthorized request'});
              if(tokendata){
                  decodedToken = tokendata;
                  next();
              }
          })
        }
    }
};
