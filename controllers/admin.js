fs = require("fs");
var formulate = require("formulate");
var passwords = require("../lib/passwords.js");
var sha1 = require("easyhash")("sha1");

module.exports = function(routes, Transitive){
  var accounts = Transitive.App.accountsClient;

  function wrapWithAdminRequirement(fn){
    return function(req, res){
      //parse header
      
      var authenticated = false;

      if(req.headers.authorization){
        var header = req.headers.authorization || '',        // get the header
              token = header.split(/\s+/).pop() || '',            // and the encoded auth token
              auth = new Buffer(token, 'base64').toString(),    // convert from base64
              parts = auth.split(/:/),                          // split on colon
              username = parts[0].toString(),
              password = parts[1].toString();
        
        accounts.hgetall("/admin/"+sha1(username), function(err, user){
          console.log(auth, password, user);
          if(!user.password){ return notAuthenticated(); }
          passwords.check(password, user.password, function(err, result){
            if(result){
              fn(req, res);
            }else{
              notAuthenticated();
            }
          });
        });
      }else{
        notAuthenticated();
      }

      function notAuthenticated(){
        res.writeHead(401, { 
          'Content-Type': 'text/plain',
          "WWW-Authenticate": 'Basic realm="dxdt admin"'
        });
        
        res.end("401 Unauthorized.");
      }
    };
  }
  
  function get(url, fn){
    routes.get(url, wrapWithAdminRequirement(fn));
  }
  
  function post(url, fn){
    routes.post(url, wrapWithAdminRequirement(fn));
  }
  
  get("/admin", function(req, res){
    res.end("hi");
  });
  
  
};